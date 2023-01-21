import toast from 'react-hot-toast';

//validate login page username;
export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);
  return errors;
}
export async function validatePassword(values) {
  const errors = passwordVerify({}, values);
  return errors;
}
//validate reset;
export async function resetPasswordValidation(values) {
  const errors = passwordVerify({}, values);
  if (values.password !== values.confirm_pws) {
    errors.exists = toast.error('Password not matched');
  }
  return errors;
}
//validate register form;
export async function registerValidation(values) {
  const error = usernameVerify({}, values);
  passwordVerify(error, values);
  emailVerify(error, values);
  return error;
}

//validate profile page
export async function profileValidation(values) {
  const errors = emailVerify({}, values);
  return errors;
}

//validate email;
function emailVerify(error = {}, values) {
  if (!values.email) {
    error.email = toast.error('Email requuired');
  } else if (values.email.includes(' ')) {
    error.email = toast.error('Wrong email');
  } else if (!/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(values.email)) {
    error.email = toast.error('invalid email address..');
  }
  return error;
}
//validate password;
function passwordVerify(error = {}, values) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (!values.password) {
    error.password = toast.error('Password required');
  } else if (values.password.includes(' ')) {
    error.password = toast.error('Wrong Password');
  } else if (values.password.length < 4) {
    error.password = toast.error('Password must be more than 4 characters');
  } else if (!specialChars.test(values.password)) {
    error.password = toast.error('Password must have specail character');
  }
  return error;
}
//validate username;
function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error('Username required');
  } else if (values.username.includes(' ')) {
    error.username = toast.error('Invalid username');
  }
  return error;
}
