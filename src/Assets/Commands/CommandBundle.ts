import ICommand from '../Interfaces/ICommand.js';
import Wallet from './Wallet.js';
import Work from './Work.js';
import Shop from './Shop.js';

const CommandBundle: ICommand[] = [
  Wallet,
  Work,
  Shop,
];

export default CommandBundle;
