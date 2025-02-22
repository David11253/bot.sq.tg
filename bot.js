const TelegramBot = require('node-telegram-bot-api');

// Вставьте ваш API-ключ от BotFather
const token = 'sq_my_test_bot';

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

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  // Ответ на любые другие сообщения, если нужно
  if (!msg.text.startsWith('/setbutton')) {
    bot.sendMessage(chatId, 'Отправь команду /setbutton для создания кнопки.');
  }
});
