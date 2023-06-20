const express = require('express')

const db = require('../db/userDb')

const router = express.router()

router.get('/', (req, res) => {
    db.getUser()
    .then((results) => {
        res.json({user: results})
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({message: 'error getting user'})
    })
})

module.exports = router