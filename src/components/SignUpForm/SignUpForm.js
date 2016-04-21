import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { ButtonInput, Input, Panel } from 'react-bootstrap'

export const SignUpFormClassName = 'sign-up-form'

class SignUpForm extends React.Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };

  render() {
    const {
      fields: {email, nickname, password, passwordConfirmation},
      handleSubmit
    } = this.props

    return (
      <Panel header="Sign Up" bsStyle="info">
        <form className={SignUpFormClassName} onSubmit={handleSubmit}>
          <Input type="email" label="Email" placeholder="Enter email..." {...email} />
          <Input type="text" label="Nickname" placeholder="Enter Nickname..." {...nickname} />
          <Input type="password" label="Password" placeholder="Enter password..." {...password} />
          <Input type="password" label="Password Confirmation" placeholder="Enter password again..." {...passwordConfirmation} />
          <ButtonInput type="submit" value="Sign Up" bsStyle="primary" />
        </form>
      </Panel>
    )
  }
}

const SignUpReduxForm = reduxForm({
  form: 'signUp',
  fields: ['email', 'nickname', 'password', 'passwordConfirmation']
})(SignUpForm)

export default SignUpReduxForm
