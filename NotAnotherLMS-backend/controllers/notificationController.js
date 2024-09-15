const { sendTelegramMessage } = require('../services/telegramService');


const sendNotification = async (req, res) => {
    try {
        const { chatID, message } = req.body;
        await sendTelegramMessage(chatID, message);
        res.status(200).send({ message: 'Notification sent successfully' });
    }
    catch (error) {
        console.error('Error in sendNotification', error);
        res.status(500).send({ message: 'Server Error', error: error.message });
    }
};

module.exports = { sendNotification };
