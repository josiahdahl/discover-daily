import { config } from 'dotenv';
config();
import { app } from './app/core/app';
import './app/routes';

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
