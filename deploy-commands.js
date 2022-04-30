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
    .setDescription('Check your wallet!'),
  new SlashCommandBuilder()
    .setName('work')
    .setDescription('Work!')
]
.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationCommands(clientid), { body: commands })
  .then(() => console.log(`Success!, Command: ${commands}`))
  .catch(console.error);
