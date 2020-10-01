import API, {toFormData} from "./Api";

export default class ProdutoService {

  static async getAll(params) {
    return await API.get(`/produto`, { params });
  }

  static async get(id) {
    return await API.get(`/produto/${id}`);
  }

  static async create(data) {
    return await API.post(`/produto`, data);
  }

  static async update(id, data) {
    return await API.post(`/produto/${id}`, data);
  }

  static async delete(id) {
    return await API.delete(`/produto/${id}`);
  }

  // identifica se precisa de uptade ou create
  static async save(data, idAttribute = "id") {
    const id = data[idAttribute];

    let url = "/produto";
    let method = "post";

    if (id) {
      url += `/${id}`;
      method = "post";
    }

    return await API[method](url, toFormData(data));
  }
}
