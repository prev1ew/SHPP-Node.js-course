let maxKey = 0;
const getKey = () => {
    maxKey++;
    return maxKey;
}

class AbstractProduct {

    constructor(key = getKey(), name = "No name", description = "-", price = 0, quantity = 0,
        availableCount = 0, feedbacks = [], images = [], date = new Date(), brand = "-") {
        this.key = key;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.availableCount = availableCount;
        this.feedbacks = feedbacks;
        this.images = images;
        this.date = date;
        this.brand = brand;
    }

    #getProperties = function () {
        const props = {};
        for (let prop in this) {
            props[prop] = this[prop]
        }
        return props;
    }

    getFullInformation() {
        const props = this.#getProperties()
        let fullInfo = "";
        for (const [k, v] of Object.entries(props)) {
            fullInfo += (fullInfo.length > 0 ? ",\n" : "") + `"${k}"="${v}"`
        }
        return fullInfo
    }

    getPriceForQuantity(int) {
        const price = int * this.price;
        return `$${price.toFixed(2)}`
    }

    getMyProperty(propName) {
        return this[propName]
    }

    setMyProperty(propName, newValue) {
        this[propName] = newValue
    }

    universalGetterSetter(propName, newValue = undefined) {
        if (newValue === undefined) {
            return this.getMyProperty(propName)
        } else {
            this.setMyProperty(propName, newValue)
        }
    }
}


class Clothes extends AbstractProduct {

    constructor(key = getKey(), name = "No name", description = "-", price = 0, quantity = 0,
        availableCount = 0, feedbacks = [], images = [], date = new Date(), brand = "-",
        material = "", color = "") {
        super(key, name, description, price, quantity, availableCount, feedbacks, images, date, brand);
        this.material = material;
        this.color = color;
    }

    getColor() {
        return this.color;
    }

    setColor(newValue) {
        this.color = newValue
    }

    getMaterial() {
        return this.material;
    }

    setMaterial(newValue) {
        this.material = newValue
    }
}

class Electronics extends AbstractProduct {

    constructor(key = getKey(), name = "No name", description = "-", price = 0, quantity = 0,
        availableCount = 0, feedbacks = [], images = [], date = new Date(), brand = "-",
        warranty = 0, power = 0) {
        super(key, name, description, price, quantity, availableCount, feedbacks, images, date, brand);
        this.warranty = warranty;
        this.power = power;
    }

    getPower() {
        return this.power;
    }

    setPower(newValue) {
        this.power = newValue
    }

    getWarranty() {
        return this.warranty;
    }

    setWarranty(newValue) {
        this.warranty = newValue
    }

}

const tmp = new AbstractProduct(undefined, undefined, undefined, 1.5);
console.log(tmp.key)
console.log(tmp.getPriceForQuantity(21))

const tmp1 = new Clothes(undefined, undefined, undefined, 1.5);
console.log(tmp1.key)
console.log(tmp1.getPriceForQuantity(21))

tmp1.setColor("test")
let currAnswer = tmp1.getMyProperty("color")
console.log(currAnswer)
console.log(tmp1.universalGetterSetter("color") === tmp1.getColor())
tmp1.universalGetterSetter("material", "NEW")
console.log(tmp1.universalGetterSetter("material") === "NEW")

const tmp2 = new Electronics(undefined, undefined, undefined, 1.5);
tmp2.setWarranty(90)
currAnswer = tmp2.getMyProperty("warranty")
console.log(currAnswer)
console.log(tmp2.universalGetterSetter("warranty") === tmp2.getWarranty())
tmp2.universalGetterSetter("power", 350)
console.log(tmp2.universalGetterSetter("power") === 350)

console.log(tmp2.getFullInformation())