const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { ValidateToken } = require('../AuthMidlleWare/AuthMidlleWare')
const { Users } = require('../models');
const { sign } = require('jsonwebtoken');

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
        });
    })
    res.json('sucess')
});
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await Users.findOne({ where: { username: username } });
    try {
        if (user) {
            bcrypt.compare(password, user.password).then(async (match) => {
                if (!match) res.json({ error: "Wrong username or password" });
                const accessToken = sign({ username: user.username, id: user.id }, "importnatsecret");
                res.json({ token: accessToken, username: username, id: user.id });
            })
        }
    } catch (error) {
        if (!user) {
            res.json("User doesn't exist");
            process.exit()
        }

    }

});
router.get("/auth", ValidateToken, async (req, res) => {
    console.log(`The user name is ${req.testuser.username} and the id  ${req.testuser.id}`);
    console.log(`The req.testuser value is ${req.testuser}`);
    res.json(req.testuser);
});
module.exports = router;