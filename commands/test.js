const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  name: 'test',
  data: new SlashCommandBuilder()
          .setName('test')
          .setDescription('test command'),
  async execute(interaction) {
    console.log('command runed successfuly');
    await interaction.reply('Hello!');
  }
}
