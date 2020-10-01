import React from "react"
import { Form, Input, Button, notification, InputNumber} from "antd"
import userService from "../../services/UsuarioService"
import _Page from "../_Page"
import PropTypes from "prop-types"
import Header from "../../components/Header"
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'

class Register extends _Page {
  static propTypes = {
    form: PropTypes.any.isRequired
  }
  service = userService
  state = {
    model: {
      latitude: 0,
      longitude: 0,
      pontos: 0,
     },     
     address: '',
     conf: ''
  }

  componentWillMount() {
    this.getModel()
  }


  handleChange = address => {
    this.setState({ address })
  }

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        var model = Object.assign({},this.state.model)
        model.latitude = latLng.lat
        model.longitude = latLng.lng
        model.endereco = address
        this.setState({
        model,
        address: address

    })
    console.log(model)
    })
      .catch(error => console.error('Error', error));
  }


  handleSubmit = e => {
    e.preventDefault()
    userService.save(this.state.model, 'id_usuario').then(response => {
      this.update({ model: response.data })
      notification.open({
        message: "Sucesso!",
        description: "Suas alterações foram salvas com sucesso."
      })
      this.props.history.push("/Login")
    }).catch(e =>{
      notification.open({
        message:"Erro",
        description: "Algo deu errado tente novamente"
      })
    })
    
   
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator } = form
    const { model, conf } = this.state
    const {TextArea} = Input
    return (
      <>
        <Header />
        <div id="createBody">
          <h1 ID="title">Cadastro de Usuario</h1>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator("Nome", {
                rules: [
                  { message: "campo obrigatorio" },
                  { max: 60, message: "maximo de 60 caracteres" }
                ]
              })}
              <h3>Nome:</h3>
              <Input
                placeholder="Nome Completo"
                name="nome"
                value={model.nome}
                onChange={e => this._handleInputChange(e, model)}
                required
              />
            </Form.Item>
            <h3>Email:</h3>
            <Form.Item>
              {getFieldDecorator("email", {
                rules: [
                  { message: "campo obrigatorio" },
                  { max: 200, message: "maximo de 200 caracteres" }
                ]
              })}
              <Input
                placeholder="exemplo@email.com"
                name="email"
                value={model.email}
                onChange={e => this._handleInputChange(e, model)}
                required
              />
            </Form.Item>
            <h3>Senha:</h3>
            <Form.Item>
              {getFieldDecorator("senha", {
                rules: [
                  { message: "campo obrigatorio" },
                  { max: 30, message: "maximo de 200 caracteres" },
                  {min: 8, message:"minimo 8 caracteres"}
                ]
              })}
              <Input.Password
                placeholder="minimo 8 caracteres"
                name="senha"
                value={model.senha}
                onChange={e => this._handleInputChange(e, model)}
                required
              />
              <h3>Confirme sua senha:</h3>
              <Input.Password
              placeholder="confirme sua senha"
              name="conf"
              value={conf}
              onChange={e =>
                this.setState({ conf: e.target.value })
}
              />
              {
                 (conf)? (conf===model.senha) ? null : <h4 style={{color: "red"}}>Senhas diferentes</h4> : null
              }
            </Form.Item>
            <h3>CPF:</h3>
            <Form.Item>
              {getFieldDecorator("CPF", {
                rules: [
                  { message: "campo obrigatorio" },
                  { max: 60, message: "maximo de 14 caracteres" }
                ]
              })}
              <Input
                placeholder="xxx.xxx.xxx-xx"
                name="cpf"
                value={model.cpf}
                onChange={e => this._handleInputChange(e, model)}
                required
              />
                          
            </Form.Item>
            <h3>Telefone:</h3>
            <Form.Item>
              {getFieldDecorator("Telefone", {
                rules: [
                  { message: "campo obrigatorio" },
                  { max: 60, message: "maximo de 60 caracteres" }
                ]
              })}
              <Input
                placeholder="(xx)xxxx-xxxx"
                name="telefone"
                value={model.telefone}
                onChange={e => this._handleInputChange(e, model)}
                required
              />
            </Form.Item>
            <h3>Telefone Secundario:</h3>
            <Form.Item>
              {getFieldDecorator("telefone Secundario", {
                rules: [
                  { message: "campo obrigatorio" },
                  { max: 60, message: "maximo de 60 caracteres" }
                ]
              })}
              <Input
                placeholder="(xx)xxxx-xxxx"
                name="telefone_secundario"
                value={model.telefone_secundario}
                onChange={e => this._handleInputChange(e, model)}
                required
              />
            </Form.Item>
            <h3>endereço</h3>
            <Form.Item>
      {getFieldDecorator("endereco", {
                rules: [
                  { message: "campo obrigatorio" }
                ]
              })}
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item'
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' }
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      {this.state.model.latitude !== 0?
      <> 
        <p style={{color:"green", fontsize: 15, margintop: 1, paddingleft: 0, marginleft: 10}}>Endereço selecionado</p>
        <p style={{color: "black", fontSize:15, marginTop: 1}}>{this.state.address}</p>
      </> :
      <>
      <p style={{color: "red", fontSize:15, margin:1}}>Selecione um endereço</p>
      </>

      }
      </Form.Item>
      <h3>Numero:</h3>
      <Form.Item>
      {getFieldDecorator("numero", {
                rules: [{ message: "campo obrigatorio" }]
              })}
              <InputNumber
                placeholder="numero"
                name="numero"
                value={model.numero}
                onChange={value =>
                  this._handleInputChange(
                    { target: { name: "numero", value } },
                    model
                  )
                }
                required
              />
      </Form.Item>
      <h3>complemento:</h3>
      <Form.Item >
              {getFieldDecorator("complemento", {
                rules: [
                  { message: "campo obrigatorio" },
                  { max: 200, message: "maximo de 200 caracteres" }
                ]
              })}
              <TextArea
                placeholder="Ex: Bloco, apt, referencia"
                name="complemento"
                value={model.complemento}
                onChange={e => this._handleInputChange(e, model)}
                required
              />
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
export default Form.create({ name: "UserForm" })(Register)
