const db = require('quick.db');
const walletdb = new db.table('wallet');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'wallet',
  data: new SlashCommandBuilder()
          .setName('wallet')
          .setDescription('Check member\'s wallet!')
          .addUserOption(option =>
            option
              .setName('user')
              .setDescription('User you want')
              .setRequired(false)
          ),
  async execute(interaction) {
    let id;
    if (interaction.options.getUser('user') == undefined) id = interaction.member.id;
    else id = interaction.options.getUser('user').id;

    const wallet_money = `wallet.money.${interaction.guild.id}.${id}`;
    const wallet = walletdb.get(wallet_money);

    if (interaction.options.getUser('user') != undefined && interaction.options.getUser('user').bot) {
      await interaction.reply(`${interaction.options.getUser('user').username} is a bot!`);
      return;
    }

    const WalletEmbed = new MessageEmbed()
      .setAuthor('가비')
      .setTitle('**Wallet**')
      .setColor(0xBDBDBD)
      .addField(`${id == interaction.member.id ? 'your money' : `${interaction.options.getUser('user').username} 's money`}`, `${wallet ? wallet : 0}`);

    await interaction.reply({ embeds: [WalletEmbed] });
  }
}
