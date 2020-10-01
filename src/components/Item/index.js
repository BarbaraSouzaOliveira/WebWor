import React from "react";
import "./styles.css";
import { connect } from "react-redux";
import {Icon, Button, notification, InputNumber } from "antd";

import ActionTypes from "../../actions/actionTypes";
import PropTypes from "prop-types";

class Item extends React.Component {
  state = {
    quantidade: 1
  };
  static propTypes = {
    updateCart: PropTypes.func.isRequired,
    produtos: PropTypes.any.isRequired
  };
  render() {
    const { updateShopping, produtos } = this.props;
    const { quantidade } = this.state;
    var value = this.props.value;
    var val = parseFloat(value).toFixed(2);
    var promotion = this.props.promotion;
    var prm = parseFloat(promotion);
    var aux = (val * this.props.promotion) / 100;
    var totalValue = val - aux;
    if (this.props.cart) {
      return (
        <div id="cardSelected" style={{paddingLeft:"10px", width:"100%"}}>
          <div id="cardText">
            <h2><strong>x{this.props.amount}</strong> - <Icon type="shopping-cart" /> {this.props.name}</h2>
            <p>{this.props.description}</p>
            <p style={{fontSize:"20px",color:"green"}}>R${val * this.props.amount} <Icon type="shopping" /></p>
            <Button 
            icon="delete"
            onClick={() => {
                for(let i=0;i<produtos.length;i+=1){
                    if(produtos[i].titulo === this.props.name){
                        const novo = produtos.filter(t => t!==produtos[i])
                        updateShopping({produtos: novo})
                    }
                }                                                                          

            }}/>
          </div>         

        </div>
      );
    } else {
      if (+prm !== 0) {
        return (
          <div id="card">
            <div>
              {" "}
              <img src={this.props.img} alt="comida" />
            </div>

            <div style={{ width: "65%", padding: "0.5em" }}>
              <div className="titleCard">
                <h3 style={{fontSize:"22px"}}>{this.props.name}</h3> 
                <p style={{ paddingRight: "5px"}}><strike style={{color:"red"}}>R${val}</strike> <span style={{color:"green", fontSize:"22px"}}>R${totalValue.toFixed(2)}</span></p>
              </div>
              <div>
                <p style={{ textAlign: "justify" }}>{this.props.description}</p>
              </div>
              <p style={{ paddingRight: "30px" }}>
                <Icon type="money-collect" theme="twoTone" /> <strong>Promoção de {this.props.promotion} %</strong>
              </p>
              <div>
                <div className="buttonCard">
                  <InputNumber
                    value={quantidade}
                    onChange={e => this.setState({ quantidade: e })}
                    min={1}
                  />
                  <Button
                    onClick={() => {
                      updateShopping({
                        produtos: [
                          ...produtos,
                          {
                            titulo: this.props.name,
                            preco: totalValue.toFixed(2),
                            imagem: this.props.img,
                            id: this.props.id,
                            qtd: quantidade
                          }
                        ]
                      })
                      notification.open({
                        message: "Sucesso!",
                        description: "item inserido no carrinho"
                      });
                    }}
                  >
                    Comprar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      }
      if (+prm === 0) {
        return (


          <div id="card">
            <div>
              {" "}
              <img src={this.props.img} alt="comida" />
            </div>

            <div style={{ width: "65%", padding: "0.5em" }}>
              <div className="titleCard">
                <h3 style={{fontSize:"22px"}}>{this.props.name}</h3>
                <p style={{ paddingRight: "5px", fontSize:"22px" }}>R${totalValue.toFixed(2)}</p>
              </div>
              <div>
                <p style={{ textAlign: "justify" }}>{this.props.description}</p>
              </div>
              <div>
                <div className="buttonCard">
                  <InputNumber
                    value={quantidade}
                    onChange={e => this.setState({ quantidade: e })}
                    min={1}
                  />
                  <Button
                    onClick={() => {
                      updateShopping({
                        produtos: [
                          ...produtos,
                          {
                            titulo: this.props.name,
                            preco: totalValue.toFixed(2),
                            imagem: this.props.img,
                            id: this.props.id,
                            qtd: quantidade
                          }
                        ]
                      });
                      notification.open({
                        message: "Sucesso!",
                        description: "item inserido no carrinho"
                      });
                    }}
                  >
                    Comprar
                  </Button>
                </div>
              </div>
            </div>
          </div>

        );
      }
    }
  }
}
function mapDispatchToProps(dispatch) {
  return {
    updateShopping: data =>
      dispatch({
        type: ActionTypes.CART.SET_FIELDS,
        data
      })
  };
}
function mapStateToProps(state) {
  return {
    produtos: state.cart.produtos
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);
