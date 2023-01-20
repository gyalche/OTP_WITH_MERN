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
