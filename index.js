const Discord = require('discord.js');

require('dotenv').config();
require('http')
  .createServer((_, s) => s.end('Up\n'))
  .listen(8080);

const { incubatorTxNotifier, incubatorTxResponder } = require('./commands/transactions');
// const { votesResponder, votesNotifier } = require('./commands/budget');

const token = process.env.DISCORD_BOT_TOKEN;
const notifyChannel = process.env.DISCORD_NOTIFY_CHANNEL;

const bot = new Discord.Client();

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', (msg) => {
  if (!msg.isMentioned(bot.user.id)) return;
  incubatorTxResponder({ msg, keywords: ['incubator', 'account', 'data', 'balance', 'address'] });
  // votesResponder({ msg, keywords: ['votes'] });
});

setInterval(() => {
  incubatorTxNotifier({ bot, notifyChannel });
  // votesNotifier({ bot, notifyChannel });
}, 10000);

bot.login(token);
