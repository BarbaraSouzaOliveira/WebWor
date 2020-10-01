import React from "react";
import Item from "../Item";
import { Icon } from "antd";
import "./styles.css";
import _Page from "../../pages/_Page";
import productService from "../../services/ProdutoService";
import gProductService from "../../services/GrupoProdutoService";

class Menu extends _Page {
  state = {
    product: [],
    gp: [],
    filtro: 0
  };
  componentDidMount() {
    super.componentDidMount();
    productService.getAll().then(response => {
      this.update({ product: response.data });
    });
    gProductService.getAll().then(response => {
      this.update({ gp: response.data });
    });
  }

  render() {
    const { product, gp } = this.state;
    var url = null;

    return (
      <>
        <h2
          style={{
            fontSize: "33px",
            color: "#2d2d2d",
            textShadow: "-1.5px 1.5px 1.5px #00000045"
          }}
        >
          Promoções
        </h2>
        <div id="cardList">
          {product.map(pdt => {
            if (+pdt.promocao === 1) {
              url = pdt.img_produto;
              if (url != null) {
                url = url.replace("public", "http://127.0.0.1:8000/storage");
              }
              return (
                <Item
                  name={pdt.titulo}
                  description={pdt.descricao}
                  value={pdt.valor}
                  promotion={pdt.porcentagem_promocao}
                  img={url}
                  id={pdt.id_produto}
                  cart={false}
                  
                />
              );
            } else {
              return null;
            }
          })}
        </div>

        {gp.map(tipo => {
          return (
            <div>
              <h1 style={{ marginTop: "50px" }}>
                <Icon type="right-circle" /> {tipo.descricao}
              </h1>
              <div id="cardList">
                {product
                  .filter(e => +e.id_gp === +tipo.id_gp)
                  .map(pdt => {
                    url = pdt.img_produto;
                    if (url != null) {
                      url = url.replace(
                        "public",
                        "http://127.0.0.1:8000/storage"
                      );
                    }
                    return (
                      <>
                        <Item
                          name={pdt.titulo}
                          description={pdt.descricao}
                          value={pdt.valor}
                          promotion={pdt.porcentagem_promocao}
                          img={url}
                          id={pdt.id_produto}
                          cart={false}
                        />
                      </>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </>
    );
  }
}
export default Menu;
