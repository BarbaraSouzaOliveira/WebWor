import API from "./Api";

export default class UsuarioService {
  static async getAll(params) {
    return await API.get(`/usuario`, {params});
  }

  static async get(id) {
    return await API.get(`/usuario/${id}`);
  }

  static async create(data) {
    return await API.post(`/usuario`, data);
  }

  static async update(id, data) {
    return await API.post(`/usuario/${id}`, data);
  }
  static async save(data, idAttribute = "id") {
    const id = data[idAttribute];

    let url = "/usuario";
    let method = "post";

    if (id) {
      url += `/${id}`;
      method = "post";
    }

    return await API[method](url, data);
  }

  static async meusDados() {
    return await API.get(`/usuario/meus-dados`);
  }

}
