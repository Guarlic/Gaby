const { MessageEmbed, Client, Intents, Collection } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const walletdb = new db.table('wallet');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.commands = new Collection();

const { clientid, token } = require('./config.json');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
  console.log(`${command.name}`);
}

client.once('ready', () => {
  console.log(`${client.user.tag} started`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  const wallet_money = `wallet.money.${interaction.guild.id}.${interaction.member.id}`;
  const wallet = walletdb.get(wallet_money);

  if (wallet == undefined || wallet == NaN) walletdb.set(wallet_money, 0);

  if (!command) {
    console.log('It\'s not a command!');
    return;
  }

  console.log(`In Guild [ ${interaction.guild.name} ] Channel < ${interaction.channel.name} > ${interaction.member.user.username}#${interaction.user.discriminator} Requested ${interaction.commandName}`);

  try {
    await command.execute(interaction);
  }
  catch (error) {
    console.error(error);
  }
});

client.login(token);
