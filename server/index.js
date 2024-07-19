const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.js');

const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
const twilioClient = require('twilio')(accountSid, authToken);

app.use(cors({
    origin: 'http://localhost:3000', // Allow your frontend origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    console.log(req.body);
    res.send('Hello World');
});

app.use('/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
