import API from "./Api";

export default class EnderecoUsuarioService {
  static async getAll(params) {
    return await API.get(`/enderecoUsuario`, { params });
  }

  static async get(id) {
    return await API.get(`/enderecoUsuario/${id}`);
  }

  static async create(data) {
    return await API.post(`/enderecoUsuario`, data);
  }

  static async update(id, data) {
    return await API.put(`/enderecoUsuario/${id}`, data);
  }

  static async delete(id) {
    return await API.delete(`/enderecoUsuario/${id}`);
  }

  // identifica se precisa de uptade ou create
  static async save(data, idAttribute = "id") {
    const id = data[idAttribute];

    let url = "/enderecoUsuario";
    let method = "post";

    if (id) {
      url += `/${id}`;
      method = "put";
    }

    return await API[method](url, data);
  }
}
