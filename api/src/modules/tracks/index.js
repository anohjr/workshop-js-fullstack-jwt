const router = require('express').Router();
const {getAll, getOne, postTracks, updateTracks, deleteTracks} = require('./controller');
const trackSchema = require("./validator");

const validate = require("../../middlewares/validator");
const {authorize} = require("../../middlewares/auth");

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', validate(trackSchema), postTracks);
router.put('/:id', authorize, updateTracks);
router.delete('/:id', authorize, deleteTracks);

module.exports = router;