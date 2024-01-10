const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const uc = require('../controllers/usercontroller'); // user-reittien kontrolleri
const authorize = require('../verifytoken'); // authorisointi eli vahvistetaan token

// rekisteröityminen eli luodaan uudet tunnarit
// http://localhost:3000/users/register
router.post('/register', uc.registerUser);

// kirjautuminen eli autentikaatio luoduilla tunnareilla
// http://localhost:3000/users/login
router.post('/login', uc.authenticateUser);

// reitti käyttäjän muokkaamiseen
router.put('/:id', authorize, uc.updateuser);

// reitti yksittäisen käyttäjän hakemiseen id:n perusteella
router.get('/:id', uc.userById);

// reitti kaikkien käyttäjien hakuun
router.get('/all', uc.allusers);

// reitti käyttäjän poistamiseen
router.delete('/:id', authorize, uc.deleteuserById);

module.exports = router;
