import API, {toFormData} from "./Api";


export default class PainelLojaService {
  static async getAll(params) {
    return await API.get(`/painel`, { params });
  }

  static async get(id) {
    return await API.get(`/painel/${id}`);
  }

  static async create(data) {
    return await API.post(`/painel`, data);
  }

  static async update(id, data) {
    return await API.post(`/painel/${id}`, data);
  }

  static async delete(id) {
    return await API.delete(`/painel/${id}`);
  }

  // identifica se precisa de uptade ou create
  static async save(data, idAttribute = "id") {
    const id = data[idAttribute];

    let url = "/painel";
    let method = "post";

    if (id) {
      url += `/${id}`;
      method = "post";
    }

    return await API[method](url, toFormData(data));
  }
}
