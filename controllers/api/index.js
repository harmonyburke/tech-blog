const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');

router.use('/login', loginRoutes);
;

module.exports = router;
