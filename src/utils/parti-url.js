import normalize_url from 'normalize-url'
import config from '../config'

export function users_ui_url(path = '') {
  return normalize_url(`http://${config.host}:${config.port}${path}`)
}

export function users_api_url(path = '') {
  return normalize_url(`http://${config.apiHost}:${config.apiPort}${path}`)
}

export function auth_api_url(path = '') {
  return normalize_url(`http://${config.authApiHost}:${config.authApiPort}${path}`)
}
