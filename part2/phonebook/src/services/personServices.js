import { getDefaultNormalizer } from '@testing-library/dom'
import axios from 'axios'
const baseUrl = 'http://192.168.1.26:3005/persons'


const getAll = () => {
  return axios.get(baseUrl)
}

const createPerson = (nameObject) => {
  return axios.post(baseUrl, nameObject)
}

const update = (id, nameObject) => {
  return axios.put(`${baseUrl}/${id}`, nameObject)
}


export default {
  getAll: getAll,
  createPerson: createPerson,
  update: update
}