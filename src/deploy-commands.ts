import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import * as dotenv from 'dotenv';
import CommandBundle from './Assets/Commands/CommandBundle.js';
import logger from './Assets/Utils/Logger.js';

dotenv.config();

const commandArray = new Array<SlashCommandBuilder>();

CommandBundle.forEach(value => {
  commandArray.push(value.Builder);
});

const token =
  process.env.NODE_ENV === 'production' ? process.env.TOKEN :
  process.env.TESTTOKEN;

const clientid =
  process.env.NODE_ENV === 'production' ? process.env.CLIENTID :
  process.env.TESTCLIENTID;

if (token !== undefined && clientid !== undefined) {
  logger.info(
    `TOKEN: ${token}, CLIENTID: ${clientid}`,
  );

  const rest = new REST({ version: '10' }).setToken(token);

  rest
    .put(Routes.applicationCommands(clientid), {
      body: commandArray,
    })
    .then(() =>
      logger.info(
        `Successfully registered application commands. : ${commandArray}`,
      ),
    )
    .catch(err => logger.error(err));
} else {
  logger.error('Env Value undefined');
}
