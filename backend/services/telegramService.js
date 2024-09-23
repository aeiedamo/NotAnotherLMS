const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.notify = (message, arg) => {
  bot.on("message", (msg) => {
    if (msg.text == "/notify" && arg.notified == false) {
      bot.sendMessage(msg.chat.id, message);
      arg.notified = true;
      arg.save();
    }
  });
};

module.exports = { bot };
