const router = require('express').Router();
const {getAll, getOne, getTracksByAlbumId, postAlbums, updateAlbums, deleteAlbums} = require('./controller');
const albumSchema = require("./validator");

const validate = require("../../middlewares/validator");

router.get('/', getAll);
router.get('/:id', getOne);
router.get('/:id/tracks', getTracksByAlbumId);
router.post('/', validate(albumSchema), postAlbums);
router.put('/:id', updateAlbums);
router.delete('/:id', deleteAlbums);

module.exports = router;