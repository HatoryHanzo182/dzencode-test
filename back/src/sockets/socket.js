import { Server } from 'socket.io';

export function InitializeSocket(httpServer) 
{
    const io = new Server(httpServer, 
    {
        cors: 
        {
            origin: ['http://localhost:5173', 'http://34.53.176.159'],
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', HandleConnection);
}

function HandleConnection(socket) 
{
    BroadcastActiveSessions(socket.server);

    socket.on('disconnect', (reason) => 
    {
        BroadcastActiveSessions(socket.server);
    });
}

function BroadcastActiveSessions(io) 
{
    io.emit('active-sessions', io.of('/').sockets.size);
}