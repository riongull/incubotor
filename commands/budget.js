const { bashCommand } = require('../utils');

const getBudgetData = async () => {
  const getBudget = 'curl -s https://www.dashcentral.org/api/v1/budget';
  const budgetData = JSON.parse(bashCommand(getBudget));
  return budgetData;
};

exports.budgetResponder = ({ msg, keywords }) => {
  if (keywords.some((kw) => msg.content.includes(kw))) {
    getBudgetData().then((budgetData) => {
      msg.reply(`Budget: ${budgetData.budget.total_amount}`);
    });
  }
};

let lastYes = '0';
let lastNo = '0';
let lastAbstain = '0';
const hash = 'c691e6026551d0ed9e5dc98f06ad6e1a14478ff7ce1dc33975a0599bf6a40108';
exports.budgetNotifier = ({ bot, notifyChannel }) => {
  getBudgetData().then((budgetData) => {
    const { proposals } = budgetData;
    const incubatorProposal = proposals.filter((p) => p.hash === hash)[0];
    const { yes, no, abstain } = incubatorProposal;
    if (yes !== lastYes || no !== lastNo || abstain !== lastAbstain) {
      const netYes = (yes - lastYes) > 0 ? `+${yes - lastYes}` : yes - lastYes;
      const netNo = (no - lastNo) > 0 ? `+${no - lastNo}` : no - lastNo;
      const netAbstain = (abstain - lastAbstain) > 0 ? `+${abstain - lastAbstain}` : abstain - lastAbstain;
      bot.channels.get(notifyChannel).send(`New votes:
        Current votes: yes: ${yes}, no: ${no}, abstain: ${abstain}
        Previous votes: yes: ${lastYes}, no: ${lastNo}, abstain: ${lastAbstain}
        Changed votes: yes: ${netYes}, no: ${netNo}, abstain: ${netAbstain}
      `);
      lastYes = yes;
      lastNo = no;
      lastAbstain = abstain;
    }
  });
};
