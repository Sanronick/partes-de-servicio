import axios from "axios";

const url = 'https://69d3bc8b336103955f8f8a37.mockapi.io/api/partes/parteServicio'

const getAll = () => axios.get(url).then( r => r.data)



export default {
    getAll
}