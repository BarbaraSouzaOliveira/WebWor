import React from 'react'
import _Page from '../_Page'
import {Form, Button, notification,Input} from 'antd'
import deliveryService from '../../services/FreteService'
import PropTypes from 'prop-types'
import Header from '../../components/Header'
import "./styles.css"
import './styles.css'


class Delivery extends _Page {
    propTypes={
        from: PropTypes.any.isRequired
    }
    state= {
        model: {}

    }
    componentWillMount() {
        this.getModel();
      }
    
      componentDidMount() {
        super.componentDidMount()
      }
      handleSubmit = e => {
        e.preventDefault()
        deliveryService.update(1,this.state.model).then(response => {
          this.update({ model: response.data })
          notification.open({
            message: "Sucesso!",
            description: "Suas alterações foram salvas com sucesso."
          })          
          this.props.history.push("/Admin")
        }).catch(e =>{
          notification.open({
            message:"Erro",
            description: "Algo deu errado tente novamente"
          })
        })
      }

     render(){
        const { form } = this.props
        const { getFieldDecorator } = form
        const { model } = this.state
         return(
           <>
          <Header />

             <div id="bodyDelivery">
            <Form onSubmit={this.handleSubmit}>
           <h3> <strong> Valor a ser cobrado do frete </strong> </h3>
            <strong> Distância - Valor  </strong> <br/>
            <div id="frete"> 
          <Form.Item  style= {{width: "150px", marginRight: "4%"}}>
              {getFieldDecorator("distancia1", {
                rules: [
                  { message: "campo obrigatorio" },
                ]
              })}
              <Input
                placeholder="KM"
                name="distancia1"
                value={model.distancia1}
                onChange={e => this._handleInputChange(e, model)}
                required
              />
          </Form.Item>
          <Form.Item  style= {{width: "150px", marginRight: "4%"}}>
              {getFieldDecorator("valor1", {
                rules: [
                  { message: "campo obrigatorio" },
                ]
              })}
              <Input
                placeholder="Preço"
                name="valor1"
                value={model.valor1}
                onChange={e => this._handleInputChange(e, model)}
                required
              />
          </Form.Item>
          </div>
          <div id="frete"> 
          <Form.Item  style= {{width: "150px", marginRight: "4%"}}>
              {getFieldDecorator("distancia2", {
                rules: [
                  { message: "campo obrigatorio" },
                ]
              })}
              <Input
                placeholder="KM"
                name="distancia2"
                value={model.distancia2}
                onChange={e => this._handleInputChange(e, model)}
                required
              />
          </Form.Item>
          <Form.Item  style= {{width: "150px", marginRight: "4%"}}>
              {getFieldDecorator("valor2", {
                rules: [
                  { message: "campo obrigatorio" },
                ]
              })}
              <Input
                placeholder="Preço"
                name="valor2"
                value={model.valor2}
                onChange={e => this._handleInputChange(e, model)}
                required
              />
          </Form.Item>
          </div>
          <div id="frete"> 
          <Form.Item  style= {{width: "150px", marginRight: "4%"}}>
              {getFieldDecorator("distancia3", {
                rules: [
                  { message: "campo obrigatorio" },
                ]
              })}
              <Input
                placeholder="KM"
                name="distancia3"
                value={model.distancia3}
                onChange={e => this._handleInputChange(e, model)}
                required
              />
          </Form.Item>
          <Form.Item  style= {{width: "150px", marginRight: "4%"}}>
              {getFieldDecorator("valor3", {
                rules: [
                  { message: "campo obrigatorio" },
                ]
              })}
              <Input
                placeholder="Preço"
                name="valor3"
                value={model.valor3}
                onChange={e => this._handleInputChange(e, model)}
                required
              />
          </Form.Item>
          </div>
          <div id="frete"> 
          <Form.Item  style= {{width: "150px", marginRight: "4%"}}>
              {getFieldDecorator("distancia4", {
                rules: [
                  { message: "campo obrigatorio" },
                ]
              })}
              <Input
                placeholder="KM"
                name="distancia4"
                value={model.distancia4}
                onChange={e => this._handleInputChange(e, model)}
                required
              />
          </Form.Item>
          <Form.Item  style= {{width: "150px", marginRight: "4%"}}>
              {getFieldDecorator("valor4", {
                rules: [
                  { message: "campo obrigatorio" },
                ]
              })}
              <Input
                placeholder="Preço"
                name="valor4"
                value={model.valor4}
                onChange={e => this._handleInputChange(e, model)}
                required
              />
          </Form.Item>
          </div>
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
          </Form>
         </div>
         </>
         );
     }
    } 
    export default Form.create({name: "DeliveryForm"})(Delivery)