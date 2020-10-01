import React from 'react'
import _Page from '../_Page'
import {Form, Button, notification,Input} from 'antd'
import timeService from '../../services/HorarioFuncionamentoService'
import PropTypes from 'prop-types'
import Header from '../../components/Header'
import "./styles.css"
import './styles.css'


class Time extends _Page {
    propTypes={
        from: PropTypes.any.isRequired
    }
    state= {
        model: {

        }

    }
    componentWillMount() {
        this.getModel();
      }
    
      componentDidMount() {
        super.componentDidMount()
      }
      handleSubmit = e => {
        e.preventDefault()
        timeService.update(1, this.state.model).then(response => {
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

     render(){
        const { form } = this.props
        const { getFieldDecorator } = form
        const { model } = this.state
         return(
           <>
          <Header />

             <div id="bodyTime">
            <Form onSubmit={this.handleSubmit}>
           <h3> <strong> Horário de funcionamento </strong> </h3>
           <p> Preencha os horarios no formato HH:MM</p>
            <strong> * Segunda-feira </strong> <br/>
            <div id="horario"> 
          <Form.Item  style= {{width: "150px", marginRight: "4%"}}>
              {getFieldDecorator("seg_horario_inicio", {
                rules: [
                  { message: "campo obrigatorio" },
                ]
              })}
              <Input
                placeholder="Abre ás HH:MM"
                name="seg_horario_inicio"
                value={model.seg_horario_inicio}
                onChange={e => this._handleInputChange(e, model)}
                required
              />
          </Form.Item>
          <Form.Item style= {{width: "150px"}}>
              {getFieldDecorator("seg_horario_fim", {
                rules: [
                  { message: "campo obrigatorio" },
                ]
              })}
              <Input
                placeholder="Fecha ás HH:MM"
                name="seg_horario_fim"
                value={model.seg_horario_fim}
                onChange={e => this._handleInputChange(e, model)}
                required
              />
          </Form.Item>
          </div>
          <strong> * Terça-feira </strong> <br/>
          <div id="horario">
          <Form.Item style= {{width: "150px", marginRight: "4%"}}>
              {getFieldDecorator("ter_horario_inicio", {
                rules: [
                  { message: "campo obrigatorio" },
                ]
              })}
              <Input
                placeholder="Abre ás HH:MM"
                name="ter_horario_inicio"
                value={model.ter_horario_inicio}
                onChange={e => this._handleInputChange(e, model)}
                required
              />
          </Form.Item>
          <Form.Item style= {{width: "150px"}}>
              {getFieldDecorator("ter_horario_fim", {
                rules: [
                  { message: "campo obrigatorio" },
                ]
              })}
              <Input
                placeholder="Fecha ás HH:MM"
                name="ter_horario_fim"
                value={model.ter_horario_fim}
                onChange={e => this._handleInputChange(e, model)}
                required
              />
          </Form.Item>
          </div> 
          <strong> * Quarta-feira </strong> <br/>
          <div id="horario">
          <Form.Item style= {{width: "150px", marginRight: "4%"}}>
              {getFieldDecorator("quar_horario_inicio", {
                rules: [
                  { message: "campo obrigatorio" },
                ]
              })}
              <Input
                placeholder="Abre ás HH:MM"
                name="quar_horario_inicio"
                value={model.quar_horario_inicio}
                onChange={e => this._handleInputChange(e, model)}
                required
              />
          </Form.Item>
          <Form.Item style= {{width: "150px"}}>
              {getFieldDecorator("quar_horario_fim", {
                rules: [
                  { message: "campo obrigatorio" },
                ]
              })}
              <Input
                placeholder="Fecha ás HH:MM"
                name="quar_horario_fim"
                value={model.quar_horario_fim}
                onChange={e => this._handleInputChange(e, model)}
                required
              />
          </Form.Item>
          </div>
          <strong> * Quinta-feira </strong> <br/>
          <div id="horario">
          <Form.Item style= {{width: "150px", marginRight: "4%"}}>
              {getFieldDecorator("quin_horario_inicio", {
                rules: [
                  { message: "campo obrigatorio" },
                ]
              })}
              <Input
                placeholder="Abre ás HH:MM"
                name="quin_horario_inicio"
                value={model.quin_horario_inicio}
                onChange={e => this._handleInputChange(e, model)}
                required
              />
          </Form.Item>
          <Form.Item style= {{width: "150px"}}>
              {getFieldDecorator("quin_horario_fim", {
                rules: [
                  { message: "campo obrigatorio" },
                ]
              })}
              <Input
                placeholder="Fecha ás HH:MM"
                name="quin_horario_fim"
                value={model.quin_horario_fim}
                onChange={e => this._handleInputChange(e, model)}
                required
              />
          </Form.Item>
          </div> 
          <strong> * Sexta-feira </strong> <br/>
          <div id="horario">
          <Form.Item style= {{width: "150px", marginRight: "4%"}}>
              {getFieldDecorator("sex_horario_inicio", {
                rules: [
                  { message: "campo obrigatorio" },
                ]
              })}
              <Input
                placeholder="Abre ás HH:MM"
                name="sex_horario_inicio"
                value={model.sex_horario_inicio}
                onChange={e => this._handleInputChange(e, model)}
                required
              />
              </Form.Item>
              <Form.Item style= {{width: "150px"}}>
              {getFieldDecorator("sex_horario_fim", {
                rules: [
                  { message: "campo obrigatorio" },
                ]
              })}
              <Input
                placeholder="Fecha ás HH:MM"
                name="sex_horario_fim"
                value={model.sex_horario_fim}
                onChange={e => this._handleInputChange(e, model)}
                required
              />
          </Form.Item>
          </div>
          <strong> * Sábado </strong> <br/>
          <div id="horario">
          <Form.Item style= {{width: "150px", marginRight: "4%"}}>
              {getFieldDecorator("sab_horario_inicio", {
                rules: [
                  { message: "campo obrigatorio" },
                ]
              })}
              <Input
                placeholder="Abre ás HH:MM"
                name="sab_horario_inicio"
                value={model.sab_horario_inicio}
                onChange={e => this._handleInputChange(e, model)}
                required
              />
          </Form.Item>
          <Form.Item style= {{width: "150px"}}>
              {getFieldDecorator("sab_horario_fim", {
                rules: [
                  { message: "campo obrigatorio" },
                ]
              })}
              <Input
                placeholder="Fecha ás HH:MM"
                name="sab_horario_fim"
                value={model.sab_horario_fim}
                onChange={e => this._handleInputChange(e, model)}
                required
              />
          </Form.Item>
          </div>
          <strong> * Domingo </strong> <br/>
          <div id="horario">
          <Form.Item style= {{width: "150px", marginRight: "4%"}}>
              {getFieldDecorator("dom_horario_inicio", {
                rules: [
                  { message: "campo obrigatorio" },
                ]
              })}
              <Input
                placeholder="Abre HH:MM"
                name="dom_horario_inicio"
                value={model.dom_horario_inicio}
                onChange={e => this._handleInputChange(e, model)}
                required
              />
          </Form.Item>
          <Form.Item style= {{width: "150px"}}>
              {getFieldDecorator("dom_horario_fim", {
                rules: [
                  { message: "campo obrigatorio" },
                ]
              })}
              <Input
                placeholder="Fecha ás HH:MM"
                name="dom_horario_fim"
                value={model.dom_horario_fim}
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
    export default Form.create({name: "TimeForm"})(Time)