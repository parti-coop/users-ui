import R from 'ramda'
import React, { PropTypes } from 'react'
import { Col, Row } from 'react-bootstrap'
import { actions as notifActions } from 're-notif'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { SignUpForm } from '../../components'
import { sign_up } from '../../redux/modules/sign-up'

const onSignUpSubmit = fields => dispatch => {
  const { email, password } = R.pick(['email', 'password'], fields)
  const sign_up_action = sign_up({
    email,
    password,
    onSuccess: res => dispatch(push('/sign-up/confirmation-sent')),
    onError: err => {
      const messages = R.pathOr([err.message], ['errors', 'full_messages'], err)
      messages.forEach(message => {
        dispatch(notifActions.notifSend({ message, kind: 'warning', dismissAfter: 5000 }))
      })
    }
  })
  dispatch(sign_up_action)
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {
  onSignUpSubmit
}

const SignUpView = props =>
  <Row>
    <Col md={4} mdOffset={4}>
      <SignUpForm onSubmit={props.onSignUpSubmit}/>
    </Col>
  </Row>

SignUpView.propTypes = {
  onSignUpSubmit: PropTypes.func.isRequired
}
// export default SignUpView
export default connect(mapStateToProps, mapDispatchToProps)(SignUpView)
