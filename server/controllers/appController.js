import User from '../model/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//middleware for verify user;
export async function verifyUser(req, res, next) {
  try {
    const token = req.headers.authroization.split(' ')[0];
    if (token) {
      const verify = jwt.verify(token, 'dawadon');
      if (verify) {
        const user = await await User.findById(verify.id);
        if (!user) throw new Error();
        req.user = user;
        next();
      }
    }
  } catch (error) {
    res.status(404).send({ error: 'Authentication error' });
  }
}
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
  const { username, password } = req.body;
  try {
    const user = User.findOne({ username });
    if (user) {
      const validate = await bcrypt.compare(password, user.password);
      if (!validate) {
        res.status(500).send({ message: 'password doesnt match' });
      } else {
        const token = jwt.sign({ userId: user._id }, 'dawadon', {
          expiresIn: '24h',
        });
        res.status(200).send({ message: 'sucessflly logged in' }, token, user);
      }
    } else {
      res.status(404).send({ message: 'username doesnt exist' });
    }
  } catch (error) {
    res.status(404).send(error);
  }
}

export async function getUser(req, res) {
  const { username } = req.params;
  try {
    if (!username) {
      res.status(501).send({ error: 'Invalid username' });
    }
    User.findOne({ username }, function (err, user) {
      if (err) return res.status(500).send({ error: err });
      if (!user) return res.status(501).send({ error: 'coulnt fint the user' });
      const { password, ...rest } = user._docs;
      return res.status(201).send(rest);
    });
  } catch (error) {
    res.status(404).send('cannot find user');
  }
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
