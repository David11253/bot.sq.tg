const TelegramBot = require('node-telegram-bot-api');

// Вставьте ваш API-ключ от BotFather
const token = '7551398076:AAF_p8nbLS8LYprcmyIwJeufR4GD0bADHxY';

const bot = new TelegramBot(token, { polling: true });

// Обработчик команды /setbutton
bot.onText(/\/setbutton id\((\d+)\) txt\(([^)]+)\) link\(([^)]+)\)/, (msg, match) => {
  const chatId = msg.chat.id;

  // Извлекаем параметры из команды
  const buttonId = match[1]; // id (число)
  const buttonText = match[2]; // текст кнопки
  const buttonLink = match[3]; // ссылка

  // Создаем кнопку
  const keyboard = [
    [
      {
        text: buttonText,
        url: buttonLink
      }
    ]
  ];

  // Отправляем сообщение с кнопкой
  bot.sendMessage(chatId, `Кнопка с id: ${buttonId} создана!`, {
    reply_markup: {
      inline_keyboard: keyboard
    }
  });
});

// Обработчик команды /hi
bot.onText(/\/hi/, (msg) => {
  const chatId = msg.chat.id;
  // Ответ на команду /hi
  bot.sendMessage(chatId, 'Привет, я работаю!');
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  // Ответ на любые другие сообщения, если нужно
  if (!msg.text.startsWith('/setbutton') && !msg.text.startsWith('/hi')) {
    bot.sendMessage(chatId, 'Отправь команду /hi, чтобы проверить, работает ли бот.');
  }
});
