import axios from 'axios';
import {getToken} from "../Utils/JWT";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api"
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//converte o objeto para formdata
export function toFormData(object = {}) {
  const formData = new FormData();

  for (let attr in object) {
    let value = object[attr];

    // Ignorar valores undefined do FormData
    if (value === undefined) {
      continue;
    }

    if (typeof value === 'boolean') {
      value = Number(value);
    }

    if (value === null) {
      value = '';
    }

    formData.append(attr, value);
  }

  return formData;
}

export default api;
