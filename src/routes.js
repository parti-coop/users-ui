import React from 'react'
import {IndexRoute, Route} from 'react-router'
import {
    App,
    Home,
    About,
    SignUpConfirmationDoneView,
    SignUpConfirmationSentView,
    SignUpView,
    NotFound,
  } from 'containers'

export default (store) => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>

      { /* Routes */ }
      <Route path="about" component={About}/>
      <Route path="sign-up" component={SignUpView}/>
      <Route path="sign-up/confirmation-sent" component={SignUpConfirmationSentView}/>
      <Route path="sign-up/confirmation-done" component={SignUpConfirmationDoneView}/>
      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  )
}
