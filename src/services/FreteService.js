import API from "./Api";

export default class FreteService {
  static async getAll(params) {
    return await API.get(`/frete`, { params });
  }

  static async get(id) {
    return await API.get(`/frete/${id}`);
  }

  static async create(data) {
    return await API.post(`/frete`, data);
  }

  static async update(id, data) {
    return await API.put(`/frete/${id}`, data);
  }

  static async delete(id) {
    return await API.delete(`/frete/${id}`);
  }

  // identifica se precisa de uptade ou create
  static async save(data, idAttribute = "id") {
    const id = data[idAttribute];

    let url = "/frete";
    let method = "post";

    if (id) {
      url += `/${id}`;
      method = "put";
    }

    return await API[method](url, data);
  }
}
