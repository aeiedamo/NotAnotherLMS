const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.notify = (message) => {
  bot.on("message", (msg) => {
    if (msg.text == "/notify")
    bot.sendMessage(msg.chat.id, message);
  });
};

module.exports = { bot };
