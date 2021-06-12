module.exports.config = {
  name: "setmoney",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "NTKhang", //pls don't edit credits
  description: "thêm tiền hoặc trừ tiền",
  commandCategory: "admin",
  usages: "setmoney id/tag/me/reset",
  cooldowns: 5
};
module.exports.run = async function({ api, Users, Threads, event, Currencies, global, args
}) {
  if (!args[0]) return api.sendMessage("Sai cú pháp. setmoney id/tag/me/reset", event.threadID, event.messageID);
  var { body } = event;
  var mention = Object.keys(event.mentions);
  var content = args.join(" ");
  var moneySet = content.slice(content.lastIndexOf(" ") + 1);
 ///api.sendMessage(moneySet, event.threadID);
  if (isNaN(moneySet))
    return api.sendMessage("Số tiền cần set phải là một con số", event.threadID, event.messageID);

    switch (args[0]){
    case "id":{
      if (!args[2]) return api.sendMessage("sai cú pháp. $setmoney id [id] [money]", event.threadID, event.messageID);
    var idu = args[1];
    var ten = (await Users.getData(idu)).name;

    return api.sendMessage(
      `Đã cộng ${moneySet} coin vào tài khoản của ${ten}`,
      event.threadID,
      async () => {
        await Currencies.increaseMoney(idu, parseInt(moneySet));
      },
      event.messageID
    );
  break;}
  
  case "me": {
api.sendMessage(
      `Đã cộng ${moneySet} đô vào tài khoản của ${
        (await Users.getData(event.senderID)).name
      }`,
      event.threadID,
      async () => {
        await Currencies.increaseMoney(event.senderID, parseInt(moneySet));
      },
      event.messageID
    );
  break; } 
  case "reset":{
  var id2 = args[1];
  var name1 = (await Users.getData(id2)).name;
  const money = (await Currencies.getData(id2)).money;
  return api.sendMessage(`Đã reset toàn bộ số tiền của user ${name1}`, event.threadID, async () => {
  Currencies.increaseMoney(id2, parseInt("-"+money))}, event.messageID);
break;
  }
    }
    var idd = `${Object.keys(event.mentions)}`;
  if (!idd) return; 
    const name = (await Users.getData(idd)).name;

    return api.sendMessage(
      `Đã cộng ${moneySet} vào tài khoản của ${name}`,
      event.threadID,
      async () => {
        await Currencies.increaseMoney(idd, parseInt(moneySet));
      },
      event.messageID
    );
  
    };
