const db = require('quick.db');
const walletdb = new db.table('wallet');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'work',
  data: new SlashCommandBuilder()
          .setName('work')
          .setDescription('Work!'),
  async execute(interaction) {
    const wallet_money = `wallet.money.${interaction.guild.id}.${interaction.member.id}`;
    const moneylist = [80, 90, 100, 100, 120];
    const addmoney = moneylist[Math.floor(Math.random() * moneylist.length)];
    const save = walletdb.get(wallet_money);
    const wallet = save + addmoney;

    await walletdb.set(wallet_money, wallet);

    const WorkEmbed = new MessageEmbed()
      .setAuthor('가비')
      .setTitle('Work')
      .setColor(0xBDBDBD)
      .addField('your money', `${save} -> ${wallet}`);

    await interaction.reply({ embeds: [WorkEmbed] });
  }
}
