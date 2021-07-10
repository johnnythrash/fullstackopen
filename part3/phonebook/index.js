/* eslint-disable no-unused-vars */
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const { response } = require('express')
const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())



const logger = morgan(function (tokens, req, res) {
  const method = tokens.method(req,res)
  morgan.token('body', (req,res) => JSON.stringify(req.body))

  if (method === 'POST'){
    return [
      method,
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens.body(req,res),
    ].join(' ')
  }
  return [
    method,
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
})



app.use(logger)

app.get('/', (_request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (_request, response,next) => {
  Person.find({}).then(person => {
    const date = new Date()
    response.send(`<div><p>Phonebook has info for ${person.length} people.</p><p>${date}</p></div>`)
  }).catch(error => next(error))
})

app.get('/api/persons', (_request, response, next) => {
  Person.find({}).then(res => {
    response.json(res)
  }).catch(error => next(error))
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    if (person){
      response.json(person)
    } else {
      response.status(404).end
    }
  })
})

app.delete('/api/persons/:id', (request,response, next) => {
  const id = request.params.id

  Person.findByIdAndRemove(id)
    .then(res => {
      res.status(204).end()
    }).catch(error => next(error))

})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person ({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
      response.json(savedAndFormattedPerson)
    }).
    catch(error => next(error))

})

app.put('/api/persons/:id', (request,response, next) => {
  const id = request.params.id
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(id,person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))

})


const unknownEndpoint = (_req,res) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const errorHandler = (error, _request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError'){
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)
const PORT = process.env.PORT || 3005
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})