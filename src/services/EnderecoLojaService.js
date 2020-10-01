import API from "./Api";

export default class EnderecoLojaService {
  static async getAll(params) {
    return await API.get(`/enderecoLoja`, { params });
  }

  static async get(id) {
    return await API.get(`/enderecoLoja/${id}`);
  }

  static async create(data) {
    return await API.post(`/enderecoLoja`, data);
  }

  static async update(id, data) {
    return await API.put(`/enderecoLoja/${id}`, data);
  }

  static async delete(id) {
    return await API.delete(`/enderecoLoja/${id}`);
  }

  // identifica se precisa de uptade ou create
  static async save(data, idAttribute = "id") {
    const id = data[idAttribute];

    let url = "/enderecoLoja";
    let method = "post";

    if (id) {
      url += `/${id}`;
      method = "put";
    }

    return await API[method](url, data);
  }
}
