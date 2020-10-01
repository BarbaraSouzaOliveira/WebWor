import React from "react";
import { Input, InputNumber, notification, Select, Form, Button } from "antd";
import ProductService from "../../services/GrupoProdutoService";
import PropTypes from "prop-types";
import _Page from "../../pages/_Page";
import Header from "../../components/Header";
import "./styles.css";

class Product extends _Page {
  static propTypes = {
    form: PropTypes.any.isRequired
  };

  service = ProductService;

  state = {
    //adicionar e especificar aqui todos os campos da tabela (exceto pelo id)
    model: {
      descricao: ""
    },
    //array de objetos que sera prenchido com os dados do bd
    gp: []
  };

  componentWillMount() {
    this.getModel();
  }

  componentDidMount() {
    super.componentDidMount();
    //necessario somente quando buscamos dados do BD
    ProductService.getAll().then(response => {
      this.update({ gp: response.data });
    });
  }

  //Funcao responsavel por inserir no banco de dados
  //ficar atento ao unico parametro que muda "id"
  //depois de criar vale sair da pagina fazendo uma navegacao simples para nao bugar a incersao
  handleSubmit = e => {
    e.preventDefault();
    ProductService.save(this.state.model, "id_gp").then(response => {
      this.update({ model: response.data });
      notification.open({
        message: "Sucesso!",
        description: "Suas alterações foram salvas com sucesso."
      });
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { gp } = this.state;
    //fazer todos forms no formato form do ANTD
    //ficar atento a todos os campos necessario no BD
    //Aqueles campos que sao preenchidos sem ajuda do Input basta usar a funcao setstate
    return (
      <>
        <Header />
        <div>
          <h1>Inserindo dado</h1>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator("descricao", {
                rules: [
                  { required: true, message: "campo obrigatorio" },
                  { max: 200, message: "maximo de 200 caracteres" }
                ]
              })}
              <Input
                placeholder="Nome do subgrupo"
                name="descricao"
                value={this.state.model.descricao}
                //funcao on change responsavel por pegar o dado e atualizar o state
                //onChange eh usada nesse caso por ser um input (pode variar para InputNumber/select...)
                //Ipende salientar que essa mudanca sera apenas do nome da funcao chamada
                onChange={e => this._handleInputChange(e, this.state.model)}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Salvar
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div>
          <h1>Mostrando dados</h1>
          {//para mostrar os dados basta fazer um "map" do array criado no state
          //para boas praticas criamos uma variavel no render do arrey buscando ele no state
          //Dentro do map vale lembrar que buscamos os itens com o nome que criamos na variavel da funcao e o nome do campo igual o bd
          gp.map(grupo => {
            return (
              <>
                <p>{grupo.id_gp}</p>
                <h4>{grupo.descricao}</h4>
              </>
            );
          })}
        </div>
      </>
    );
  }
}
export default Form.create({ name: "ProductForm" })(Product);
