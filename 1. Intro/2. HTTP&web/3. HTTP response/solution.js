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

function outputHttpResponse(statusCode, statusMessage, headers, body) {
    console.log(
        `HTTP/1.1 ${statusCode} ${statusMessage}
Date: ${new Date()}
Server: Apache/2.2.14 (Win32)
Content-Length: ${body.length}
Connection: Closed
Content-Type: text/html; charset=utf-8

${body}`)
}


function processHttpRequest($method, $uri, $headers, $body) {
    if ($method == "GET") {
        const uriSplitted = $uri.split("?")
        const uriMethod = uriSplitted[0]
        const uriParams = uriSplitted[1].split("=")
        if (uriMethod == "/sum") {
            if (uriParams[0] == "nums") {
                const res = "" + uriParams[1].split(",").reduce((partialSum, a) => {
                    return partialSum + parseInt(a)
                }, 0)
                outputHttpResponse(200, "OK", $headers, res);
            } else {
                outputHttpResponse(400, "Bad Request", $headers, "Bad Request");
            }
        } else {
            outputHttpResponse(404, "Not Found", $headers, "not found");
        }
    } else {
        outputHttpResponse(400, "Bad Request", $headers, "Bad Request");
    }
}

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
processHttpRequest(http.method, http.uri, http.headers, http.body);