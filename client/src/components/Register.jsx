import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Username.module.css';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import avatar from '../assets/profile.png';
import { registerValidation, validatePassword } from '../helper/validate';
import convertToBase64 from '../helper/convert';

const Register = () => {
  const [file, setFile] = useState();
  const formik = useFormik({
    initialValues: {
      email: 'dawa@gmail.com',
      username: 'example@123',
      password: 'admin@123',
    },
    validateOnBlue: false,
    validateOnChange: false,
    validate: registerValidation,
    onSubmit: async (values) => {
      console.log(values);
      values = await Object.assign(values, { profile: file || ' ' });
    },
  });

  //for file upload;
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-full">
        <div
          className={styles.glass}
          style={{ width: '45%', paddingTop: '3rem' }}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Register</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Happy to join you
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={file ? file : avatar}
                  className={styles.profile_img}
                  alt="avatar"
                />
              </label>
              <input
                type="file"
                id="profile"
                name="profile"
                onChange={onUpload}
              />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                className={styles.textbox}
                type="email"
                placeholder="email"
                {...formik.getFieldProps('email')}
              />
              <input
                className={styles.textbox}
                type="username"
                placeholder="username"
                {...formik.getFieldProps('username')}
              />
              <input
                className={styles.textbox}
                type="password"
                placeholder="password"
                {...formik.getFieldProps('password')}
              />
              <button type="submit" className={styles.btn}>
                Register
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                Already Register?{' '}
                <Link className="text-red-500" to="/">
                  Login Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
