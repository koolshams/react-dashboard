import { Formik, Form, FormikProps } from 'formik';
import React from 'react';

import './login.scss';
import { LoginSchema } from './login-schema';
import { TextField } from '../common/components/form-elements/text-field/text-field';
import { withRouter, RouteComponentProps } from 'react-router';

export interface LoginFormFields {
  email: string;
  password: string;
}

interface LoginPageBaseProps extends RouteComponentProps<{}> {}

const LoginForm = ({ errors, touched }: FormikProps<LoginFormFields>) => (
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
);

class LoginPageBase extends React.Component<LoginPageBaseProps> {
  public onLogin = () => {
    this.props.history.push('/manage');
  };

  public render() {
    return (
      <div className="login-page container content">
        <div className="login-page--box">
          <h2>Login Page</h2>
          <Formik
            validateOnMount={true}
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={LoginSchema}
            onSubmit={this.onLogin}
            component={LoginForm}
          />
        </div>
      </div>
    );
  }
}

export const LoginPage = withRouter(LoginPageBase);
