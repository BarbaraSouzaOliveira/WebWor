import API from "./Api";

export default class HistoricoPedidoService {
  static async getAll(params) {
    return await API.get(`/historicoPedido`, { params });
  }

  static async get(id) {
    return await API.get(`/historicoPedido/${id}`);
  }

  static async create(data) {
    return await API.post(`/historicoPedido`, data);
  }

  static async update(id, data) {
    return await API.put(`/historicoPedido/${id}`, data);
  }

  static async delete(id) {
    return await API.delete(`/historicoPedido/${id}`);
  }

  // identifica se precisa de uptade ou create
  static async save(data, idAttribute = "id") {
    const id = data[idAttribute];

    let url = "/historicoPedido";
    let method = "post";

    if (id) {
      url += `/${id}`;
      method = "put";
    }

    return await API[method](url, data);
  }
}
