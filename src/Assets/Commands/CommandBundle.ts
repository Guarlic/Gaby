import ICommand from '../Interfaces/ICommand.js';
import Wallet from './Wallet.js';
import Work from './Work.js';
import Shop from './Shop.js';
import Buy from './Buy.js';
import Debug from './Debug.js';

const CommandBundle: ICommand[] = [
  Wallet,
  Work,
  Shop,
  Buy,
  Debug,
];

export default CommandBundle;
