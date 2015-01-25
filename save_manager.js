var fs = require('fs');

function SaveManager() {
	var self = this;

	this.getFileName = function(player) {
		return __dirname + '/saves/' + player.name + '.txt';
	};

	this.load = function(player) {
		if (!fs.existsSync(self.getFileName(player)))
			return;

		var data = fs.readFileSync(self.getFileName(player));
		if (!data)
			return;

		var savedData = JSON.parse(data);

		player.level = savedData.level;
		player.xp = savedData.xp;
		player.gold = savedData.gold ? savedData.gold : 0;
		player.inventory = savedData.inventory ? savedData.inventory : {};
	};

	this.save = function(player) {
		if (!player) return;

		var savedData = {
			level: player.level,
			xp: player.xp,
			gold: player.gold,
			inventory: player.inventory
		};

		fs.writeFile(self.getFileName(player), JSON.stringify(savedData));
	};
}

module.exports = SaveManager;