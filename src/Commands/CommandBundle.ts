import ICommand from '../Interfaces/ICommand.js';
import Wallet from './Wallet.js';
import Work from './Work.js';
import Shop from './Shop.js';
import Buy from './Buy.js';
import Debug from './Debug.js';
import Inventory from './Inventory.js';
import Regist from './Regist.js';
import Profile from './Profile.js';
import Ping from './Ping.js';
import Secession from './Secession.js';
import Sell from './Sell.js';
import Class from './Class.js';
import Money from './Money.js';
import Reinforce from './Reinforce.js';
import UseCount from './UseCount.js';
import WorkCount from './WorkCount.js';
import SetSign from './SetSign.js';
import GetSign from './GetSign.js';

const CommandBundle: ICommand[] = [
  Wallet,
  Work,
  Shop,
  Buy,
  Debug,
  Inventory,
  Regist,
  Profile,
  Ping,
  Secession,
  Sell,
  Class,
  Money,
  Reinforce,
  UseCount,
  WorkCount,
  SetSign,
  GetSign,
];

export default CommandBundle;
