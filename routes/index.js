const router = require('express').Router();

const mainpageController = require('../controllers/mainpageController');
const projectRouter = require('./project');


router.get('/', mainpageController.home);

router.use('/project', projectRouter);

router.use((req, res) => {
  res.status(404).send('Not Found');
});

module.exports = router;
