module.exports.config = {
	name: 'pay',
	version: '1.0.0',
	hasPermssion: 0,
	credits: 'NTKhang',
	description: 'pay!',
	commandCategory: 'economy',
	usages: 'pay',
	cooldowns: 5,
	dependencies: ''
};
module.exports.handleReaction = async ({
	api,
	event,
	handleReaction,
	client,
	Currencies
}) => {
	if (event.userID == handleReaction.author) {
		//if (event.reaction == "👍") {
		const moneydb = (await Currencies.getData(event.userID)).money;

		if (handleReaction.moneydau > moneydb) {
			api.sendMessage('Bạn không đủ tiền!!', event.threadID, event.messageID);
		} else {
			return api.sendMessage(
				`Bạn đã chuyển ${handleReaction.moneyPay} đô cho ${
					handleReaction.namepay
				}`,
				event.threadID,
				async () => {
					await Currencies.increaseMoney(
						handleReaction.mention,
						parseInt(handleReaction.moneyPay)
					),
						Currencies.increaseMoney(
							event.userID,
							parseInt('-' + handleReaction.moneydau)
						);
				},
				event.messageID
			);
		} //else
		//} //like
	} //author
};

module.exports.run = async function({
	api,
	event,
	args,
	Currencies,
	global,
	utils,
	client
}) {
	if (!args[0]) {
		api.sendMessage(
			'Sai cú pháp, sử dụng $help pay để xem cách dùng',
			event.threadID,
			event.massageID
		);
	}
	var { body } = event;

	var prefix = `${global.config.PREFIX}`;

	var mention = Object.keys(event.mentions)[0];

	var content = body.slice(prefix.length + 4, body.length);
	//money ban đầu
	var moneydau = content.substring(content.lastIndexOf(' ') + 1);

	//chiết khấu

	var chietkhau = (moneydau / 100) * 15;

	var moneyPa = moneydau - chietkhau;
	var moneyPay = String(moneyPa);
	const moneydb = (await Currencies.getData(event.senderID)).money;

	var namepay = event.mentions[mention].replace('@', '');

	if (isNaN(moneyPay) || moneyPay.indexOf('-') !== -1)
		return api.sendMessage(
			'Vui lòng nhập số tiền hợp lệ',
			event.threadID,
			event.messageID
		);

	if (moneydau > moneydb)
		return api.sendMessage(
			'Nghèo mà sỉ diện hả m :)), dell đủ tiền bạn eyyy',
			event.threadID,
			event.messageID
		);

	if (moneyPay < 50)
		return api.sendMessage(
			'Keo kiệt zậy cha..., nhiều hơn 50 đi :>',
			event.threadID,
			event.messageID
		);

	return api.sendMessage(
		'Phí chuyển tiền là 15%, bạn có muốn chuyển không, nếu đồng ý hãy thả cảm xúc tin nhắn này',
		event.threadID,
		async (err, info) => {
			client.handleReaction.push({
				name: this.config.name,
				messageID: info.messageID,
				author: event.senderID,
				moneyPay: moneyPay,
				mention: mention,
				namepay: namepay,
				moneydb: moneydb,
				moneydau: moneydau
			});
		}
	);
};
