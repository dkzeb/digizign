export const SocketHandler = (socket: SocketIO.Socket) => {
    socket.on('message', (msg: string) => {
        console.log(socket.id + ':', 'rcvd msg', msg);
    });
};
