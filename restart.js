module.exports.config = {
	name: "restart",
	version: "1.0.0",
	credits: "NTKhang",
	hasPermssion: 2,
	description: "",
	commandCategory: "system",
	usages: "",
    dependencies: ["node-cmd"],
	cooldowns: 5
};

  module.exports.run = async function ({ api, event, global, args }) {
    var cmd = require("node-cmd");
    var fs = require("fs-extra");
    
api.sendMessage("Bot sẽ khởi động lại ngay bây giờ!!", event.threadID, event.messageID);
                fs.writeFileSync(__dirname+'/cache/restartbot.json', JSON.stringify([event.threadID]), "utf-8");
    
    cmd.run("pm2 start pm2.config.js --no-daemon");
}

  


