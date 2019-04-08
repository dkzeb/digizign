export const twitterServiceSocket = (socket: SocketIO.Socket) => {

    socket.on('message', (msg: string) => {
        console.log(socket.id + ':', 'rcvd msg from Twitter Socket', msg);
    });

};
