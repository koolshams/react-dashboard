import { Formik, Form } from 'formik';
import React from 'react';

import './login.scss';
import { LoginSchema } from './login-schema';
import { TextField } from '../common/components/form-elements/text-field/text-field';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

class LoginPageBase extends React.Component<{ onLogin: () => void }> {
  render() {
    return (
      <div className="login-page container content">
        <div className="login-page--box">
          <h2>Login Page</h2>
          <Formik
            isInitialValid={false}
            initialValues={
              {
                email: '',
                password: '',
              }
            }
            validationSchema={LoginSchema}
            onSubmit={this.props.onLogin}
          >
            {({ errors, touched }) => (
              <Form>
                <TextField
                  name="email"
                  type="email"
                  placeholder="Email"
                  title="Email"
                  error={errors.email}
                  touched={touched.email}
                  autoComplete="username"
                />
                <TextField
                  name="password"
                  type="password"
                  placeholder="Password"
                  title="Password"
                  error={errors.password}
                  touched={touched.password}
                  autoComplete="current-password"
                />
                <button type="submit" className="btn btn-primary mb-2">
                  Login
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export const LoginPage = connect(
  null,
  dispatch => ({
    onLogin: () => dispatch(push('/manage')),
  }),
)(LoginPageBase);
