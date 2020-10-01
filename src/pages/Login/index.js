import React, {useState} from "react";
import {Form, Icon, Input, Button, Avatar, notification} from 'antd';
import {Link} from 'react-router-dom'
import './style.css';
import LoginService from "../../services/LoginService";
import {login} from "../../Utils/JWT";

function Login({history}) {

  const [formLogin, setFormLogion] = useState({
    email: '',
    senha: '',
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const {data} = await LoginService.login(formLogin);

    if (data.key_token) {
      login(data.key_token);
      setTimeout(function(){
        history.push('/');
      },4000)
      
    } else {
      notification.open({
        message: "Erro",
        description: "Algo deu errado tente novamente"
      })
    }
  }

  return (

    <div className={'painel-login'}>

      <Form onSubmit={handleSubmit} className="login-form">

        <Form.Item className={'avatar'}>
          <Avatar size={90} icon="user" className={'avatar-item'}/>
        </Form.Item>

        <Form.Item>
          <Input
            value={formLogin.email}
            onChange={event => setFormLogion({
              ...formLogin,
              email: event.target.value
            })}
            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
            placeholder="E-mail"
            name={'userEmail'}
          />,
        </Form.Item>

        <Form.Item>
          <Input
            value={formLogin.senha}
            onChange={event => setFormLogion({
              ...formLogin,
              senha: event.target.value
            })}
            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
            type="password"
            name={'userEmail'}
            placeholder="Password"/>
        </Form.Item>

        <Form.Item className={'form-buttom'}>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Entrar
          </Button>
        </Form.Item>
        <Form.Item className={'form-buttom'}>
          <Link to="/Register">
            <Button type="primary" htmlType="submit" className="login-form-button">
              Cadastrar
            </Button>
          </Link>
        </Form.Item>
      </Form>

    </div>

  )
}

export default Login;
