import IItem from '../../Interfaces/IItem.js';

const ItemBundle: IItem[] = [
  {
    name: 'Sword',
    description: 'Normal Sword',
    price: 100,
    level: 'common',
    id: 0,
  },
  {
    name: 'StarSword',
    description: 'Star Sword',
    price: 320,
    level: 'unique',
    id: 1,
  },
  {
    name: 'Shield',
    description: 'Normal Shield',
    price: 110,
    level: 'common',
    id: 2,
  },
  {
    name: 'Pickaxe',
    description: 'Normal Pickaxe',
    price: 200,
    level: 'rare',
    id: 3,
  },
  {
    name: 'Potion',
    description: 'Normal Potion',
    price: 150,
    level: 'rare',
    id: 4,
  },
];

export default ItemBundle;