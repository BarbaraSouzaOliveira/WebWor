import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { isAuthenticated, logout, isAdm } from "../../Utils/JWT";
import "./styles.css";

class Header extends React.Component {
  
  render() {
    const logado = isAuthenticated()
    const restaurante = isAdm()
    if(this.props.color!=null){
      return (
        <nav id={"nav-main"} style={{backgroundColor:this.props.color}}>
          {logado === false ? (
            <>
              <Link to="/">
              <Button icon="home" />
              </Link>
              <Link to="/Login">
              <Button icon="user-add" />
              </Link>
            </>
          ) : restaurante ? (
            <>
            <Link to="/">
            <Button icon="home" />
            </Link>
            <h2>{this.props.name}</h2>
            <div>
              <Link to="/Admin">
                <Button icon="shop" />
              </Link>
              <Button onClick={e => {
                logout()
              }}>Sair</Button>
            </div>  
            </>
          ) : (
            <>
            <Link to="/">
            <Button icon="home" />
              </Link>
              <h2>{this.props.name}</h2>
              <div>
              <Link to="User">
                <Button icon="user" />
              </Link>
              <Button onClick={e => {
                logout()
              }}>Sair</Button>
              </div>
            </>
          )}
        </nav>
      )
    }
    return (
      <nav id={"nav-main"}>
        {logado === false ? (
            <>
              <Link to="/">
              <Button icon="home" />
              </Link>
              <Link to="/Login">
              <Button icon="user-add" />
              </Link>
            </>
          ) : restaurante ? (
            <>
            <Link to="/">
            <Button icon="home" />
            </Link>
            <h2>{this.props.name}</h2>
            <div>
              <Link to="/Admin">
                <Button icon="shop" />
              </Link>
              <Button onClick={e => {
                logout()
              }}>Sair</Button>
            </div>  
            </>
          ) : (
            <>
            <Link to="/">
            <Button icon="home" />
              </Link>
              <h2>{this.props.name}</h2>
              <div>
              <Link to="User">
                <Button icon="user" />
              </Link>
              <Button onClick={e => {
                logout()
              }}>Sair</Button>
              </div>
            </>
          )}
      </nav>
    )
  }
}

export default Header;
