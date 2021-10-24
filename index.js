const Discord = require('discord.js');

require('dotenv').config();
require('http')
  .createServer((_, s) => s.end('Up\n'))
  .listen(8080);

const { blockResponder, blockNotifier } = require('./commands/blocks');
const { budgetResponder, budgetNotifier } = require('./commands/budget');

const token = process.env.DISCORD_BOT_TOKEN;
const notifyChannel = process.env.DISCORD_NOTIFY_CHANNEL;

const bot = new Discord.Client();

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', (msg) => {
  if (!msg.isMentioned(bot.user.id)) return;
  blockResponder({ msg, keywords: ['latest', 'block'] });
  budgetResponder({ msg, keywords: ['budget', 'votes'] });
});

setInterval(() => {
  blockNotifier({ bot, notifyChannel });
  budgetNotifier({ bot, notifyChannel });
}, 10000);

bot.login(token);
