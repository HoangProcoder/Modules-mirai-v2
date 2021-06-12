module.exports.config = {
	name: "setimg",
	version: "1.0.0",
	credits: "NTKhang",
	hasPermssion: 0,
	description: "Đổi ảnh box chat bằng cách reply ",
	commandCategory: "group",
	usages: "setimg",
	cooldowns: 5
};



module.exports.run = async function({ api, event, client, models, Threads }) {
  if (event.type != "message_reply")
  return api.sendMessage("Hãy repl 1 ảnh muốn đặt làm avatar box chat", event.threadID, event.messageID);
  const fs = require("fs-extra");

  const axios = require("axios");

 	let pathImg = __dirname + '/cache/ntk.png';
  
  var abc = event.messageReply.attachments[0].url;
  
  let getntk = (await axios.get(`${abc}`, { responseType: 'arraybuffer' })).data;
  
  fs.writeFileSync(pathImg, Buffer.from(getntk, 'utf-8'));
 
  return     api.changeGroupImage(fs.createReadStream(__dirname + '/cache/ntk.png'), event.threadID, () => fs.unlinkSync(pathImg), event.messageID);
  
  }