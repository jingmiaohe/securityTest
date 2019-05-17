import Cookies from 'js-cookie'

const TokenKey = 'hb_test_token'

export function getToken() {
  console.log('getToken:', Cookies.get(TokenKey))
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  console.log('setToken:', token)
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
