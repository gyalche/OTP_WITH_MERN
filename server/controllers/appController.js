import User from '../model/User.js';
import bcrypt from 'bcrypt';
export async function register(req, res) {
  try {
    const { username, password, profile, email } = req.body;
    //check the existing user;
    const existUsername = new Promise((resolve, reject) => {
      User.findOne({ username: username }, function (err, user) {
        if (err) reject(new Error(err.message));
        if (user) reject({ error: 'plases use unique username' });
        resolve();
      });
    });

    //rejct for existing email
    const existEmail = new Promise((resolve, reject) => {
      User.findOne({ email: email }, function (err, user) {
        if (err) reject(new Error(err.message));
        if (user) reject({ error: 'plases use unique email' });
        resolve();
      });
    });

    Promise.all([existUsername, existEmail]).then(() => {
      try {
        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              const user = new User({
                username,
                password: hashedPassword,
                email,
                profile,
              });

              user
                .save()
                .then((result) => {
                  res
                    .status(201)
                    .send({ message: 'user register sucessfully' });
                })
                .catch((error) => {
                  res.status(500).send(error);
                });
            })
            .catch((error) => {
              return res
                .status(500)
                .send({ error: 'Enable to hashed  password' });
            });
        }
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function login(req, res) {
  res.json('login');
}

export async function getUser(req, res) {
  res.json('get user');
}

export async function updateUser(req, res) {
  res.json('update user');
}

export async function generateOTP(req, res) {
  res.json('update user');
}

export async function verifyOTP(req, res) {
  res.json('update user');
}

export async function createResetSession(req, res) {
  res.json('update user');
}

export async function resetPassword(req, res) {
  res.json('update user');
}
