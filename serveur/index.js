const express = require("express");
const sequelize = require('sequelize');
const cors = require('cors');
const app = express();

const db = require('./models');
app.use(express.json())
app.use(cors());
// Routers
const postRouter = require('./routers/Posts');
app.use('/post', postRouter);

const commentRouter = require('./routers/Comments');
app.use('/comments', commentRouter);

const usersRouter = require('./routers/Users');
app.use('/auth', usersRouter);
try {
    db.sequelize.sync().then(() => {
        app.listen(3001, () => {
            console.log('The server is runnig on 3001 port');
            console.log('Hi');
        });
    })
} catch (error) {
    console.log(error);
}
process.on('uncaughtException', err => {
    console.log(`this is the reason ${err}`);
    process.exit(1);
})






