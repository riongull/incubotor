const { bashCommand } = require('../utils');

let firstPoll = true;
let prevMostRecentTx = '';

const getIncubatorAddressData = async () => {
  const incubatorAddress = 'XoNcU93gE6yMegtTSQpzHGPfHMRUiLS8Ub';
  const getData = `curl -s https://insight.dash.org/insight-api/addr/${incubatorAddress}`;
  const incubatorData = JSON.parse(bashCommand(getData));
  return {
    raw: incubatorData,
    summary: {
      tranactionCount: incubatorData.txAppearances,
      address: incubatorData.address,
      balance: incubatorData.balance,
      unconfirmedBalance: incubatorData.unconfirmedBalance,
      mostRecentTx: incubatorData.transactions[0],
    },
  };
};

const getTxData = async (tx) => {
  const getData = `curl -s https://insight.dash.org/insight-api/tx/${tx}`;
  return JSON.parse(bashCommand(getData));
};

exports.incubatorTxResponder = ({ msg, keywords }) => {
  if (keywords.some((kw) => msg.content.includes(kw))) {
    getIncubatorAddressData().then((data) => {
      msg.reply(`Incubator account data:\`\`\`json\n${
        JSON.stringify(data.summary, null, 2)
      }\`\`\``);
    });
  }
};

exports.incubatorTxNotifier = ({ bot, notifyChannel }) => {
  getIncubatorAddressData().then((data) => {
    const mostRecentTx = data.summary.mostRecentTx;
    if (firstPoll) {
      prevMostRecentTx = mostRecentTx;
      firstPoll = false;
      return;
    }
    if (mostRecentTx !== prevMostRecentTx) {
      const index = data.raw.transactions.findIndex((t) => t === prevMostRecentTx);
      const newTxs = data.raw.transactions.slice(0, index);
      prevMostRecentTx = mostRecentTx;
      newTxs.forEach((tx) => {
        getTxData(tx).then((txData) => {
          const txOutput = txData.vout.map((v) => ({
            address: v.scriptPubKey.addresses[0],
            value: v.value,
          }));
          bot.channels.get(notifyChannel).send(
            `New Incubator transaction:\`\`\`json\n${
              JSON.stringify(txOutput, null, 2)
            }\`\`\`<https://insight.dash.org/insight/tx/${tx}>`,
          );
        });
      });
    }
  });
};
