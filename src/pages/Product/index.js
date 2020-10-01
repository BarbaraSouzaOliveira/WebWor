import React from "react";
import _Page from "../_Page";
import productService from "../../services/ProdutoService";
import gProductService from "../../services/GrupoProdutoService";
import { Card, Button, Avatar, Collapse } from "antd";
import { NavLink } from "react-router-dom";
import Header from "../../components/Header";


const { Panel } = Collapse;

class Product extends _Page {
  state = {
    product: [],
    gProduct: []
  };

  componentDidMount() {
    super.componentDidMount();
    productService.getAll().then(response => {
      this.update({ product: response.data });
    });
    gProductService.getAll().then(response => {
      this.update({ gProduct: response.data });
    });
  }

  render() {
    const { product, gProduct } = this.state;
    var url = null;    
    return (
      <>
        <Header />
        <h2 style={{ textAlign: "center" }}>Lista de Produtos</h2>
        {gProduct.map(tipo => {
          return (
            <>
              <Collapse>
                <Panel className="panel" header={<h2>{tipo.descricao}</h2>}>
                  {product
                    .filter(e => +e.id_gp === +tipo.id_gp)
                    .map(pdt => {
                      url = pdt.img_produto
                  if(url != null){
                    url= url.replace('public', 'http://127.0.0.1:8000/storage')              
                  }
                      return (
                        <>
                          <Card className="card" title={pdt.titulo}>
                            <div id="card-div-content">
                              <Avatar shape={"square"} size={"large"} src={url} id="avatar"/>

                              <span id="card-value">Valor: {pdt.valor}</span>
                              <span>
                                Porcentagem da promoção:{" "}
                                {pdt.porcentagem_promocao}
                              </span>
                            </div>
                            <div>
                              <p id="card-desc">{pdt.descricao}</p>
                            </div>

                            <div>
                            <Button icon="delete"
                              onClick={e => {
                               e.preventDefault()
                               productService.delete(pdt.id_produto).then(response => {
                               productService.getAll().then(response => {
                               this.update({ product: response.data })

                        })
                        })
                        window.location.reload()

                        }}
                    />
                              <NavLink
                                className="ant-btn"
                                to={"CreateProduct/" + pdt.id_produto}
                              >
                                <span>Editar</span>
                              </NavLink>
                            </div>
                          </Card>
                        </>
                      );
                    })}
                </Panel>
              </Collapse>
            </>
          );
        })}
      </>
    );
  }
}
export default Product;
