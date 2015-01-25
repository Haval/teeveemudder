var Player = function(connection, name) {
	var self = this;

	this.init = function(connection, name) {
		self.connection = connection;
		self.name = name;

		self.level = 0;
		self.xp = 0;
		self.gold = 0;
		self.fighting = false;
		self.inventory = {};
	};

	this.send = function(msg) {
		self.connection.emit('message', msg);
	};

	this.fight = function(msg) {
		self.fighting = true;
		self.connection.emit('fight', msg);
	};

	this.fightComplete = function(msg) {
		self.fighting = false;
		self.connection.emit('fightComplete', msg);
	};

	self.init(connection, name);
}

module.exports = Player;
