const { connect } = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat').StreamChat;
const crypto = require('crypto');

require('dotenv').config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_API_ID;



const signup = async (req, res) => {
    try {
        console.log('Signup endpoint hit');
        const { fullName, username, password, phoneNumber } = req.body;
        const userId = crypto.randomBytes(16).toString('hex');
        const serverClient = connect(api_key, api_secret, app_id);
        const hashedPassword = await bcrypt.hash(password, 10);
        const token = serverClient.createUserToken(userId);

        // Save the user details to your database here

        res.status(200).json({ token, fullName, username, userId, hashedPassword, phoneNumber });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        console.log('Login endpoint hit');
        const { username, password } = req.body;
        const client = StreamChat.getInstance(api_key, api_secret);
        const { users } = await client.queryUsers({ name: username });

        if (!users.length) return res.status(400).json({ message: 'User not found' });

        const user = users[0];
        const success = await bcrypt.compare(password, user.hashedPassword);
        const serverClient = connect(api_key, api_secret, app_id);
        const token = serverClient.createUserToken(user.id);

        if (success) {
            res.status(200).json({ token, fullName: user.fullName, username, userId: user.id });
        } else {
            res.status(400).json({ message: 'Incorrect password' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { signup, login };
