const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user.controller');
const config = require('../config.js');

function authToken(req, res, next) {
    let token = req.body.token;
    console.log(token);

    if (!token) res.status(401).send({ error: "Token Missing" });

    if (token === config.token) {
        next();
    } else {
        res.status(401).send({ error: 'Invalid Token' });
    }
}

router.post('/get_badge_message', authToken, user_controller.get_badge_message);
module.exports = router;
