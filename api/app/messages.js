const express = require('express');
const db = require('../fileDb');
const router = express.Router();

router.get('/', (req, res) => {
  const messages = db.getItems();
  return res.send(messages);

});


router.post('/', async (req, res, next) => {

  try {
    const post = {
      author: req.body.author,
      message: req.body.message,
    }

    if (req.file) {
      post.image = req.file.filename;
    }

    await db.addItem(post);

    return res.send({id: post.id, author: post.author, message: post.message, datetime: post.datetime});

  } catch (e) {
    next(e);
  }


});

module.exports = router;