const express = require('express')

const checkJwt = require('../auth0')
const db = require('../db/userDb')

const router = express.router()

router.get('/', checkJwt, async (req, res) => {
    try {
      const auth0_id = req.user?.sub;
  
      if (!auth0_id) {
        res.send(null);
        return;
      }
  
      const user = await db.getUser(auth0_id);
      res.json(user || null);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  })

  router.post('/', checkJwt, async (req, res) => {
    try {
      const auth0_id = req.user?.sub
      const { username, icon } = req.body
      const userDetails = {
        auth0_id,
        username,
        icon,
      }
  
      const usernameTaken = await db.userExists(username)
      if (usernameTaken) throw new Error('Username Taken')
  
      await db.createUser(userDetails)
  
      res.sendStatus(201)
    } catch (err) {
      console.error(err)
      if (err.message === 'Username Taken') {
        res.status(403).send('Username Taken')
      } else {
        res.status(500).send(err.message)
      }
    }
  })



module.exports = router