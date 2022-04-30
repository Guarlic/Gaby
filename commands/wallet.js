const db = require('quick.db');
const walletdb = new db.table('wallet');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'wallet',
  data: new SlashCommandBuilder()
          .setName('wallet')
          .setDescription('Check your wallet!'),
  async execute(interaction) {
    const wallet_money = `wallet.money.${interaction.guild.id}.${interaction.member.id}`;
    const wallet = walletdb.get(wallet_money);

    const WalletEmbed = new MessageEmbed()
      .setAuthor('가비')
      .setTitle('**Wallet**')
      .setColor(0xBDBDBD)
      .addField('your money', `${wallet}`);

    await interaction.reply({ embeds: [WalletEmbed] });
  }
}
