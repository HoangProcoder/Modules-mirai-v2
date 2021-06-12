module.exports.config = {
    name: 'banned',
    version: '2.0.0',
    hasPermssion: 2,
    credits: 'NTKhang',
    description: 'xem danh sách nhóm hoặc người dùng bị cấm',
    commandCategory: 'admin',
    usages: '[thread], [user]',
    cooldowns: 5
};

module.exports.handleReply = async function({
    api, args, Users, handleReply, event, Threads, client
}) {

    if (event.senderID != handleReply.author) return;

    switch (handleReply.type) {
        case 'unbanthread':
            {
                var idthr = handleReply.listid[event.body - 1];
                await Threads.setData(idthr, {
                    banned: 0
                });
                client.threadBanned.delete(parseInt(idthr));
                api.sendMessage(
                    `[${idthr}] Đã unban thành công!`,
                    event.threadID, event.messageID);
                break;
            }
        case 'unbanuser':
            {
                var idu = handleReply.listid[event.body - 1];
                await Users.setData(idu, {
                    banned: 0
                });
                client.userBanned.delete(parseInt(idu));
                api.sendMessage(
                    `[${idu}] Đã unban thành công!`,
                    event.threadID, event.messageID);
                break;
            }
    }

};

module.exports.run = async function({
    api, args, Users, event, Threads, client
}) {


    var msg = "", listid = [], number = 1;

    if (args[0] == 'user') {
        var in4user = async(idu) => {
            return `Name: ${(await Users.getData(idu)).name}\nID: ${idu}\n`;
        };
        var listuser = client.allUser || [];
        for (let userbanned of listuser) {
            var banned = (await Users.getData(userbanned)).banned;
            if (banned == 1) {
                msg += `${number++}. ${(await in4user(userbanned))}`;
                listid.push(userbanned);
            }
        };

        msg == '' ? api.sendMessage(
            '✅Hiện tại không có user nào bị ban',
            event.threadID,
            event.messageID
        ) : api.sendMessage(
            '❎Những user đã bị ban khỏi hệ thống bot gồm:\n\n' + msg + "\nReply tin nhắn này + số thứ tự để unban thread tương ứng",
            event.threadID, (error, info) => {
                client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: 'unbanuser',
                    listid
                });
            },
            event.messageID
        );
    } else if (args[0] == 'thread') {
        var in4thr = async(idthr) => {
            return `Name: ${(await Threads.getData(idthr)).name}\nID: ${idthr}\n`;
        };
        var listthread = client.allThread || [];

        for (let idthr of listthread) {
            if ((await Threads.getData(idthr)).banned == 1) {
                msg += `${number++}. ${(await in4thr(idthr))}`;
                listid.push(idthr);
            }
        };

        msg == "" ?
            api.sendMessage('✅Hiện tại không có thread nào bị ban',
                event.threadID,
                event.messageID
            ) : api.sendMessage(
                '❎Những thread đã bị ban khỏi hệ thống bot gồm:\n\n' + msg + "\nReply tin nhắn này + số thứ tự để unban thread tương ứng",
                event.threadID, (error, info) => {
                    client.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        type: 'unbanthread',
                        listid
                    });
                },
                event.messageID
            );
    } else return api.sendMessage('Sai cú pháp', event.threadID, event.messageID);
};