import axios from 'axios'
import health_check from 'express-healthcheck'
import { users_api_url } from 'utils/parti-url'

function applyMiddlewares(app) {
  applyHealthCheck(app)
  return app
}

function applyHealthCheck(app) {
  app.use('/health-check', health_check({
    healthy: () => (
      { 'api-host': 'success' }
    ),
    test: done => {
      const api_url = users_api_url('/health_check')
      console.log(`Checking ${api_url}`)
      axios.get(api_url)
        .then(({ data }) => {
          if (data === 'success') {
            done()
          } else {
            done('health_check users-api failed')
          }
        })
        .catch(err => {
          done(err)
        })
    }
  }))
}

export default applyMiddlewares
