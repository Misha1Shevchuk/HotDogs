const router = require("express").Router();
const hotDogsController = require('../controllers/hotDogsController');

router.get('/', hotDogsController.getHotDogs);
router.post('/', hotDogsController.addHotDog);
router.delete('/', hotDogsController.removeHotDog);
router.put('/', hotDogsController.changeHotDog);

module.exports = router;