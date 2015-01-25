function NorthCommand(game, player) {
	MoveTo(game, player, player.room.n);
}

function EastCommand(game, player) {
	MoveTo(game, player, player.room.e);
}

function SouthCommand(game, player) {
	MoveTo(game, player, player.room.s);
}

function WestCommand(game, player) {
	MoveTo(game, player, player.room.w);
}

function MoveTo(game, player, location) {
	if (player.fighting) {
		player.send('You can not run from this fight!');
		return;
	}

	if (!game.world.rooms[location]) return;

	player.room = game.world.rooms[location];
	player.send('You moved to ' + location);

	ExamineCommand(game, player);
}

function SearchForFight(game, player) {
	if (StartFight(player.room.attackProbability)) {
		var mobIndex = GetRandomInt(0, player.room.mobs.length);
		var mobName = player.room.mobs[mobIndex];
		var mob = game.world.mobs[mobName];
		player.mobName = mobName;

		if (player.room.e && player.room.e === 'Hogwarts School of Witchcraft and Wizardry' && player.inventory['Time-Turner'] && player.inventory['Time-Turner'] > 0) {
			player.send(mobName + ' stole your Time-Turner!');
			player.inventory['Time-Turner'] = 0;
			return;
		}

		if (mobName === 'Harry Potter' && player.inventory['Time-Turner'] && player.inventory['Time-Turner'] > 0) {
			player.send(mobName + ': Hahahaha, just kidding, getting a Time-Turner was an even bigger waste of time!')
			return;
		}

		player.fight(mobName + ': ' + mob.quote);
	}
}

function FightCommand(game, player) {
	if (!player.fighting) {
		player.send('You hit yourself in the head!');
		return;
	}

	var mobName = player.mobName;
	var mob = game.world.mobs[mobName];
	var itemIndex = GetRandomInt(0, mob.drops.length);
	var item = mob.drops[itemIndex];
	var xp = mob.level * 100;

	var msg = 'You defeated ' + mobName + ' and acquired a ' + item + ' along with ' + xp + ' experience!';

	if (player.inventory[item])
		player.inventory[item]++;
	else
		player.inventory[item] = 1;

	player.xp += xp;
	if (player.xp < 0) {
		player.xp = 0;
		player.level--;
		if (player.level < 0)
			player.level = 0;
	}
	else {
		player.level = Math.floor(player.xp / 1000);
	}

	player.fightComplete(msg);
}

function SellCommand(game, player) {
	var totalGold = 0;
	for (var i in player.inventory) {
		if (!player.inventory[i] || player.inventory[i] <= 0) continue;

		var itemCost = game.world.items[i].cost;
		totalGold += (itemCost * player.inventory[i]);
		player.inventory[i] = 0;
	}

	player.gold += totalGold;
	player.send('You summoned your P3-WP portable merchant and sold all your items for ' + totalGold + ' gold!');
}

function JoinCommand(game, player) {
	player.room = game.world.rooms['Home'];
	player.send(player.name + ' Welcome to Teevee!');
}

function PlayersCommand(game, player) {
	var players = [];

	player.send('Players:');
	
	for (var i in game.players) {
		player.send('  ' + game.players[i].name + ' - Gold: ' + game.players[i].gold + ' - Level: ' + game.players[i].level);
	}
}

function StatusCommand(game, player) {
	player.send('Level ' + player.level);
	player.send('XP ' + player.xp);
	player.send('Gold ' + player.gold);

	var itemInfo = '';
	for (var i in player.inventory) {
		if (player.inventory[i] <= 0) continue;

		if (itemInfo !== '')
			itemInfo += ', ';
		itemInfo += player.inventory[i] + 'x' + i;
	}

	player.send('Items ' + itemInfo);
}

function ExamineCommand(game, player) {
	if (player.fighting) {
		player.send('You can not look around in the middle of a fight!');
		return;
	}

	var visibleRooms = [];

	if (player.room.n)
		visibleRooms.push(player.room.n + ' to the North');
	if (player.room.e)
		visibleRooms.push(player.room.e + ' to the East');
	if (player.room.s)
		visibleRooms.push(player.room.s + ' to the South');
	if (player.room.w)
		visibleRooms.push(player.room.w + ' to the West');

	player.send('You see ' + visibleRooms.join(', '));

	SearchForFight(game, player);
}

function HelpCommand(game, player) {
	player.send('List of command and aliases:');
	player.send('Movement: North/n, East/e, South/s, West/w');
	player.send('Info: Players/p (List of players), Status/Stats/Stat (Player info)');
	player.send('Abilities: Examine/ex/x (Examine current area and look for trouble!), Fight/f, Sell');
}

function StartFight(probability) {
	return GetRandomInt(0, 100) <= probability;
}

function GetRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

module.exports.NorthCommand = NorthCommand;
module.exports.NCommand = NorthCommand;
module.exports.EastCommand = EastCommand;
module.exports.ECommand = EastCommand;
module.exports.SouthCommand = SouthCommand;
module.exports.SCommand = SouthCommand;
module.exports.WestCommand = WestCommand;
module.exports.WCommand = WestCommand;

module.exports.JoinCommand = JoinCommand;
module.exports.PlayersCommand = PlayersCommand;
module.exports.PCommand = PlayersCommand;
module.exports.ExamineCommand = ExamineCommand;
module.exports.ExCommand = ExamineCommand;
module.exports.XCommand = ExamineCommand;
module.exports.StatusCommand = StatusCommand;
module.exports.StatsCommand = StatusCommand;
module.exports.StatCommand = StatusCommand;
module.exports.FightCommand = FightCommand;
module.exports.FCommand = FightCommand;
module.exports.SellCommand = SellCommand;
module.exports.HelpCommand = HelpCommand;
