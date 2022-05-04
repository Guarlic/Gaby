const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientid, token } = require('./config.json');

const commands = [
  new SlashCommandBuilder()
    .setName('test')
    .setDescription('test command'),
  new SlashCommandBuilder()
    .setName('wallet')
    .setDescription('Check member\'s wallet!')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('User you want')
        .setRequired(false)
    ),
  new SlashCommandBuilder()
    .setName('work')
    .setDescription('Work!'),
  new SlashCommandBuilder()
    .setName('shop')
    .setDescription('Check the shop!')
    .addStringOption(option =>
      option
        .setName('items')
        .setDescription('Item you want to buy')
        .setRequired(true)
        .addChoice('Sword : 100₩', 'Item: Sword')
        .addChoice('Shield : 110₩', 'Item: Shield')
        .addChoice('Test Potion : 80₩', 'Potion: Test Potion')
    )
    .addIntegerOption(option =>
      option
        .setName('numbers')
        .setDescription('Number of your items')
        .setRequired(false)
    ),
  new SlashCommandBuilder()
    .setName('minigame')
    .setDescription('Play the minigames!')
    .addStringOption(option =>
      option
        .setName('game_name')
        .setDescription('Game you want to play')
        .setRequired(true)
        .addChoice('Test', 'Game: Test')
        .addChoice('Random_Num (0 ~ 10)', 'Game: Random_Num')
        .addChoice('Holl_JJak', 'Game: Holl_JJak')
    )
    .addStringOption(option =>
      option
        .setName('holl_jjak_betting')
        .setDescription('Betting you want on holl jjak game')
        .setRequired(false)
        .addChoice('홀', 'holl')
        .addChoice('짝', 'jjak')
    ),
]
.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationCommands(clientid), { body: commands })
  .then(() => console.log(`Success!, Command: ${commands}`))
  .catch(console.error);
