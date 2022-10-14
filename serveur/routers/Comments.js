
const express = require('express');
const router = express.Router();
const { Comments } = require('../models');
const { ValidateToken } = require('../AuthMidlleWare/AuthMidlleWare')

router.get('/:postId', async (req, res) => {
    const postId = req.params.postId;
    const comments = await Comments.findAll({ where: { PostId: postId } });
    res.json(comments);
});


router.post('/', ValidateToken, async (req, res) => {
    const comment = req.body;
    const username = req.testuser.username;
    comment.username = username;
    await Comments.create(comment);
    res.json(comment);
});
// ("/byId/:id", async (req, res)
router.delete("/:commentId", ValidateToken, async (req, res) => {
    const commentId = req.params.commentId;

    await Comments.destroy({
        where: {
            id: commentId,
        },
    });

    res.json("DELETED SUCCESSFULLY");
});
module.exports = router;