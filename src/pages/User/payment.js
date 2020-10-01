import React from 'react'
import _Page from '../_Page'
import payService from '../../services/PayPalService'

class Payment extends _Page {
    state={
        sttaus: ''
    }
    componentDidMount() {
        super.componentDidMount();
       // this.setState({status:  payService.showStatusOrder(localStorage.getItem('idOrder')) })
       console.log(payService.showStatusOrder(localStorage.getItem('idOrder')))
      }
    render(){
        const{status} = this.state
        return(
            <>
                <p>{status}</p>
            </>
        )
    }
}export default Payment