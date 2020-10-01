import API from "./Api";

export default class AvaliacaoService {
  static async getAll(params) {
    return await API.get(`/avaliacao`, { params });
  }

  static async get(id) {
    return await API.get(`/avaliacao/${id}`);
  }

  static async create(data) {
    return await API.post(`/avaliacao`, data);
  }

  static async update(id, data) {
    return await API.put(`/avaliacao/${id}`, data);
  }

  static async delete(id) {
    return await API.delete(`/avaliacao/${id}`);
  }

  // identifica se precisa de uptade ou create
  static async save(data, idAttribute = "id") {
    const id = data[idAttribute];

    let url = "/avaliacao";
    let method = "post";

    if (id) {
      url += `/${id}`;
      method = "put";
    }

    return await API[method](url, data);
  }
}
