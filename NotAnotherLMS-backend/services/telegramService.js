const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const sendTelegramMessage = async (chatID, message) => {
  try {
    await bot.sendMessage(chatID, message);
  } catch (error) {
    console.error("Error sending Telegram Message", error);
  }
};

module.exports = { sendTelegramMessage };
