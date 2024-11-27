interface Character {
    name: string;
    life: number;
    attack: number;
    defense: number;
};
type Pet = Character;
interface Hero extends Character {
    pet?: Pet;
};

type Equipment = {
    price: number;
    attack?: number;
    defense?: number;
};

// Équivalent du type générique que nous venons de voir, avec une interface
interface Shop<ItemType> {
    name: string;
    owner: Character;
    items: Array<ItemType>;
};

type Potion = {
    type: string;
};

type Armory = Shop<Equipment>;
type PetShop = Shop<Pet>;
type Apothecary = Shop<Potion>;

// Une fonction générique
function createShop<ItemType>(name: string, owner: Character, items: Array<ItemType>): Shop<ItemType> {
    return { name, owner, items };
}
// Appel de la fonction générique
const armory = createShop<Equipment>('My armory', { name: 'Bob', life: 100, attack: 1, defense: 2 }, []);

function damage(characterToDamage: Hero, amount: number): number {
    characterToDamage.life -= amount;
    return characterToDamage.life;
}
const result = damage({
    life: 100,
    name: "Superman",
    attack: 100,
    defense: 200
}, 12);
console.log(result);

type Character = {
    name: string;
    life: number;
    attack: number;
    defense: number;
};
type Pet = Character;
type Hero = Character | {
    pet?: Pet;
};