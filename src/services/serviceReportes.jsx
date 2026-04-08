import axios from "axios";

const url = 'http://localhost:8080/api/partes'

const getAll = () => axios.get(url).then( r => r.data)


const guardarParte = parte =>
  axios.post(url, parte, {
    headers: { 'Content-Type': 'application/json' }
  }).then(r => r.data)

const actualizarParte = ( id, parte ) => axios.put( url+id, parte, {
    headers: { 'Content-Type' : 'application/json'}
}).then(r => r.data)



export default {
    getAll,
    guardarParte,
    actualizarParte
}