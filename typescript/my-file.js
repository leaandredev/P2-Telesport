;
;
;
// Une fonction générique
function createShop(name, owner, items) {
    return { name: name, owner: owner, items: items };
}
// Appel de la fonction générique
var armory = createShop('My armory', { name: 'Bob', life: 100, attack: 1, defense: 2 }, []);
function damage(characterToDamage, amount) {
    characterToDamage.life -= amount;
    return characterToDamage.life;
}
var result = damage({
    life: 100,
    name: "Superman",
    attack: 100,
    defense: 200
}, 12);
console.log(result);
