import React from 'react'
import _Page from '_Page'
import PropTypes from 'prop-types'
import StoreService from '../../services/LojaService'
import {Form, Input, Button, Icon, notification} from 'antd'


class AdminRegister extends _Page{
    static propTypes ={
        form: PropTypes.any.isRequired
    }

    service = StoreService

    state = {
        model: {}
    }

    componetWillMount(){
        this.getModel()
    }
    
    handleSubmit = e => {
        e.preventDefault();
        StoreService.save(this.state.model, "id_loja").then(response => {
          this.update({ model: response.data })
          notification.open({
            message: "Sucesso!",
            description: "Suas alterações foram salvas com sucesso."
          })
        })
      }
    
    
    render(){
        const {form} = this.props
        const {getFieldDecorator} = form
        return(
            <>
                <div>
                    <Form layout= "inline" >
                        <Form.Item>
                            {getFieldDecorator("email",{
                                rules: [
                                    {required: true, message:"Email da Loja"},
                                    {max:150,message:"Maximo de 150 caracteres"}
                                ]
                            })}
                            <Input
                                prefix={<Icon type="email" />}
                                placeholder="tipo do produto"
                                name="email"
                                value={this.state.model.email}
                                onChange={e => this._handleInputChange(e, this.state.model)}
                            />

                        </Form.Item>
                    </Form>
                </div> 
            </>
        )
    }
}export default Form.create({name: "AdminRegisterForm"}) (AdminRegister)