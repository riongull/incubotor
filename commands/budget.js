const { bashCommand } = require('../utils');

const getIncubatorProposal = async () => {
  const getBudget = 'curl -s https://www.dashcentral.org/api/v1/budget';
  const budgetData = JSON.parse(bashCommand(getBudget));
  const { proposals } = budgetData;
  const hash = 'c691e6026551d0ed9e5dc98f06ad6e1a14478ff7ce1dc33975a0599bf6a40108';
  const incubatorProposal = proposals.filter((p) => p.hash === hash)[0];
  return incubatorProposal;
};

exports.votesResponder = async ({ msg, keywords }) => {
  if (keywords.some((kw) => msg.content.includes(kw))) {
    const incubatorProposal = await getIncubatorProposal();
    const { yes, no, abstain } = incubatorProposal;
    msg.reply(`Incubator proposal votes:
      yes: ${yes}, no: ${no}, abstain: ${abstain}
    `);
  }
};

let lastYes = '0';
let lastNo = '0';
let lastAbstain = '0';
exports.votesNotifier = async ({ bot, notifyChannel }) => {
  const incubatorProposal = await getIncubatorProposal();
  const { yes, no, abstain } = incubatorProposal;
  if (yes !== lastYes || no !== lastNo || abstain !== lastAbstain) {
    const netYes = (yes - lastYes) > 0 ? `+${yes - lastYes}` : yes - lastYes;
    const netNo = (no - lastNo) > 0 ? `+${no - lastNo}` : no - lastNo;
    const netAbstain = (abstain - lastAbstain) > 0 ? `+${abstain - lastAbstain}` : abstain - lastAbstain;
    bot.channels.get(notifyChannel).send(`New Incubator proposal votes:
      Current: yes: ${yes}, no: ${no}, abstain: ${abstain}
      Previous: yes: ${lastYes}, no: ${lastNo}, abstain: ${lastAbstain}
      Difference: yes: ${netYes}, no: ${netNo}, abstain: ${netAbstain}
    `);
    lastYes = yes;
    lastNo = no;
    lastAbstain = abstain;
  }
};
