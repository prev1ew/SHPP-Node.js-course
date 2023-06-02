const dateLocale = "en-GB";
const deleteCommaInDates = true;

const ratingProps = ["service", "price", "value", "quality"]
const defaultRatingValue = 1;

let maxId = 0;
let reviewMaxId = 0;

/**
 * returns ID 
 * @param {boolean} forProduct answers the question "if ID needed for product", true = forProduct, false = forRating
 * @returns ID
 */
const getNewId = (forProduct = true) => {
    if (forProduct) {
        maxId++;
        return maxId.toString();
    }
    reviewMaxId++;
    return reviewMaxId.toString();
}

/**
 * 
 * @param {Date} date date to format
 * @returns String - formatted date
 */
const formatDate = (date) =>
    deleteCommaInDates ? date.toLocaleString(dateLocale).replace(",", "") : date.toLocaleString(dateLocale)


const arrayRemoveElement = (arr, value, elementProperty = null) => {
    if (elementProperty) {
        return arr.filter(function (ele) {
            return ele[elementProperty] != value;
        });
    }
    return arr.filter(function (ele) {
        return ele != value;
    });
}

/**
 * 
 * @param {Review[]} reviews 
 * @param {string} reviewId 
 * @returns 
 */
const getReviewById = (reviews, reviewId) => {
    return reviews.find(obj => obj.id == reviewId)
}


/**
 * creates reviewRating object
 * @param  {...Number} args 
 * @returns reviewRating object
 */
const createReviewRating = (...args) => {
    const objToReturn = {}
    ratingProps.forEach((propName, index) => {
        objToReturn[propName] = args[index] != undefined ? args[index] : defaultRatingValue
    })
    return objToReturn
}

/**
 * 
 * @param {string} author 
 * @param {Date} date 
 * @param {String} comment 
 * @param {{service,price,value,quality}}} rating 
 * @returns 
 */
const Review = (author = "anonymous ", date = new Date(), comment = "", rating = createReviewRating()) => {
    return {
        id: getNewId(false),
        author,
        date: formatDate(date),
        comment,
        rating
    };
}

/**
 * calculates avg value of provided args
 * @param  {...any} args values to calc avg value on
 * @returns avg value
 */
const getAverage = (...args) => {

    if (args.length == 0) {
        return 0;
    }

    let sum = 0;
    args.forEach((currVal) => {
        sum += currVal
    })

    return sum / args.length
}

/**
 * calcs summarized ratings of each "rating prop"
 * @param {Review[]} obj ratings of the product
 * @returns avg rating of each "rating prop"
 */
const getAverageRating = (reviews) => {
    // add all ratings into one object
    const summarizedObj = {};
    ratingProps.forEach((propValue) => {
        summarizedObj[propValue] = [];
    });

    reviews.forEach((review) => {
        Object.entries(review["rating"]).forEach((array) => {
            summarizedObj[array[0]].push(array[1])
        });
    })


    // calc average values
    const returnVal = {};
    Object.entries(summarizedObj).forEach((entry) => {
        returnVal[entry[0]] = getAverage(...entry[1])
    });
    return returnVal
}

/**
 * function to create a product (according to the task)
 * @param {string} name The date
 * @param {string} description The description
 * @param {number} price The price
 * @param {string} brand The brand
 * @param {string[]} sizes The sizes
 * @param {string} activeSize The activeSize
 * @param {number} quantity The quantity
 * @param {Date} date The date
 * @param {Review[]} reviews The reviews
 * @param {string[]} images The images
 */
const Product = (name = "undefined", description = "no description", price = 0, brand = "No brand",
    sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'], activeSize = "",
    quantity = 0, date = new Date(), reviews = [], images = []) => {

    return {
        id: getNewId(),
        name,
        description,
        price,
        brand,
        sizes,
        activeSize,
        quantity,
        date: formatDate(date),
        reviews,
        images,
        getMyProperty: function (propertyName) {
            return this[propertyName]
        },
        setMyProperty: function (propertyName, newValue) {
            this[propertyName] = propertyName == "date" ? formatDate(newValue) : newValue
        },
        getReviewByID: function (reviewId) {
            return getReviewById(this.reviews, reviewId)
        },
        getImage: function (imageValue) {
            return this.images[imageValue];
        },
        addSize: function (sizeToAdd) {
            this.sizes.push(sizeToAdd)
        },
        deleteSize: function (sizeToDelete) {
            this.sizes = arrayRemoveElement(this.sizes, sizeToDelete)
        },
        addReview: function (newReview) {
            this.reviews.push(newReview)
        },
        deleteReview: function (reviewToDelete) {
            this.reviews = arrayRemoveElement(this.reviews, reviewToDelete, "id")
        },
        getAverageRating: function () {
            return getAverageRating(this.reviews)
        }
    }
}

const searchProduct = (products, searchQuery) => {
    const foundObjects = []
    products.forEach((product) => {
        if (product.getMyProperty("name").toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.getMyProperty("description").toLowerCase().includes(searchQuery.toLowerCase())) {
            foundObjects.push(product);
        }
    })
    return {
        length: foundObjects.length,
        foundObjects,
        searchQuery,
        srcLength: products.length
    }
}

const sortProduct = (products, sortRule) => {
    products.sort(function (a, b) {
        const keyA = a[sortRule];
        const keyB = b[sortRule];
        // Compare the 2 keys
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });
    return products
}


const tmp = Product();

console.log(tmp.getMyProperty("name"))
console.log(tmp.getMyProperty("date"))
tmp.setMyProperty("date", new Date())
tmp.setMyProperty("name", "test name")
console.log(tmp.getMyProperty("name"))
console.log(tmp.getMyProperty("date"))
tmp.addSize("TEST")
console.log(tmp.getMyProperty("sizes"))
tmp.deleteSize("TEST")
console.log(tmp.getMyProperty("sizes"))

const tmpReview = Review("FIRST");
tmp.addReview(tmpReview);
const tmpReview2 = Review("SECOND");
tmp.addReview(tmpReview2);
console.log(tmp.getMyProperty("reviews"))
tmp.deleteReview(tmpReview.id);
console.log(tmp.getMyProperty("reviews"))
tmp.addReview(Review(undefined, undefined, undefined, createReviewRating(0, -1, 5, 5)));
tmp.addReview(Review(undefined, undefined, undefined, createReviewRating(5, 5, 5, 5)));
tmp.addReview(Review(undefined, undefined, undefined, createReviewRating(5, 5, 5, 5)));
tmp.addReview(Review(undefined, undefined, undefined, createReviewRating(5, 5, 5, 5)));
const resp = tmp.getAverageRating()
console.log(Object.entries(resp))

const products = [];
products.push(tmp);
products.push(Product("tEEEEst"))
products.push(Product("eee"))
products.push(Product("avg E test e E"))
products.push(Product("desk search", "eee"))

console.log(searchProduct(products, "eee"))

products.push(Product("1"))
products.push(Product("3"))
products.push(Product("999"))
products.push(Product("4"))

console.log(sortProduct(products, "name"))
console.log(sortProduct(products, "id"))

products.push(Product(undefined, undefined, 1))
products.push(Product(undefined, undefined, -1))

console.log(sortProduct(products, "price"))
