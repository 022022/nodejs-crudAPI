import dotenv from 'dotenv'
dotenv.config();

import { IncomingMessage, ServerResponse, createServer } from 'http';
import { getAllUsers } from './handles/getAllUsers';
import { getUser } from './handles/getUser';
import { addUser } from './handles/addUser';
import { messages } from './data/messages';
import { updateUser } from './handles/updateUser';
import { deleteUser } from './handles/deleteUser';
import { METHOD, STATUS } from './constants/constants';

const PORT = process.env.PORT;

export const server = createServer(async (request: IncomingMessage, response: ServerResponse) => {
  let status = STATUS.SERVER_ERROR;
  let res = messages.genericError;

  const myURL = new URL(request.url, `http://${request.headers.host}`);
  const pathname = myURL.pathname;
  const parts = pathname.split('/').filter((item) => item !== '');

  if(parts[0] !== 'api' || parts[1] !== 'users'){
    response.writeHead(STATUS.NOT_FOUND, {'Content-Type': 'text/html'});
    response.end(`Endpoint "${parts[0]}/${parts[1]}" doesn't exist. Please check and try again`);
  } else {
    switch(request.method){
      case METHOD.GET: {
        if(parts.length === 2){
          const allUsers = getAllUsers();
          status = allUsers.status;
          res = allUsers.res;
        } else {
          const uid = parts[2];
          const user = getUser(uid);
          status = user.status;
          res = user.res;
        }
        break;
      }

      case METHOD.POST: {
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

      case METHOD.PUT: {
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

      case METHOD.DELETE: {
        const uid = parts[2];
        const deleted = deleteUser(uid);
        status = deleted.status;
        res = deleted.res;
        break;
      }
    }

    response.writeHead(status, {'Content-Type': 'text/html'});
    response.end(res);
  }

});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});