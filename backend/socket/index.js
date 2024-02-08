const Message = require('../models/MessageSchema');
module.exports = function setupSocket(io) {
    const userRooms = new Map();
    io.on('connection', (socket) => {
        console.log('New user connected');

        socket.on('disconnect', () => {
            const userData = userRooms.get(socket.id);
            if (userData) {
                const { username, room } = userData;
                console.log(`${username} has left room ${room}.`);

                const leaveMessage = new Message({
                    from_user: 'System',
                    room: room,
                    message: `${username} has left the room.`,
                    date_sent: new Date()
                });

                leaveMessage.save().then(() => {
                    io.to(room).emit('receive_message', leaveMessage);
                    userRooms.delete(socket.id); 
                }).catch(err => {
                    console.log('Error: ', err);
                });
            }
        });

        socket.on('join_room', (room, username) => {
            socket.join(room);
            userRooms.set(socket.id, { username, room }); 

            const joinMessage = new Message({
                from_user: 'System',
                room: room,
                message: `${username} has joined the room.`,
                date_sent: new Date()
            });

            joinMessage.save().then(() => {
                io.to(room).emit('receive_message', joinMessage);
            }).catch(err => {
                console.log('Error: ', err);
            });

            Message.find({ room: room }).sort({ date_sent: 1 }).then((messages) => {
                socket.emit('load_previous_messages', messages);
            }).catch(err => {
                console.log('Error: ', err);
            });
        });
        
        socket.on('send_message', (data) => {
            const newMessage = new Message({
                from_user: data.from_user,
                room: data.room,
                message: data.message
            });
            newMessage.save()
            .then(() => {
                io.to(data.room).emit('receive_message', newMessage);
            }).catch(err => {
                console.log('Error: ', err);
            });

            
            
        });
    });
}