import axios from 'axios';

const acess = {
  urlPayPal: 'https://api.sandbox.paypal.com',
  username: 'Af8pAKKiajNKk0DtBYxf7ph17i528BdnbRdSd36olposA07VbDqsqKkKRt4dAxtO68Z-Iyf_PXHeTig5',
  password: 'ENiMAupmnWdnJyx3EZCEDC5fE6JGgXHRFp1PgcTwONJYbC8ccAdn0awPLPSLxhXiI8L4x8crA5O9Cse3'
};

const API = axios.create({
  baseURL: acess.urlPayPal
});

loginPayPal();

export default class PayPalService {

  static async createOrder(value) {

    try {

      const params = {
        intent: "CAPTURE",
        purchase_units: [
          {
            "amount": {
              "currency_code": "BRL",
              "value": value
            }
          }
        ]
      };

      const {data} = await API.post('/v2/checkout/orders', params);
      return data;

    } catch (e) {
      throw e
    }

  }

  static async showStatusOrder(idOrder) {

    try {
      const {data} = await API.get(`/v2/checkout/orders/${idOrder}`);
      return data;

    } catch (e) {
      throw e;
    }

  }

  static async capturePayment(id) {
    try {
      API.defaults.headers.post['Content-Type'] = 'application/json';
      const {data} = await API.post(`/v2/checkout/orders/${id}/capture`);
      return data
    } catch (e) {
      console.log(e)
    }
  }

  static showLinkApprove(idOrder) {
    const url = `https://www.sandbox.paypal.com/checkoutnow?token=${idOrder}`;
    return url;
  }

}

async function loginPayPal(content) {

  try {

    //Usando application/x-www-form-urlencoded format
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    const {data} = await API.post('/v1/oauth2/token', params, {
      auth: {
        username: acess.username,
        password: acess.password,
      },
    });

    API.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
    

  } catch (e) {
    throw e
  }

}
