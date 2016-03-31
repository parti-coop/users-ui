import test_client from '../test-client'

export function clean_database() {
  return test_client.post('/v1/test/database/clean').then(() => {
    test_client.token = null
  })
}
