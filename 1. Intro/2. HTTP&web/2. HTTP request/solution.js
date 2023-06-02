// этот файл надо будет дописать...

// не обращайте на эту функцию внимания 
// она нужна для того чтобы правильно читать входные данные
function readHttpLikeInput() {
    var fs = require("fs");
    var res = "";
    var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
    let was10 = 0;
    for (; ;) {
        try { fs.readSync(0 /*stdin fd*/, buffer, 0, 1); } catch (e) { break; /* windows */ }
        if (buffer[0] === 10 || buffer[0] === 13) {
            if (was10 > 10)
                break;
            was10++;
        } else
            was10 = 0;
        res += new String(buffer);
    }

    return res;
}

let contents = readHttpLikeInput();

// вот эту функцию собственно надо написать
function parseTcpStringAsHttpRequest(string) {

    let currData = string.split("\n")
    let requestInfo = currData[0].split(" ")
    currData = currData.slice(1)

    const headers = {};

    let currElement = currData[0]
    while (currElement != "" && currElement.includes(":")) {
        const currParts = currElement.split(":")
        headers[currParts[0]] = currParts[1].replace(" ", "")
        currData = currData.slice(1)
        currElement = currData[0]
    }

    let body = currData[1];
    while (body == "" && currData.length > 0) {
        let currElement = currData[0]
        if (currElement.length == 0) {
            currData = currData.slice(1)
        } else {
            body = currElement.replace(" ", "")
        }
    }

    return {
        method: requestInfo[0],
        uri: requestInfo[1],
        headers: headers,
        body: body,
    };
}

http = parseTcpStringAsHttpRequest(contents);
console.log(JSON.stringify(http, undefined, 2));