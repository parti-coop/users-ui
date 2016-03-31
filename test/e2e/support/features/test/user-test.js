import chai, { expect } from 'chai'

import '../../setup-mocha'
import { clean_database } from '../database'
import {
  user_count,
  user_exists,
  user_does_not_exist,
  user_should_exist,
  user_should_not_exist
} from '../user'

describe('user_exists', () => {
  before(() => {
    return clean_database()
  })

  it('increases user count', function *() {
    const before_count = yield user_count()
    yield user_exists()
    const after_count = yield user_count()
    expect(after_count).to.equals(before_count + 1)
  })

  it('creates user with email and password', function *() {
    yield user_does_not_exist({ email: 'one@email.com' })
    const user = yield user_exists({
      email: 'one@email.com',
      password: 'OnePassword!'
    })
    expect(user.email).to.be.equals('one@email.com')
    expect(user.password).to.be.equals('OnePassword!')
    yield user_should_exist({ email: 'one@email.com' })
  })
})

describe('user_does_not_exist', () => {
  it('deletes existing user', function *() {
    const user = yield user_exists()
    yield user_does_not_exist({ email: user.email })
    yield user_should_not_exist({ email: user.email })
  })
})
