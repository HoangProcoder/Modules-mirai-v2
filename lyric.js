module.exports.config = {
	name: "lyric",	version: "1.0.0", 
	hasPermssion: 0,
	credits: "NTKhang",
	description: "tìm lời bài hát", 
	commandCategory: "media",
	usages: "lyric 'tên bài hát'",
	cooldowns: 5, 
	dependencies: ["lyrics-finder"],
};

module.exports.run = async function({ api, event, args, __GLOBAL }) {
  var lyr = require("lyrics-finder");
  const axios = require("axios"),
        fs = require("fs-extra");
  var {body} = event;
  let lyrics = await lyr(body);

  var YouTubeAPI = require("simple-youtube-api")
const youtube = new YouTubeAPI(__GLOBAL["sing"].YOUTUBE_API);
var results = await youtube.searchVideos(body, 1);
for (let value of results) {var idmus = value.id;}
  
  
  var ytdl = require("ytdl-core");

ytdl("https://m.youtube.com/watch?v="+idmus)
				.pipe(fs.createWriteStream(__dirname + `/cache/lyric.m4a`))
				.on("close", () => {
  
/*var getms = (await axios.get(abc, {responseType: "arraybuffer"})).data;
  
    fs.writeFileSync(__dirname + "/cache/lyric.m4a", Buffer.from(getms, "utf-8"));*/
  
  api.sendMessage({attachment: fs. createReadStrem(__dirname+"/cache/lyric.m4a"), body: lyrics}, event.threadID, event.messageID);
  }
            
            
          )  }
            
    
    