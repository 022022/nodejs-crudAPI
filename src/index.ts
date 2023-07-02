import dotenv from 'dotenv'
dotenv.config();

import { IncomingMessage, ServerResponse, createServer } from 'http';
import { getAllUsers } from './getAllUsers';
import { getUser } from './getUser';
import { addUser } from './addUser';
import { messages } from './data/messages';
import { updateUser } from './updateUser';
import { deleteUser } from './deleteUser';

const ERROR = 500;
const OK = 200;

const PORT = process.env.PORT;

export const server = createServer(async (request: IncomingMessage, response: ServerResponse) => {
  let status = 500;
  let res = messages.genericError;

  const myURL = new URL(request.url, `http://${request.headers.host}`);
  const pathname = myURL.pathname;
  const parts = pathname.split('/').filter((item) => item !== '');

  switch(request.method){
    case 'GET': {
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

    case 'PUT': {
      const uid = parts[2];

      let body = '';
      const response: {status: number, res: string} = await new Promise((resolve) => {
        request.on('data', (chunk) => body += chunk);
        request.on('end', () => {
          const response = updateUser(uid, body);
          resolve(response);
        });
      });

      status = response.status;
      res = response.res;
      break;
    }

    case 'DELETE': {
      const uid = parts[2];
      const deleted = deleteUser(uid);
      status = deleted.status;
      res = deleted.res;
      break;
    }
  }

  response.writeHead(status, {'Content-Type': 'text/html'});
  response.end(res);
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});