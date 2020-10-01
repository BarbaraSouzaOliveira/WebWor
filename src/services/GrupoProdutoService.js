import API from "./Api";

export default class GrupoProdutoService {
  static async getAll(params) {
    return await API.get(`/grupoProduto`, { params });
  }

  static async get(id) {
    return await API.get(`/grupoProduto/${id}`);
  }

  static async create(data) {
    return await API.post(`/grupoProduto`, data);
  }

  static async update(id, data) {
    return await API.put(`/grupoProduto/${id}`, data);
  }

  static async delete(id) {
    return await API.delete(`/grupoProduto/${id}`);
  }

  // identifica se precisa de uptade ou create
  static async save(data, idAttribute = "id") {
    const id = data[idAttribute];

    let url = "/grupoProduto";
    let method = "post";

    if (id) {
      url += `/${id}`;
      method = "put";
    }

    return await API[method](url, data);
  }
}
