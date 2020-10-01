import React from 'react';
import _Page from '../_Page';
import './styles.css';
import Header from '../../components/Header'
import { Rate, Tabs, Avatar, Select, Input, Button, Card, Progress, notification } from 'antd'
import rateService from '../../services/AvaliacaoService'
import storeService from '../../services/PainelLojaService'
import Menu from '../../components/Menu'
import Cart from '../../components/Cart'
import timeService from '../../services/HorarioFuncionamentoService'
import adressService from '../../services/EnderecoLojaService'
import Service from '../../services/UsuarioService'
import deliveryService from '../../services/FreteService'
import { isAuthenticated,  isAdm } from "../../Utils/JWT";
import {distance} from '../../Utils/Geo'
import {isOpen, week} from '../../Utils/Day'

class Main extends _Page {
  state = {
    painel: {},
    horario: {},
    rate: [],
    address: {},
    exemplo: {},
    delivery:{}
  }
  componentDidMount() {
    super.componentDidMount();
    storeService.get(3).then(response => {
      this.update({ painel: response.data })
    })
    timeService.get(1).then(response => {
      this.update({ horario: response.data })
    })
    rateService.getAll().then(response => {
      this.update({ rate: response.data })
    })
    adressService.get(1).then(response => {
      this.update({ address: response.data })
    })
    Service.meusDados().then(response => {
      this.update({exemplo: response.data})
    })
    deliveryService.get(1).then(response => {
      this.update({delivery: response.data})
    })
    
   
  }

  componetWillMount() {
    this.getModel()
  }

 
  setRate = value => {
    this.setState(prevState => {
      let model = Object.assign({}, prevState.jasper);  
      model.avaliacao = value;   
      rateService.save(model, "id_avaliacao").then(response => {      
      notification.open({
        message: "Sucesso!",
        description: "Obrigado por sua Avaliação"
      })
    })                            
    })
  }

  deliveryPrice (distance, fretes){
    if(distance <= fretes.distancia1){
      return fretes.valor1
    }if(distance <= fretes.distancia2){
      return fretes.valor2
    }if(distance <= fretes.distancia3){
      return fretes.valor3
    }if(distance <= fretes.distancia4){
      return fretes.valor4
    }else{
      return -1
    }
  }
  
  render() {
    const { Option } = Select
    const { TabPane } = Tabs
    const isAdmin = isAdm()
    const isLogado = isAuthenticated()
    const { painel, horario, address, rate, exemplo, delivery} = this.state
    var urlBanner = painel.img_banner
    var url = painel.img_perfil
    let total = 0
    
    rate.forEach(item => {
      if(total === 0){
        total =  parseFloat(item.avaliacao)
      }else{        
        total = (total + parseFloat(item.avaliacao)) /2 
      }
    })
    if (url != null) {
      url = url.replace('public', 'http://127.0.0.1:8000/storage')
    }
    if (urlBanner != null) {
      urlBanner = urlBanner.replace('public', 'http://127.0.0.1:8000/storage')
    }
    if(address)
    return (

      <div className="home">

        <Header color={painel.cor_secundaria} name={painel.titulo_loja} />
        <div id={'main-page'}>

          <Avatar src={"http://127.0.0.1:8000/" + url} shape="square" id="Avatar" />
          <div style={{ background: `url(${urlBanner})` }} >
            <Avatar src={url} shape="square" id="Avatar" style={{ margin: "10px" }} />
          </div>
         
          <div id="infoBody" style={{ backgroundColor: painel.cor_primaria }}>
          {(isLogado && isAdmin || !isLogado ) ? 
          <Select className="info" defaultValue="Horario Funcionamento">
          <Option value="Domingo" disabled>Domingo: {horario.dom_horario_inicio} <b> h- </b>{horario.dom_horario_fim}h</Option>
          <Option value="Segunda" disabled>Segunda: {horario.seg_horario_inicio}h-{horario.seg_horario_fim}h</Option>
          <Option value="Terça" disabled>Terça: {horario.ter_horario_inicio}h-{horario.ter_horario_fim}h</Option>
          <Option value="Quarta" disabled>Quarta: {horario.quar_horario_inicio}h-{horario.quar_horario_fim}h</Option>
          <Option value="Quinta" disabled>Quinta: {horario.quin_horario_inicio}h-{horario.quin_horario_fim}h</Option>
          <Option value="Sexta" disabled>Sexta: {horario.sex_horario_inicio}h-{horario.sex_horario_fim}h</Option>
          <Option value="Sábado" disabled>Sábado: {horario.sab_horario_inicio}h-{horario.sab_horario_fim}h</Option>
        </Select>
        :
        <Select   defaultValue={isOpen(horario)? "Funcionamento: Aberto" :  " Funcionamento: Fechado" }  className="info" >
        <Option value="Domingo" disabled>Domingo: {horario.dom_horario_inicio} <b> h- </b>{horario.dom_horario_fim}h</Option>
        <Option value="Segunda" disabled>Segunda: {horario.seg_horario_inicio}h-{horario.seg_horario_fim}h</Option>
        <Option value="Terça" disabled>Terça: {horario.ter_horario_inicio}h-{horario.ter_horario_fim}h</Option>
        <Option value="Quarta" disabled>Quarta: {horario.quar_horario_inicio}h-{horario.quar_horario_fim}h</Option>
        <Option value="Quinta" disabled>Quinta: {horario.quin_horario_inicio}h-{horario.quin_horario_fim}h</Option>
        <Option value="Sexta" disabled>Sexta: {horario.sex_horario_inicio}h-{horario.sex_horario_fim}h</Option>
        <Option value="Sábado" disabled>Sábado: {horario.sab_horario_inicio}h-{horario.sab_horario_fim}h</Option>

      </Select>        
      }
          
        
           
            <Select className="info" defaultValue={1}>
              <Option value={1} disabled>Tempo de Espera: {parseInt(painel.tempo_espera)}min</Option>
            </Select>
            
            <Select className="info" defaultValue={1}>
              <Option value={1} disabled>Distancia: {distance(exemplo.latitude || address.latitude ,exemplo.longitude || address.longitude ,address.latitude,address.longitude).toFixed(1)}Km</Option>
            </Select>
            <Select className="info" defaultValue="Formas de Pagamento">
              {(+painel.dinheiro === 1) ? <Option value="dinheiro" disabled>Dinheiro</Option> : null}
              {(+painel.credito === 1) ? <Option value="credito" disabled>Credito</Option> : null}
              {(+painel.debito === 1) ? <Option value="debito" disabled>Debito</Option> : null}
            </Select>
          </div>
          <div id="body">
            <div id="menu" style={{ backgroundColor: painel.cor_secundaria }}>

              <Tabs defaultActiveKey="1">
                
                <TabPane tab={<h2>Cardapio</h2>} key='1'>
                  <Menu />
                </TabPane>
                <TabPane tab={<h2>Avaliações</h2>} key='2'>
                  <>
                    <h2>Avalie Nossa Loja</h2>
                    <Rate defaultValue={total} onChange={this.setRate} allowHalf />
                  </>
                </TabPane>
                <TabPane tab={<h2>Informações:</h2>} key='3'>
                  <section>
                    <div>
                      <h3>Descrição:</h3>
                      <p>{painel.descricao_loja || 'Sem Descrição'}</p>                       
                    </div>

                    <div>
                      <h3>Endereço:</h3>
                       <p>{address.endereco || 'Sem Endereço'}</p> 
                     
                    </div>

                    <div id="divNumber">
                      <h3>Número:</h3>
                       <p>{address.numero || 'Sem Número'}</p>                       
                    </div>
                    <div>
                      <h3>Complemento:</h3>
                      <p>{address.complemento || 'Sem Complemento'}</p> 
                    </div>

                  </section>
                </TabPane>
              </Tabs>
            </div>

            <div id="left">
              {(isLogado) ? (isAdmin) ?
                (
                  <>
                  </>
                ) : (
                  <>
                    <Card style={{ backgroundColor: painel.cor_primaria, width: 300 }} id="cardCart" bordered={false}>
                      <Cart 
                        frete={this.deliveryPrice(distance(exemplo.latitude,exemplo.longitude,address.latitude,address.longitude), delivery)}
                        pontosU={exemplo.pontos}
                        pontosN={painel.comprado_real}
                        pontosG={painel.ponto_gerado}                      
                        pontosR={painel.ponto_real}                      
                        pontosD={painel.cupom_real}                      
                        isOpen={isOpen(horario) || false}
                        isPaypal ={painel.pagamento_paypal}
                        isRetirada ={painel.retirada_loja}
                        isEntrega ={painel.pagamento_entrega}
                        endereco = {painel.endereco}
                        numero = {painel.numero}
                        complemento = {painel.complemento}
                        />
                    </Card>
                    <Card id="bodyRewards" style={{ backgroundColor: painel.cor_primaria }}>
                      <h1>Pontos de Fidelidade</h1>
                      <h4>Seus pontos de fidelidade lhe renderam: </h4>
                      <Progress
                        strokeColor={painel.cor_secundaria}
                        status="normal" type="circle"
                        format={percent => percent + 'R$'}
                        percent={exemplo.pontos} />
                    </Card>
                  </>
                ) : (
                  <div id="loginBody" style={{ backgroundColor: painel.cor_primaria }}>
                  </div>
                )}

            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default (Main);
