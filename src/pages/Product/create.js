import React from "react"
import { Form, Input, Button, notification, Select, InputNumber} from "antd"
import productService from "../../services/ProdutoService"
import gProductService from "../../services/GrupoProdutoService"
import "./styles.css"
import _Page from "../_Page"
import PropTypes from "prop-types"
import Header from "../../components/Header"

class CreateProduct extends _Page {
  static propTypes = {
    form: PropTypes.any.isRequired
  }
  service = productService
  state = {
    model: {
      valor: 0,
      porcentagem_promocao: 0
    },
    productGroup: []
  }

  componentWillMount() {
    this.getModel()
  }

  componentDidMount() {
    super.componentDidMount()
    gProductService.getAll().then(response => {
      this.update({ productGroup: response.data })
    })
  }
  

  handleSubmit = e => {
    e.preventDefault()
    productService.save(this.state.model, "id_produto").then(response => {
      this.update({ model: response.data })
      notification.open({
        message: "Sucesso!",
        description: "Suas alterações foram salvas com sucesso."
      })
    }).catch(e =>{
      notification.open({
        message:"Erro",
        description: "Algo deu errado tente novamente"
      })
    })
    
    this.props.history.push("/Admin")
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator } = form
    const { productGroup, model } = this.state
    const { TextArea } = Input
    const { Option } = Select
    return (
      <>
        <Header />
        <div id="createBody">
          <h1 ID="title">Cadastro de Produto</h1>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator("titulo", {
                rules: [
                  { message: "campo obrigatorio" },
                  { max: 60, message: "maximo de 60 caracteres" }
                ]
              })}
              <Input
                placeholder="Título"
                name="titulo"
                value={model.titulo}
                onChange={e => this._handleInputChange(e, model)}
                required
              />
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("descricao", {
                rules: [
                  { message: "campo obrigatorio" },
                  { max: 200, message: "maximo de 200 caracteres" }
                ]
              })}
              <TextArea
                placeholder="Descrição"
                name="descricao"
                value={model.descricao}
                onChange={e => this._handleInputChange(e, model)}
                required
              />
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("valor", {
                rules: [{ message: "campo obrigatorio" }]
              })}
              <InputNumber
                placeholder="Valor"
                name="valor"
                value={model.valor}
                formatter={value=> `$ ${value}`}
                onChange={value =>
                  this._handleInputChange(
                    { target: { name: "valor", value } },
                    model
                  )
                }
                required
              />
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("promocao", {
                rules: [{ message: "campo obrigatorio" }]
              })}
              <Select
                required
                value={model.promocao}
                placeholder="Promoção"
                onChange={value =>
                  this._handleInputChange(
                    { target: { name: "promocao", value } },
                    model
                  )
                }
              >
                <Option value={true}>Produto em promoção</Option>
                <Option value={false}>Produto sem promoção</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("porcentagem_promocao", {
                rules: [{ message: "campo obrigatorio" }]
              })}
              <p>Porcentagem da promoção</p>
              <InputNumber
                placeholder="valor"
                name="porcentagem_promocao"
                value={model.porcentagem_promocao}
                formatter={value=> `${value} %`}
                onChange={value =>
                  this._handleInputChange(
                    { target: { name: "porcentagem_promocao", value } },
                    model
                  )
                }
                required
              />
            </Form.Item>
            <Form.Item>
                {getFieldDecorator("img_produto", {
                rules: [{ message: "campo obrigatorio" }]
              })}
                <h3>Imagem do produto:</h3>
              <Input 
              type = "file"
              placeholder="imagem" 
              name="img_produto"
              onChange={e => this._handleInputChange(e, model)}
              />
              </Form.Item>
            <Form.Item>
              <Select
                required
                value={model.id_gp}
                placeholder="Tipo do produto"
                onChange={value =>
                  this._handleInputChange(
                    { target: { name: "id_gp", value } },
                    model
                  )
                }
              >
                {productGroup.map(group => {
                  return <Option value={group.id_gp}>{group.descricao}</Option>;
                })}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Salvar
              </Button>
            </Form.Item>
          </Form>
        </div>
      </>
    );
  }
}
export default Form.create({ name: "productForm" })(CreateProduct)
