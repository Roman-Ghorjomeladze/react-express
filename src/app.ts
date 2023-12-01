import express, { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { sequelize } from './models/sequelize';
import cors from 'cors';
import { join } from 'path';
import api from './routes/api';

const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)


app.use(express.json());
app.use(cors())
app.set('sequelize', sequelize)
app.set('models', sequelize.models)
app.use(express.static(join(__dirname, '../', 'client', 'build')));

app.use('/api', api)


app.get('/*', (req: Request, res: Response) => {
    res.sendFile(join(__dirname, '../', 'client', 'build', 'index.html'))
})
export {app}
