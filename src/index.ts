// 모듈 로드
import { Message, Interaction } from 'discord.js';
import * as dotenv from 'dotenv';
import * as BotEvent from './BotEvent/BotEvent.js';

// .env 로딩
dotenv.config();

BotEvent.client.once('ready', () => BotEvent.Start());

BotEvent.client.on('messageCreate', async (msg: Message) => {
  BotEvent.MsgRecv(msg);
});

BotEvent.client.on('interactionCreate', async (interaction: Interaction) => {
  BotEvent.InterAcRecv(interaction);
});

// 프로덕션 모드이면 뉴가비 토큰 사용, 아니면 테스트토큰 사용
BotEvent.client.login(
  process.env.NODE_ENV === 'production' ? process.env.TOKEN :
  process.env.TESTTOKEN
);
