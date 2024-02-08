const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    "from_user": {
        type: String,
        required: true
    },
    "room": {
        type: String,
        required: true,
        enum:['devops', 'cybersecurity', 'cloud']
    },
    "message": {
        type: String,
        required: false
    },
    "date_sent": {
        type: Date,
        default: Date.now
    }
});
const Message = mongoose.model('Message', messageSchema);
module.exports = Message;