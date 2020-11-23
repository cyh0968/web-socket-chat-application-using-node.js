import { createServer } from 'http';
import staticHandler from 'serve-handler';
import ws from 'ws';

const server = createServer((req, res) => {
    return staticHandler(req, res, { public: 'www' });
});

const webScoketServer = new ws.Server({ server });

webScoketServer.on('connection', (client) => {
    console.log('Client connected');
    client.on('message', (msg) => {
        console.log(`Message: ${msg}`);
        broadcast(msg);
    });
});

function broadcast(msg) {
    for (const client of wss.clients) {
        if (client.readyState === ws.OPEN) {
            client.send(msg);
        }
    }
}

server.listen(process.argv[2] || 8080);
