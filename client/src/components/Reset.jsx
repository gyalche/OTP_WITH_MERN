import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Username.module.css';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import avatar from '../assets/profile.png';
import { resetPasswordValidation } from '../helper/validate';

const Reset = () => {
  const formik = useFormik({
    initialValues: { password: 'admin@123', confirm_pws: 'admin@123' },
    validateOnBlue: false,
    validateOnChange: false,
    validate: resetPasswordValidation,
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-full">
        <div className={styles.glass} style={{ width: '50%' }}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Reset</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter new Password
            </span>
          </div>
          <form className="py-20" onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                className={styles.textbox}
                type="password"
                placeholder="new password"
                {...formik.getFieldProps('password')}
              />
              <input
                className={styles.textbox}
                type="password"
                placeholder="repeat password"
                {...formik.getFieldProps('confirm_pwd')}
              />
              <button type="submit" className={styles.btn}>
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;
