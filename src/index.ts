import dotenv from 'dotenv'
dotenv.config();

import { IncomingMessage, ServerResponse, createServer } from 'http';
import { getAllUsers } from './getAllUsers';
import { getUser } from './getUser';
import { addUser } from './addUser';
import { resolve } from 'path';

const ERROR = 500;
const OK = 200;

const PORT = process.env.PORT;

export const server = createServer(async (request: IncomingMessage, response: ServerResponse) => {
  let status = 200;
  let res = request.method;

  switch(request.method){
    case 'GET': {
      const myURL = new URL(request.url, `http://${request.headers.host}`);

      const pathname = myURL.pathname;
      const parts = pathname.split('/').filter((item) => item !== '');

      if(parts.length === 2){              // GET api/users
        const allUsers = getAllUsers();
        status = allUsers.status;
        res = allUsers.res;
      } else {
        const uid = parts[2];             // GET api/users/{userId}
        const user = getUser(uid);
        status = user.status;
        res = user.res;
      }
      break;
    }
    case 'POST': {
      let body = '';
      const response: {status: number, res: string} = await new Promise((resolve) => {
        request.on('data', (chunk) => body += chunk);
        request.on('end', () => {
          const response = addUser(body);
          resolve(response);
        });
      });

      status = response.status;
      res = response.res;
      break;
    }
  }

  response.writeHead(status, {'Content-Type': 'text/html'});
  response.end(res);
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});