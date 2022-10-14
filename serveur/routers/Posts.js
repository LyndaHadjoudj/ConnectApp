const { application } = require('express');
const express = require('express');
const router = express.Router();

const { Posts } = require('../models')


router.get('/', async (req, res) => {
    const listOfPosts = await Posts.findAll();
    // console.log(listOfPosts[2].id);
    res.json(listOfPosts);
});
router.post('/', async (req, res) => {
    const post = req.body;
    console.log('I am in the post of posts');
    await Posts.create(post);
    res.json(post);
});

router.get("/byId/:id", async (req, res) => {
    const Theid = req.params.id;
    const post = await Posts.findByPk(Theid);
    res.json(post);
});


module.exports = router;


