const { SlashCommandBuilder } = require('@discordjs/builders');

function Game_Random_Num(interaction) {
  var x = Math.floor(Math.random() * 10);
  interaction.reply(`Your Number: ${x}`);
}

function Game_Holl_JJak(interaction) {
  console.log('홀짝 오픈');
  const result = Math.floor(Math.random() * 2);

  if (interaction.options.getString('holl_jjak_betting') == undefined) {
    interaction.reply('You need to choice!');
    return;
  }

  switch (interaction.options.getString('holl_jjak_betting')) {
    case 'holl':
      if (result % 2) interaction.reply('Congrats!! you won!');
      else interaction.reply('You lost..');
      break;
    case 'jjak':
      if (!(result % 2)) interaction.reply('Congrats!! you won!');
      else interaction.reply('You lost..');
      break;
  }
}

module.exports = {
  name: 'minigame',
  data: new SlashCommandBuilder()
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
  async execute(interaction) {
    console.log('minigame is open.');
    console.log(`Client's Choice: ${interaction.options.getString('game_name')}`);

    switch (interaction.options.getString('game_name')) {
      case 'Game: Test':
        await interaction.reply('Hello! You started the test game!');
        break;
      case 'Game: Random_Num':
        await Game_Random_Num(interaction);
        break;
      case 'Game: Holl_JJak':
        await Game_Holl_JJak(interaction);
        break;
    }
  }
}
