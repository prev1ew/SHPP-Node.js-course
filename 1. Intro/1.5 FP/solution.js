const fsPromises = require('fs').promises

const csvFilename = "./example.csv";
const columns = ['x', 'y', 'name', 'population']
const sortColumn = "population"
let fileIsRead = false;
let fileData = [];

async function processFile() {
    if (fileData.length == 0) {
        return await fsPromises.readFile(csvFilename, "utf-8", (err, data) => {
            if (err) console.log(err);
            else {
                fileData = data;
                return fileData;
            }
        }
        );
    } else {
        return fileData;
    }
}

const actionsAfterReading = (data) => {

    if (!fileIsRead) {

        let newData = data.split("\r\n")

        // skip "comments" and empty lines
        newData = newData.filter(elem => elem[0] != "#" && elem != "")

        // separate element by "," and create an object
        newData = newData.map((elem) => {
            const newElement = {};
            elem.split(",").map((elValue, index) => {
                if (index < columns.length) {
                    newElement[columns[index]] = elValue
                }
            })
            return newElement;
        });

        // sort by population
        newData = newData.sort(function (a, b) {
            const keyA = +a[sortColumn];
            const keyB = +b[sortColumn];

            if (keyA > keyB) return -1;
            if (keyA < keyB) return 1;
            return 0;
        });

        // select TOP 10
        newData = newData.slice(0, 10)

        // change "format"
        newData = newData.reduce((obj, item, index) => {
            obj[item["name"]] = { population: item.population, rating: index + 1 }
            return obj;
        }, {})

        fileData = newData;

        fileIsRead = true;
    }

    return function (text) {
        Object.entries(fileData).forEach((el) => {
            text = text.replace(el[0],
                `${el[0]} (${el[1].rating} in TOP 10 countries! With population: ${el[1].population})`)
        })
        return text;
    }

}

processFile().then((data) => {
    const finalFunc = actionsAfterReading(data);
    const retVal = finalFunc("Test Max is something, but from other side - Вінниця is also good");
    console.log(retVal)
})



