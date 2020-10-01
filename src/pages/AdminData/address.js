import React from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'
import _Page from '../_Page'
import {Form, Button, InputNumber, notification,Input} from 'antd'
import addressService from '../../services/EnderecoLojaService'
import PropTypes from 'prop-types'
import Header from '../../components/Header'
import "./styles.css"
class Address extends _Page {
  propTypes={
      from: PropTypes.any.isRequired
  }
  state= {
      model: {
        latitude: 0,
        longitude: 0
      },
      address: '',

  }

  componentWillMount() {
    this.getModel();
  }

  componentDidMount() {
    super.componentDidMount()
  }


  handleSubmit = e => {
    e.preventDefault()
    addressService.update(1,this.state.model).then(response => {
      this.update({ model: response.data })
      notification.open({
        message: "Sucesso!",
        description: "Suas alterações foram salvas com sucesso."
      })
    })
    this.props.history.push("/Admin")
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
    })
      .catch(error => console.error('Error', error));
  }


  render() {

    const { form } = this.props
    const { getFieldDecorator } = form
    const { model } = this.state
    const {TextArea} = Input
    return (
        <>
        <Header />
        <body id="bodyData">
          
      <Form onSubmit={this.handleSubmit}>
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
      <Form.Item>
      {getFieldDecorator("numero", {
                rules: [{ message: "campo obrigatorio" }]
              })}
              <InputNumber
                placeholder="numero"
                name="numero"
                value={model.numero}
                formatter={value=> ` ${value} nº`}
                onChange={value =>
                  this._handleInputChange(
                    { target: { name: "numero", value } },
                    model
                  )
                }
                required
              />
      </Form.Item>
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
      </body>
        </>
    )
  }
}export default Form.create({name: "addressForm"})(Address)
