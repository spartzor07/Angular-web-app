const express = require('express');
const admin = require("firebase-admin");
const jwt = require('jsonwebtoken')
const router = express.Router();
const mongoose = require('mongoose');
const User = require('./../models/users')
const Produkti = require('./../models/products');
const Shopp = require('./../models/shopping');
const db = 'mongodb://localhost:27017/?readPreference=primary&ssl=false'

const uuid4 = require('uuid4');
const bucket = admin.storage().bucket();

mongoose.connect(db, err => {
    if (err) {
        console.error('Error: didn\'t connect' + err)
    } else {
        console.log('Successful connection!')
    }
});


router.get('/', function (req, res) {
    res.send('Welcome from API');
});
router.post('/register', (req, res) => {
    let user = new User({
        username: req.body.username,
        password: req.body.password
    })
    user.save();
    // let payload = { subject: user._id }
    // let token = jwt.sign(payload, 'secretKey')
    res.status(200).send(user)
})
router.post('/login', (req, res) => {
    let userData = req.body
    User.findOne({ username: userData.username }, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if (!user) {
                res.status(401).send('Invalid username')
            } else if (user.password !== userData.password) {
                res.status(401).send('Invalid password')
            } else {
                let payload = { subject: user.admin }
                let token = jwt.sign(payload, 'secretKey')
                res.status(200).send({token})
                return;
            }
        }
    })
})
router.get('/prodaja', (req, res) => {
    Produkti.find({}).exec((err, produkti) => {
        if (err) {
            console.log(err)
        } else {
            res.json(produkti)
        }
    })
})

router.delete('/prodaja/:id', (req, res) => {
    Produkti.findByIdAndDelete(req.params.id).exec((err, produkti) => {
        if (err) {
            console.log(err)
        } else { 
            res.json(produkti)
        }
    })
})

router.post('/napraviNovi', async (req, res) => {
    const uuid = uuid4()
    const metadata = {
        metadata: {
            // This line is very important. It's to create a download token.
            firebaseStorageDownloadTokens: uuid
        },
        contentType: 'image/png',
        cacheControl: 'public, max-age=31536000',
    };
    const {
        fieldname,
        originalname,
        encoding,
        mimetype,
        data,
    } = req.files.imageUrl
    const bucket = await admin
        .storage()
        .bucket("projekat-angular-283d8.appspot.com")
    console.log("Added to bucket")
    const file = bucket.file(uuid)
    await file.save(data, { metadata: metadata })
    const downloadUrl = "https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + encodeURIComponent(file.name) + "?alt=media&token=" + uuid
    console.log(downloadUrl)

    let produkti = new Produkti({
        imageUrl: downloadUrl,
        ime: req.body.ime,
        sadrzaj: req.body.sadrzaj

    });
    produkti.save();
    res.status(200).send()
})
router.post('/shoppingCard', async (req, res) => {
    console.log('Pocetak ')
    const uuid = uuid4()
    const metadata = {
        metadata: {
            // This line is very important. It's to create a download token.
            firebaseStorageDownloadTokens: uuid
        },
        contentType: 'image/png',
        cacheControl: 'public, max-age=31536000',
    };
    const {
        fieldname,
        originalname,
        encoding,
        mimetype,
        data,
    } = req.files.imageUrl
    const bucket = await admin
        .storage()
        .bucket("projekat-angular-283d8.appspot.com")
    console.log("Added to bucket")
    const file = bucket.file(uuid)
    await file.save(data, { metadata: metadata })
    const downloadUrl = "https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + encodeURIComponent(file.name) + "?alt=media&token=" + uuid
    console.log(downloadUrl)

    let shopp = new Shopp({
        imageUrl: downloadUrl,
        ime: req.body.ime,
        sadrzaj: req.body.sadrzaj

    });
    shopp.save();
    res.status(200).send()
})
module.exports = router;