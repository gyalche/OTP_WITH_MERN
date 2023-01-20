import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Username.module.css';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import avatar from '../assets/profile.png';
import { usernameValidate } from '../helper/validate';
const Username = () => {
  const formik = useFormik({
    initialValues: { username: '' },
    validateOnBlue: false,
    validateOnChange: false,
    validate: usernameValidate,
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-full">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore More by Connecting with us
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src={avatar} className={styles.profile_img} alt="avatar" />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                className={styles.textbox}
                type="text"
                placeholder="Username"
                {...formik.getFieldProps('username')}
              />
              <button type="submit" className={styles.btn}>
                Lets Go
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                Not a Member{' '}
                <Link className="text-red-500" to="/register">
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Username;
