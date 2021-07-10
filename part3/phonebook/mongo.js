const mongoose = require('mongoose')


if (process.argv.length < 3){
  console.log('not enough arguments. usage: node mongo.js <password> <name> <number>')
  process.exit(1)
}

if (process.argv.length > 5 || process.argv.length === 4){
  console.log('invalid number of arguments. usage: node mongo.js <password> <name> <number> ')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
const url =
  `mongodb+srv://admin:${password}@cluster0.dwfef.mongodb.net/phonebook?retryWrites=true&w=majority`


const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  number:  number,
})




if (process.argv.length === 3){
  Person.find({}).then(res => {
    res.forEach(e => {
      console.log(e)
    })
    mongoose.connection.close()
  })
}

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const savePerson = () => {
  person.save().then(res => {
    console.log('added', res.name, 'number:', res.number)
    mongoose.connection.close()
  })
}

savePerson()
