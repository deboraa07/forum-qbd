const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./routes/usuarioRouter')

const app = express();
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});
app.use(express.static('public'));app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/usuarios', router);

const port = 3000;
const database = require('./database/mongo.js');

app.listen(port, ()=>{
    console.log(`App running on port ${port}.`);
});