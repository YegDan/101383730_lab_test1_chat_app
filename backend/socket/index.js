module.exports = function setupSocket(io) {
    io.on('connection', (socket) => {
        console.log('New user connected ');
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
        socket.on('join_room', (room) => {
            socket.join(room);
            console.log(`User ${socket.id} joined room: ${room}`);
            socket.to(room).emit('userJoined', `User ${socket.id} has joined the room.`);
        })
        socket.on('send_message', (data) => {
            const {room, message} = data;

            io.to(room).emit('receive_message', {message, sender: socket.id });
            
        });
    });
}