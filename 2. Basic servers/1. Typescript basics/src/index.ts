// 1. 

function getFirstWord(a: string) {
    return a.split(/ +/)[0].length;
}

// 2. 

function getUserNamings(a: { name: string, surname: string }) {
    return {
        fullname: a.name + " " + a.surname,
        initials: a.name[0] + "." + a.surname[0]
    };
}

// 3. 

// <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining>
function getAllProductNames(a: { products: [{ name: string } | undefined] | undefined } | undefined) {
    return a?.products?.map(prod => prod?.name) || [];
}

// 4.1

// easy way is using 'as' keyword
// hard way is ?...
type heyFunc1 = ({
    name: () => string,
    cuteness?: number,
    coolness?: number
});

function hey1(a: heyFunc1) {
    return "hey! i'm " + a.name();
}
hey1({ name: () => "roma", cuteness: 100 })
hey1({ name: () => "vasya", coolness: 100 })

// 4.2
class Animal {
    animalName = "";
    name = () => { return this.animalName };
    randAttr: any;
    constructor(animalName: string, randomAttr: any) {
        this.animalName = animalName;
        this.randAttr = randomAttr;
        return this;
    }
}

class Dog extends Animal { }
class Cat extends Animal { }
// type animal = ({
//     name: () => string
// })

function hey2(abstractPet: Cat | Dog) {
    return "hey! i'm " + abstractPet.name();
}
let a = new Cat("myavchik", true)
let b = new Dog("gavchik", 333)
hey2(a)
hey2(b)

// 4.3

function hey3(a: { name: () => string, type: string, cuteness?: number, coolness?: number }) {
    return "hey! i'm " + a.name()
        + (a.type === "cat" ? ("cuteness: " + a.cuteness) : ("coolness: " + a.coolness))
}
hey3({ name: () => "roma", type: "cat", cuteness: 100 })
hey3({ name: () => "vasya", type: "dog", coolness: 100 })

// 5.

// google for Record type
function stringEntries(a: Record<string, string>) {
    return Array.isArray(a) ? a : Object.keys(a)
}

// 6.

// you don't know Promises and async/await yet. Or do you? 
// ....can be hard, don't worry and SKIP if you do not know how to do it

async function world(a: number) {
    return "*".repeat(a)
}
const hello = async () => {
    return await world(10)
}
hello().then(r => console.log(r)).catch(e => console.log("fail"))