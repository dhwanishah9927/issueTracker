const router = require('express').Router();
const projectpageController = require('../controllers/projectpageController');

router.post('/create', projectpageController.createProject);
router.get('/:id', projectpageController.projectPage);
router.post('/:id', projectpageController.createIssueButton);

module.exports = router;
