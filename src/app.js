const express = require('express');
const {join} = require('path');
const cors = require('cors')

const {sequelize} = require('./model')
const api = require('./routes/api');


const app = express();

app.use(express.json());
app.use(cors())
app.set('sequelize', sequelize)
app.set('models', sequelize.models)
app.use(express.static(join(__dirname, '../', 'client', 'build')));

app.use('/api', api)


app.get('/*', (req, res) => {
    res.sendFile(join(__dirname, '../', 'client', 'build', 'index.html'))
})

module.exports = app;
