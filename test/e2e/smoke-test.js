import chai, { expect } from 'chai'

import axios from 'axios'
import url_equals from 'compare-urls'

import { users_ui_url, users_api_url } from '../../src/utils/parti-url'
import { createBrowser } from './support/browser'
import './support/setup-mocha'

describe('UI server', () => {
  it('is up', done => {
    const url = users_ui_url('/health-check')
    console.log('Smoke-test: ' + url)
    axios.get(url)
      .then(response => {
        expect(response.status).to.equal(200)
        expect(response.data['api-host']).to.equals('success')
        done()
      })
      .catch(err => {
        console.log(err)
        done(err)
      })
  })
})

describe('API server', () => {
  it('is up', done => {
    const url = users_api_url('/health_check')
    console.log('Smoke-test: ' + url)

    axios.get(url)
      .then(({ data }) => {
        expect(data).to.equal('success')
        done()
      })
      .catch(err => {
        console.log(err)
        done(err)
      })
  })
})

describe('browser', () => {
  let browser
  beforeEach(() => {
    browser = createBrowser()
  })
  afterEach((done) => {
    browser.end().then(() => { done() })
  })

  it ('connects to users-ui', function*() {
    const url = users_ui_url('/')
    const current_url = yield browser.goto(url).url()

    expect(url_equals(url, current_url)).to.be.true
  })
})
