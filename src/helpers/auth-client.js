import R from 'ramda'
import moment from 'moment'
import axios from 'axios'
import qs from 'qs'
import normalize_url from 'normalize-url'

const users_ui_client = {
  client_id: process.env.USERS_UI_CLIENT_ID,
  client_secret: process.env.USERS_UI_CLIENT_SECRET
}

export const CLIENT_CREDENTIALS_GRANT_TYPE = 'client_credentials'

const auth_api_client = axios.create({
  baseURL: auth_api_url()
})

export function users_ui_client_credential_token() {
  const { client_id, client_secret } = users_ui_client
  return client_credential_token({
    client_id,
    client_secret
  })
}

let token_cache = {}

export function clear_token_cache() {
  token_cache = {}
}

export function client_credential_token({ client_id, client_secret }) {
  const cache_key = `${client_id}:${client_secret}`
  const expires_at = R.pathOr(moment(0), [cache_key, 'expires_at'], token_cache)
  if (expires_at.isSameOrAfter(moment())) {
    return new Promise(resolve => {
      setTimeout(() => resolve(token_cache[cache_key]))
    })
  }
  return auth_api_client.post(
    '/v1/tokens',
    { grant_type: CLIENT_CREDENTIALS_GRANT_TYPE },
    {
      auth: {
        username: client_id,
        password: client_secret
      },
      transformRequest: [ qs.stringify ]
    }
  ).then(res => {
    const token = res.data
    if (token.expires_in) {
      token.expires_at = moment().add(token.expires_in - 10, 's')
      token_cache[cache_key] = token
    }
    return token
  })
}

function auth_api_host() {
  return process.env.AUTH_API_HOST || 'auth-api'
}

function auth_api_port() {
  return process.env.AUTH_API_PORT || 3030
}

function auth_api_url(path = '') {
  return normalize_url(`http://${auth_api_host()}:${auth_api_port()}${path}`)
}
