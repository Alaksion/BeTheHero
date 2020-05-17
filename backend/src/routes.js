const express = require('express')
const router = express.Router()
const ONGController = require('./controllers/OngController')
const IncController = require('./controllers/IncidentController')
const ProfileController = require('../src/controllers/ProfileController')
const SessionControler = require('../src/controllers/SessionController')


router.post('/session', SessionControler.create)

router.get("/ongs", ONGController.list)
router.post("/ongs", ONGController.create)
router.delete("/ongs/:id", ONGController.delete)
router.put("/ongs/:id", ONGController.update)

router.post("/incidents", IncController.create)
router.get("/incidents", IncController.list)
router.delete("/incidents/:id", IncController.delete)

router.get('/profile', ProfileController.index)



module.exports = router