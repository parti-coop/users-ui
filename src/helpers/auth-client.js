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

export function client_credential_token({ client_id, client_secret }) {
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
  ).then(res => res.data)
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
