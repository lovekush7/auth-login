const router = require('express').Router();
const User = require('../Model/Users');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation.js');
const bcrypt = require('bcryptjs');

router.post('/register', async(req, res) => {

    // lets validate the data before we make/register a user
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({
        email: req.body.email
    });
    if (emailExist) return res.status(400).send('Email already exists');

    //hashed password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone
    })
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/login', async(req, res) => {
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({
        email: req.body.email
    });
    if (!user) return res.status(400).json({ message: 'Invalid email' })
        //password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json({ message: 'Invalid password' })

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.header('auth-token', token).json({
        token: token,
        success: true,
        email: req.body.email,

    });
});
module.exports = router;