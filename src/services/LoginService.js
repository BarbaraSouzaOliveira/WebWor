import API from "./Api";

export default class ProdutoService {

  static async login(user) {
    return await API.post('/autenticar', user)
  }

}
