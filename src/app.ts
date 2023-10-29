import express, {Request, Response} from 'express';
import { join } from 'path';
import cors from 'cors';

import sequelize from './db';
import api from './routes/api';


const app = express();

app.use(express.json());
app.use(cors())
app.set('sequelize', sequelize)
app.set('models', sequelize.models)
app.use(express.static(join(__dirname, '../', 'client', 'build')));

app.use('/api', api)


app.get('/*', (req: Request, res: Response) => {
    res.sendFile(join(__dirname, '../', 'client', 'build', 'index.html'))
})

export default app;
