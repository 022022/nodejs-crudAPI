import dotenv from 'dotenv'
dotenv.config();

import { IncomingMessage, ServerResponse, createServer } from 'http';
import { STATUS } from './constants/constants';
import { routeRequest } from './routes';

const PORT = process.env.PORT;

export const server = createServer(async (request: IncomingMessage, response: ServerResponse) => {
  try{
    const myURL = new URL(String(request.url), `http://${request.headers.host}`);
    const pathname = myURL.pathname;
    const parts = pathname.split('/').filter((item) => item !== '');

    if(parts[0] !== 'api' || parts[1] !== 'users'){
      response.writeHead(STATUS.NOT_FOUND, {'Content-Type': 'text/html'});
      response.end(`Endpoint "${parts[0]}/${parts[1]}" doesn't exist. Please check and try again`);
    } else {
      const {status, res} = await routeRequest(request, parts);
      response.writeHead(status, {'Content-Type': 'text/html'});
      response.end(res);
    }
  } catch {
    response.writeHead(STATUS.SERVER_ERROR, {'Content-Type': 'text/html'});
    response.end('Internal Server Error, please contact the administrator');
  }


});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});