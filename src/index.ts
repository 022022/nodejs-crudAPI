import { IncomingMessage, ServerResponse, createServer } from 'http';
import dotenv from 'dotenv'
dotenv.config();

const ERROR = 500;
const OK = 200;

const PORT = process.env.PORT;

export const server = createServer((request: IncomingMessage, response: ServerResponse) => {
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end('Hello, World!');

});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});