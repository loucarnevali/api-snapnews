import 'dotenv/config';
import express from 'express';
import connectDataBase from './src/database/db.js';
import cors from 'cors';
import router from './src/routes/index.js';

const app = express();

connectDataBase();
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(() => {
  console.log(`Server is running app`);
});

export default app;
