module.exports.config = {
	name: "adduser",
	version: "1.0.0",
	credits: "NTKhang",
	hasPermssion: 1,
	description: "thêm thành viên bằng link profile",
	commandCategory: "System",
	usages: "adduser [link]",
	cooldowns: 5,
    dependencies: ["fb-tools"]
};
module.exports.run = async function ({ api, event, clientL, args }) {
  if(!args[0]) return api.sendMessage("Cần nhập url profile facebook của người muốn add", event.threadID, event.messageID);
  if(args[0].indexOf("com") == -1) return api.sendMessage("Url không đúng định dạng", event.threadID, event.messageID);
    var loz = require("fb-tools");
    var url = args.join(" ");
var uid = await loz.findUid(url);
       try{api.addUserToGroup(uid, event.threadID)}
       catch(e) { console.log(e) }

  
}