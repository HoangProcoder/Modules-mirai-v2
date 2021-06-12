module.exports.config = {
    name: "top",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "NTKhang",
    description: "Top 5 các loại trong dữ liệu bot ＼(￣▽￣;)／",
    commandCategory: "group",
    usages: "[money], [level], [boy], [girl]",
    cooldowns: 5,
    dependencies: "",
    info: [
		{
			key: 'money',
			prompt: 'Để trống hoặc "me" hoặc tag một người nào đó, có thể tag nhiều người',
			type: 'Văn Bản',
			example: '$top money me/$top money @NTKhang/top money'
		},
				{
			key: 'level',
			prompt: 'Để trống hoặc "me" hoặc tag một người nào đó, có thể tag nhiều người',
			type: 'Văn Bản',
			example: '$top level me/$top level @NTKhang/top level'
		},
				{
			key: 'boy',
			prompt: 'Để trống hoặc "me"',
			type: 'Văn Bản',
			example: '$top boy me/$top boy'
		},
						{
			key: 'girl',
			prompt: 'Để trống hoặc "me"',
			type: 'Văn Bản',
			example: '$top girl me/$top girl'
		}
	]
    
};


//==============MONEY=============//
module.exports.run = async function({
    api,
    Currencies,
    args,
    Users,
    event,
    client
}) {
var nowtime = Date.now();
    if (args[0] == "money") {

        var allUser = client.allUser || [];
        var topmoney = [];
        for (var iduser of allUser) {
            const money = (await Currencies.getData(iduser)).money;
            //const name = (await Users.getData(iduser)).name;
            topmoney.push({
                id: iduser,
                money: money//,
                //name: name
            });
        }
        var top2 = topmoney.sort((a, b) => {
            if (a.money > b.money) return -1;
            if (a.money < b.money) return 1;
        });
        var body = event.body;


        //lấy rank của bản thân hoặc người đc tag
        var arraybody = body.split("");
        if (arraybody[11] == "@") {
            var idtag = [];
            var msgtag = "";
            for (let so = 0; so < Object.keys(event.mentions).length; so++) {
                idtag.push(Object.keys(event.mentions)[so])
            }
            for (let iduser of idtag) {
                for (let num = 0; num < top2.length; num++) {
                    if (iduser == top2[num].id) {
                        msgtag += `•${top2[num].name} đứng top ${num+1} với ${top2[num].money} đô 💵\n`
                    }
                }
            }
            api.sendMessage("🏆Top money của người bạn tag🏆\n" + msgtag, event.threadID)

        }
        //bản thân
        else if (args[1] == "me") {
            for (let rankme = 0; rankme < top2.length; rankme++) {
                if (top2[rankme].id == event.senderID) {
                    api.sendMessage(`Bạn đang đứng hạng ${rankme+1} trong bảng xếp hạng money của bot với tổng số tiền là ${top2[rankme].money} đô 💸`, event.threadID, event.messageID);
                }
            }
        } else {
            var msg = "";
            //=======================//
           /* var top1mn = `🥇Top1: ${top2[0].name} với ${top2[0].money} đô💎`;
            //=======================//
            var top2mn = `🥈Top2: ${top2[1].name} với ${top2[1].money} đô💵`;
            //=======================//
            var top3mn = `🥉Top3: ${top2[2].name} với ${top2[2].money} đô💰`;
            //=======================//*/
            var top1mn = `🥇Top1: ${(await Users.getData(top2[0].id)).name} với ${top2[0].money} đô💎`;
            //=======================//
            var top2mn = `🥈Top2: ${(await Users.getData(top2[1].id)).name} với ${top2[1].money} đô💵`;
            //=======================//
            var top3mn = `🥉Top3: ${(await Users.getData(top2[2].id)).name} với ${top2[2].money} đô💰`;
            //=======================/
            for (let num = 3; num < 10; num++) {
                const name = (await Users.getData(top2[num].id)).name;
                msg += `•Top${num + 1}: ${name} với ${top2[num].money} đô\n`;
            }
            api.sendMessage(`💵💸Top 10 người có số tiền cao nhất trong dữ liệu của bot là:
${top1mn}
${top2mn}
${top3mn}
${msg}\n${Date.now()-nowtime}ms`, event.threadID);
        }
    }
    //================LEVEL================//
    else if (args[0] == "level") {
        var allUser = client.allUser || [];
        var toplevel = [];
        for (var iduserr of allUser) {

            var levell = Math.floor((Math.sqrt(1 + (4 * parseInt((await Currencies.getData(iduserr)).exp)) / 3) + 1) / 2);;
            const name = (await Users.getData(iduserr)).name
            toplevel.push({
                iduser: iduserr,
                level: levell,
                name: name
            });
        }
        var top2 = toplevel.sort((a, b) => {
            if (a.level > b.level) return -1;
            if (a.level < b.level) return 1;
        });
        var body = event.body;


        //lấy rank của bản thân hoặc người đc tag
        var arraybody = body.split("");
        if (arraybody[11] == "@") {
            var idtag = [];
            var msgtag = "";
            for (let so = 0; so < Object.keys(event.mentions).length; so++) {
                idtag.push(Object.keys(event.mentions)[so])
            }
            for (let iduser of idtag) {
                for (let num = 0; num < top2.length; num++) {
                    if (iduser == top2[num].iduser) {
                        msgtag += `•${top2[num].name} đứng top ${num+1} với Lv ${top2[num].level} 🦸‍♂️🦸‍♂️\n`
                    }
                }
            }
            api.sendMessage("🏆Top level của người bạn tag🏆\n" + msgtag, event.threadID)

        }
        //bản thân
        else if (args[1] == "me") {
            for (let rankme = 0; rankme < top2.length; rankme++) {
                if (top2[rankme].iduser == event.senderID) {
                    api.sendMessage(`🦹‍♂️Level hiện tại của bạn là ${top2[rankme].level} và đang đứng hạng ${rankme+1} trong bảng xếp hạng level của bot`, event.threadID, event.messageID);
                }
            }
        } else {
            let msg = "";
            ////=====///////////
            let top1 = `🥇Top1: ${top2[0].name} Lv: ${top2[0].level}`;
            let ttop2 = `🥈Top2: ${top2[1].name} Lv: ${top2[1].level}`;
            ////////////
            let ttop3 = `🥉Top3: ${top2[2].name} Lv: ${top2[2].level}`;
            /////=====///////////
            for (let num = 3; num < 10; num++) {
                const name = (await Users.getData(`${top2[num].iduser}`)).name;
                msg += `•Top${num + 1}: ${name} Lv: ${top2[num].level}\n`;
            }
            api.sendMessage(`🏆🏆Top 10 người có level cao nhất trong dữ liệu của bot:
${top1}
${ttop2}
${ttop3}
${msg}`, event.threadID, event.messageID);
        }
    }
    //================BOY================//
    else if (args[0] == "boy") {
        var allThread = client.allThread;
        var listboy = [];
        var i = 0;
        for (let id of allThread) {
            let threadInfo = await api.getThreadInfo(id);
            let namenam = threadInfo.threadName;
            var gendernam = [];
            for (let z in threadInfo.userInfo) {
                var gt1 = threadInfo.userInfo[z].gender;
                if (gt1 == "MALE") {
                    gendernam.push(z + gt1)
                }
            } //for của box
            listboy.push({
                id: id,
                name: namenam,
                i: gendernam.length
            })
        }

        var topboy = listboy.sort((a, b) => {
            if (a.i > b.i) return -1;
            if (a.i < b.i) return 1;
        });
        //lấy rank của bản thân
        if (args[1] == "me") {
            for (let rankme = 0; rankme < topboy.length; rankme++) {
                if (topboy[rankme].id == event.threadID) {
                    api.sendMessage(`👨‍👩‍👧‍👧👨‍🦰Nhóm của bạn đang đứng hạng ${rankme+1} trong bảng xếp hạng top boy của bot với tổng số thành viên nam là ${topboy[rankme].i}`, event.threadID, event.messageID);
                }
            }
        } else {
            var top1b = `🥇Top1: ${topboy[0].name} với ${topboy[0].i } thành viên nam`;
            var top2b = `🥈Top2: ${topboy[1].name} với ${topboy[1].i } thành viên nam`;
            var top3b = `🥉Top3: ${topboy[2].name} với ${topboy[2].i } thành viên nam`;
            var msg = "";
            for (let so = 3; so < 10; so++) {
                msg += `•Top${so+1}: ${topboy[so].name} với ${topboy[so].i } thành viên nam\n`
            }
            api.sendMessage(`👨‍🦰Top 10 box có thành viên nam cao nhất trong dữ liệu của box là:
${top1b}
${top2b}
${top3b}
${msg}`, event.threadID, event.messageID);
        }
    } else if (args[0] == "girl") {
        var allThread = client.allThread;
        var listgirl = [];
        var i = 0;
        for (let id of allThread) {
            let threadInfo = await api.getThreadInfo(id);
            let namenu = threadInfo.threadName;
            var gendernu = [];
            for (let z in threadInfo.userInfo) {
                var gt2 = threadInfo.userInfo[z].gender;
                if (gt2 == "FEMALE") {
                    gendernu.push(z + gt1)
                }
            } //for của box
            listgirl.push({
                id: id,
                name: namenu,
                i: gendernu.length
            })
        } //for của all thread
        var topgirl = listgirl.sort((a, b) => {
            if (a.i > b.i) return -1;
            if (a.i < b.i) return 1;
        });

        //lấy rank của bản thân
        if (args[1] == "me") {
            for (let rankme = 0; rankme < topgirl.length; rankme++) {
                if (topgirl[rankme].id == event.threadID) {
                    api.sendMessage(`👨‍👩‍👧‍👧👩‍🦰Nhóm của bạn đang đứng hạng ${rankme+1} trong bảng xếp hạng top girl của bot với tổng số thành viên nữ là ${topgirl[rankme].i}`, event.threadID, event.messageID);
                }
            }
        } else {
            var msg = "";
            var top1g = `🥇Top1: ${topgirl[0].name} với ${topgirl[0].i } thành viên nữ`;
            var top2g = `🥈Top2: ${topgirl[1].name} với ${topgirl[1].i } thành viên nữ`;
            var top3g = `🥉Top3: ${topgirl[2].name} với ${topgirl[2].i } thành viên nữ`;
            for (let so = 3; so < 10; so++) {
                msg += `•Top${so+1}: ${topgirl[so].name} với ${topgirl[so].i } thành viên nữ\n`
            }
            api.sendMessage(`👩‍🦰Top 10 box có thành viên nữ cao nhất trong dữ liệu của box là:
${top1g}
${top2g}
${top3g}
${msg}`, event.threadID, event.messageID);
        }
    } else {
        api.sendMessage("Sai cú pháp, sử dụng $help top để xem cách dùng", event.threadID, event.messageID)

    }
    //switch*/
};