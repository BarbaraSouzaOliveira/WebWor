import React from "react";
import {
  Select,
  Input,
  Button,
  Form,
  notification,
  Checkbox,
  Card
} from "antd";
import "./styles.css";
import gProductService from "../../services/GrupoProdutoService";
import _Page from "../_Page";
import PropTypes from "prop-types";
import Header from "../../components/Header";

class GroupProducts extends _Page {
  static propTypes = {
    form: PropTypes.any.isRequired
  };

  state = {
    model: {},
    gp: [],
    isNew: false
  };

  componentWillMount() {
    this.getModel();
  }
  componentDidMount() {
    super.componentDidMount();
    //necessario somente quando buscamos dados do BD
    gProductService.getAll().then(response => {
      this.update({ gp: response.data });
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.isNew === true) {
      gProductService.save(this.state.model, "id_gp").then(response => {
        this.update({ model: response.data });
        notification.open({
          message: "Sucesso!",
          description: "Suas alterações foram salvas com sucesso."
        });
      });
    }
    this.props.history.push("/CreateProduct/0");
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { gp, model } = this.state;
    var { isNew } = this.state;
    const { Option } = Select;
    return (
      <>
        <Header />
        <div id="groupBody">
          <Card title="Qual a categoria do seu produto:">
            <Form onSubmit={this.handleSubmit}>
              <Form.Item>
                {getFieldDecorator("imagem", {
                  rules: [{ required: true, message: "campo obrigatorio" }]
                })}
                <h4>Categorias ja cadastradas</h4>
                <Select
                  value={model.id_gp}
                  onChange={value =>
                    this._handleInputChange(
                      { target: { name: "id_gp", value } },
                      model
                    )
                  }
                >
                  {gp.map(group => {
                    return (
                      <Option value={group.id_gp}>{group.descricao}</Option>
                    );
                  })}
                </Select>
                <Checkbox onChange={e => this.setState({ isNew: !isNew })}>
                  Outro
                </Checkbox>
              </Form.Item>

              {isNew === true ? (
                <Form.Item>
                  {getFieldDecorator("descricao", {
                    rules: [
                      { required: true, message: "campo obrigatorio" },
                      { max: 200, message: "maximo de 200 caracteres" }
                    ]
                  })}
                  <h4>Caso selecionado outro, especifique a categoria:</h4>
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
              ) : (
                <> </>
              )}

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Salvar
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </>
    );
  }
}
export default Form.create({ name: "gProductForm" })(GroupProducts);
