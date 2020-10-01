import API from "./Api";

export default class PedidoService {
  static async getAll(params) {
    return await API.get(`/pedido`, { params });
  }

  static async get(id) {
    return await API.get(`/pedido/${id}`);
  }

  static async create(data) {
    return await API.post(`/pedido`, data);
  }

  static async update(id, data) {
    return await API.put(`/pedido/${id}`, data);
  }

  static async delete(id) {
    return await API.delete(`/pedido/${id}`);
  }

  // identifica se precisa de uptade ou create
  static async save(data, idAttribute = "id") {
    const id = data[idAttribute];

    let url = "/pedido";
    let method = "post";

    if (id) {
      url += `/${id}`;
      method = "put";
    }

    return await API[method](url, data);
  }
}
