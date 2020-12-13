const express = require('express');
const router = express.Router();
const authRouter = require('./authRouter.js')

router.use('/api', authRouter);

module.exports = router;