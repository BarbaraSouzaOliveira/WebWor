import fetch from 'node-fetch';

export default class ApiService {

  static fetch(url, options = {}) {
    if (options && options.body && typeof options.body !== 'string' && !(options.body instanceof FormData)) {
      // Remover valores undefined do BODY
      Object.keys(options.body).forEach(key => options.body[key] === undefined && delete options.body[key]);
      options.body = JSON.stringify(options.body);
    }

    if (!(options.body instanceof FormData)) {
      options.headers['Accept'] = 'application/json';
      options.headers['Content-Type'] = 'application/json';
    }

    return fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw response;
        }

        return response;
      });
  }

  static get(url, params = null, options = {}) {
    if (params) {
      const glue = url.includes('?') ? '&' : '?';
      url += glue + this.queryString(params);
    }

    return this.fetch(url, options);
  }

  static post(url, data, options = {}) {
    return this.fetch(url, {
      ...options,
      method: 'POST',
      body: data,
    });
  }

  static put(url, data, options = {}) {
    return this.fetch(url, {
      ...options,
      method: 'PUT',
      body: data,
    });
  }

  static delete(url, data, options = {}) {
    return this.fetch(url, {
      ...options,
      method: 'DELETE',
      body: data,
    });
  }

  static queryString(params) {
    let items = [];

    for (let attr in params) {
      let value = params[attr];

      // Ignorar valores undefined do QueryString
      if (value === undefined) {
        continue;
      }

      if (value === false) {
        value = '0';
      }

      if (value === true) {
        value = '1';
      }

      items.push(attr + '=' + value);
    }

    return items.join('&');
  }

  static formData(object) {
    const formData = new FormData();

    for (let attr in object) {
      let value = object[attr];

      // Ignorar valores undefined do FormData
      if (value === undefined) {
        continue;
      }

      if (typeof value === 'boolean') {
        value = Number(value);
      }

      if (value === null) {
        value = '';
      }

      formData.append(attr, value);
    }

    return formData;
  }

}
