import { IncomingMessage } from 'http';
import { METHOD, STATUS } from './constants/constants';
import { messages } from './data/messages';
import { addUser } from './handles/addUser';
import { deleteUser } from './handles/deleteUser';
import { getAllUsers } from './handles/getAllUsers';
import { getUser } from './handles/getUser';
import { patchUser } from './handles/patchUser';
import { updateUser } from './handles/updateUser';

export async function routeRequest(request: IncomingMessage, parts: string[]) {
  let status = STATUS.SERVER_ERROR;
  let res = messages.genericError;

  switch(request.method){
    case METHOD.GET: {
      // to check Internal server error uncomment a line below
      //throw new Error('gfg');
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

    case METHOD.PATCH: {
      const uid = parts[2];

      let body = '';
      const response: {status: number, res: string} = await new Promise((resolve) => {
        request.on('data', (chunk) => body += chunk);
        request.on('end', () => {
          const response = patchUser(uid, body);
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

  return {status, res}
}
