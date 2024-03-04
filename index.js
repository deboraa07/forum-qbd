const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./routes/usuarioRouter')

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/usuarios', router);

const port = 3000;
const database = require('./database/mongo.js');

app.listen(port, ()=>{
    console.log(`App running on port ${port}.`);
});