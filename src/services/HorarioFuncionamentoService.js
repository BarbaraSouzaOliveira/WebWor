import API from "./Api";

export default class HorarioFuncionamentoService {
  static async getAll(params) {
    return await API.get(`/horarioFuncionamento`, { params });
  }

  static async get(id) {
    return await API.get(`/horarioFuncionamento/${id}`);
  }

  static async create(data) {
    return await API.post(`/horarioFuncionamento`, data);
  }

  static async update(id, data) {
    return await API.put(`/horarioFuncionamento/${id}`, data);
  }

  static async delete(id) {
    return await API.delete(`/horarioFuncionamento/${id}`);
  }

  // identifica se precisa de uptade ou create
  static async save(data, idAttribute = "id") {
    const id = data[idAttribute];

    let url = "/horarioFuncionamento";
    let method = "post";

    if (id) {
      url += `/${id}`;
      method = "put";
    }

    return await API[method](url, data);
  }
}
