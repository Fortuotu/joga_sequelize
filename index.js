const express = require('express');

const app = express();

const port = 3000;

const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://app:app_pw@localhost:3306/app_db");

sequelize
    .authenticate()
    .then(() => {
        console.log("Connected to database");
    })
    .catch(err => {
        console.log('Unable to connect to the database', err);
    });

const articleRouter = require('./routes/article');
app.use('/', articleRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.json({message: "welcome to app"});
});

app.listen(port, () => {
    console.log(`Server is running http://localhost:${port}`);
});
