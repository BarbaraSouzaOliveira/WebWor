import React from "react"
import _Page from "../_Page"
import storeService from "../../services/PainelLojaService"
import { Card, Button, Icon, Avatar, Collapse } from "antd"
import { NavLink } from "react-router-dom"
import Header from "../../components/Header"

const { Panel } = Collapse;

class Preview extends _Page {
  state = {
    painel: []
  }

  componentDidMount() {
    super.componentDidMount();
    storeService.getAll().then(response => {
      this.update({ painel: response.data })
    })
  }

  render() {
    const { painel } = this.state
    return (
      <>
        <Header />
        {painel.map(data=> {
                return(
                    <>
                        <h1>{data.titulo_loja}</h1>
                        <NavLink
                                className="ant-btn"
                                to={"StoreInfo/" + data.id_painel}
                              >
                                <span>Editar</span>
                              </NavLink>
                    </>
                )}
            
            )}
        
                              
                           </>)}
}
export default Preview
