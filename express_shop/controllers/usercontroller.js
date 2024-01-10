const bcrypt = require('bcryptjs');
const User = require('../models/User.js');
const createToken = require('../createtoken.js');

const UserController = {
  // uuden käyttäjän rekisteröinti
  registerUser: function (req, res, next) {
    // password kryptataan ennen kantaan laittamista
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const newuser = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        zip: req.body.address.zip,
      },
    };
    console.log(newuser);
    User.create(newuser)
      .then((user) => {
        const token = createToken(user); // tokenin luontimetodi
        // palautetaan token JSON-muodossa
        res.json({
          success: true,
          message: 'Tässä on valmis Token!',
          token: token,
        });
      })
      .catch((error) => {
        return res.status(500).send('Käyttäjän rekisteröinti epäonnistui.');
      });
  },

  // olemassa olevan käyttäjän autentikaatio
  // jos autentikaatio onnistuu, käyttäjälle luodaan token
  authenticateUser: function (req, res, next) {
    // etsitään käyttäjä kannasta http-pyynnöstä saadun käyttäjätunnuksen perusteella
    User.findOne(
      {
        username: req.body.username,
      },
      function (err, user) {
        if (err) {
          throw err;
        }
        if (!user) {
          res.json({
            success: false,
            message: 'Autentikaatio epäonnistui, käyttäjää ei ole.',
          });
        } else if (user) {
          // console.log(req.body.password); // lomakkelle syötetty salasana
          // console.log(user.password); // kannassa oleva salasana
          // verrataan lomakkeelle syötettyä salasanaa kannassa olevaan salasanaan
          // jos vertailtavat eivät ole samat, palautetaan tieto siitä että salasana oli väärä
          if (bcrypt.compareSync(req.body.password, user.password) === false) {
            res.json({
              success: false,
              message: 'Autentikaatio epäonnistui, väärä salasana.',
            });
          } else {
            // jos salasanat ovat samat, luodaan token
            const token = createToken(user); // tokenin luontimetodi
            // palautetaan token JSON-muodossa
            res.json({
              success: true,
              message: 'Tässä on valmis Token!',
              token: token,
            });
          }
        }
      }
    );
  },

  // Uuden käyttäjän lisääminen
  adduser: (req, res) => {
    console.log(req.body);
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const newuser = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
      shipping_address: {
        street: req.body.shipping_address.street,
        city: req.body.shipping_address.city,
        zip: req.body.shipping_address.zip,
      },
    };
    console.log(newuser);
    User.create(newuser)
      .then((user) => {
        console.log('New user inserted succesfully:' + user);
        res.json(user);
      })
      .catch((error) => {
        return res.status(400).json({
          error: 'Error creating user',
        });
      });
  },

  // käyttätietojen päivitys
  updateuser: (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((updateduser) => {
        if (!updateduser) {
          return res.status(404).json({ message: 'user not found' });
        }
        console.log('user updated successfully:', updateduser);
        res.json(updateduser);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      });
  },

  // Yksittäisen käyttäjän haku id:n perusteella
  userById: (req, res) => {
    User.findOne({ _id: req.params.id }, (error, user) => {
      if (error || !user) {
        return res.status(400).json({
          error: 'user not found',
        });
      }
      res.json(user);
    });
  },

  // Kaikkien käyttäjien haku
  allusers: (req, res) => {
    User.find((error, users) => {
      if (error || !users) {
        return res.status(400).json({
          error: 'users not found',
        });
      }
      res.json(users);
    });
  },

  // Käyttäjän poisto
  deleteuserById: (req, res) => {
    User.findByIdAndDelete(req.params.id, (error, user) => {
      if (error) {
        return res.status(400).json({
          error: 'Error deleting user',
        });
      }
      console.log('user deleted');
      res.json(user);
    });
  },
};

module.exports = UserController;
