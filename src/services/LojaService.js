import API from "./Api";

export default class BookService {
  static async getAll(params) {
    return await API.get(`/`, { params });
  }

  static async get(id) {
    return await API.get(`//${id}`);
  }

  static async create(data) {
    return await API.post(`/`, data);
  }

  static async update(id, data) {
    return await API.put(`//${id}`, data);
  }

  static async delete(id) {
    return await API.delete(`//${id}`);
  }

  // identifica se precisa de uptade ou create
  static async save(data, idAttribute = "id") {
    const id = data[idAttribute];

    let url = "/";
    let method = "post";

    if (id) {
      url += `/${id}`;
      method = "put";
    }

    return await API[method](url, data);
  }
}
