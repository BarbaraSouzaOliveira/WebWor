import Service from '../services/UsuarioService'
export const TOKEN_KEY = "@KEY-Token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const isAdm = () => localStorage.getItem('isAdm');
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
  Service.meusDados().then(response => {
    if(response.data && !response.data.bl_cliente){
      localStorage.setItem('isAdm', !response.data.bl_cliente)
  }
  })
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem('isAdm');
  window.location.reload()
};
