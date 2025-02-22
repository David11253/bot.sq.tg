const TelegramBot = require('node-telegram-bot-api');

// Вставьте ваш API-ключ
const token = '7551398076:AAF_p8nbLS8LYprcmyIwJeufR4GD0bADHxY';

const bot = new TelegramBot(token, { polling: true });

// Храним кнопки и обновления
let lastButton = null;
let buttons = [];
let lastUpdate = new Date().toLocaleString();

// Обработчик команды /setbutton
bot.onText(/\/setbutton id\((\d+)\) txt\(([^)]+)\) link\(([^)]+)\)/, (msg, match) => {
  const chatId = msg.chat.id;
  
  // Извлекаем параметры из команды
  const buttonId = match[1]; // id (число)
  const buttonText = match[2]; // текст кнопки
  const buttonLink = match[3]; // ссылка

  // Создаем кнопку
  const button = {
    id: buttonId,
    text: buttonText,
    link: buttonLink
  };

  // Сохраняем последнюю кнопку
  lastButton = button;

  // Отправляем кнопку
  const keyboard = [
    [
      {
        text: button.text,
        url: button.link
      }
    ]
  ];

  bot.sendMessage(chatId, `Кнопка с id: ${button.id} создана!`, {
    reply_markup: {
      inline_keyboard: keyboard
    }
  });

  lastUpdate = new Date().toLocaleString(); // Обновляем время последнего обновления
});

// Обработчик команды /getmybutton
bot.onText(/\/getmybutton/, (msg) => {
  const chatId = msg.chat.id;

  if (lastButton) {
    const keyboard = [
      [
        {
          text: lastButton.text,
          url: lastButton.link
        }
      ]
    ];
    
    bot.sendMessage(chatId, `Вот ваша последняя кнопка:`, {
      reply_markup: {
        inline_keyboard: keyboard
      }
    });
  } else {
    bot.sendMessage(chatId, 'У вас еще нет кнопок!');
  }
});

// Обработчик команды /hi
bot.onText(/\/hi/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Последнее обновление было: ${lastUpdate}`);
});

// Обработчик команды /setmenubutton
bot.onText(/\/setmenubutton col = (\d+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const numColumns = parseInt(match[1]);

  // Отправляем клавиатуру с несколькими кнопками
  const keyboard = [];
  let row = [];
  
  // Пример кнопок
  for (let i = 1; i <= 9; i++) {
    const buttonText = `Кнопка ${i}`;
    const buttonLink = `https://example.com/${i}`;
    
    row.push({
      text: buttonText,
      url: buttonLink
    });

    // Если достигли нужного количества колонок, добавляем строку в клавиатуру
    if (row.length === numColumns) {
      keyboard.push(row);
      row = []; // сбрасываем строку
    }
  }

  // Если есть неполная строка, добавляем ее в клавиатуру
  if (row.length > 0) {
    keyboard.push(row);
  }

  bot.sendMessage(chatId, 'Вот ваш меню с кнопками:', {
    reply_markup: {
      inline_keyboard: keyboard
    }
  });
});

// Обработчик команды /help
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  
  const helpText = `
  Список доступных команд:
  - /setbutton id(число) txt(текст) link(ссылка) — создает одну кнопку.
  - /getmybutton — показывает последнюю созданную кнопку.
  - /hi — выводит информацию о последнем обновлении.
  - /setmenubutton col = (число) — создает несколько кнопок с заданным количеством колонок.
  - /help — выводит этот список команд.
  `;
  
  bot.sendMessage(chatId, helpText);
});
