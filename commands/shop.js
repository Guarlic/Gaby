const db = require('quick.db');
const walletdb = new db.table('wallet');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  name: 'shop',
  data: new SlashCommandBuilder()
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
  async execute(interaction) {
    console.log('shop is open.');
    console.log(`Client's Pick Item: ${interaction.options.getString('items')}`);

    const wallet_get = `wallet.money.${interaction.guild.id}.${interaction.member.id}`;
    const wallet = walletdb.get(wallet_get);

    let money;

    try {
      switch (interaction.options.getString('items')) {
        case 'Item: Sword':
          console.log('Client bought a Sword.');
          if (interaction.options.getInteger('numbers') == undefined) money = 100;
          else money = 100 * interaction.options.getInteger('numbers');
          await interaction.reply(`You bought a Sword!\nYour Money: ${wallet} -> ${wallet - money}`);
          await walletdb.subtract(wallet_get, money);
          break;
        case 'Item: Shield':
          console.log('Client bought a Shield.');
          if (interaction.options.getInteger('numbers') == undefined) money = 110;
          else money = 110 * interaction.options.getInteger('numbers');
          await interaction.reply(`You bought a Shield!\nYour Money: ${wallet} -> ${wallet - money}`);
          await walletdb.subtract(wallet_get, money);
          break;
        case 'Potion: Test Potion':
          console.log('Client bought a Test Potion.');
          if (interaction.options.getInteger('numbers') == undefined) money = 80;
          else money = 80 * interaction.options.getInteger('numbers');
          await interaction.reply(`You bought a Test Potion!\nYour Money: ${wallet} -> ${wallet - money}`);
          await walletdb.subtract(wallet_get, money);
          break;
      }
    }
    catch (error) {
      console.error(error);
    }
  }
}
