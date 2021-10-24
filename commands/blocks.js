const { bashCommand } = require('../utils');

const getLatestBlock = async () => {
  const getBlocks = 'curl -s https://insight.dash.org/insight-api/blocks';
  const { blocks } = JSON.parse(bashCommand(getBlocks));
  return blocks;
};

exports.blockResponder = ({ msg, keywords }) => {
  if (keywords.some((kw) => msg.content.includes(kw))) {
    getLatestBlock().then((blocks) => {
      msg.reply(`Latest block: ${blocks[0].height}`);
    });
  }
};

let block = '0';
exports.blockNotifier = ({ bot, notifyChannel }) => {
  getLatestBlock().then((blocks) => {
    const { height } = blocks[0];
    if (height > block) {
      block = height;
      bot.channels.get(notifyChannel).send(`New block: ${block}`);
    }
  });
};
