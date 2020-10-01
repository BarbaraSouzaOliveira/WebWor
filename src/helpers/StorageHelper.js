export default class StorageHelper {

  static KEYS = {
    TOKEN: '@token',
    USER: '@user',
  };

  static getMeta(key) {
    const item = localStorage.getItem(key);

    if (item) {
      try {
        return JSON.parse(item);
      } catch (e) {
      }
    }

    return null;
  }

  static getItem(key, def = null) {
    const item = localStorage.getItem(key);

    if (item) {
      try {
        const json = JSON.parse(item);
        return json.value;
      } catch (e) {
      }
    }

    return def;
  }

  static setItem(key, value) {
    const item = {
      key: key,
      value: value,
      created: (new Date()).toISOString(),
    };

    localStorage.setItem(key, JSON.stringify(item));
  }

  static removeItem(key) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }

  static getToken() {
    return this.getItem(this.KEYS.TOKEN);
  }

  static getUser() {
    return this.getItem(this.KEYS.USER);
  }

}
