import axios from 'axios'

const baseUrl = '/api/persons'


const getAll = () => {
  return axios.get(baseUrl)
}

const createPerson = (nameObject) => {
  return axios.post(baseUrl, nameObject)
}

const update = (id, nameObject) => {
  return axios.put(`${baseUrl}/${id}`, nameObject)
}

const removePerson = (id) => {
  console.log(`${baseUrl}/${id}`)
  return axios.delete(`${baseUrl}/${id}`)

}

const personServices = {
  getAll: getAll,
  createPerson: createPerson,
  update: update,
  removePerson: removePerson
}

export default personServices