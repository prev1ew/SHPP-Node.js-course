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
    if ($method == "POST" &&
        $uri == "/api/checkLoginAndPassword" &&
        $headers["Content-Type"] == "application/x-www-form-urlencoded") {

        // get fileData
        let fileData = {}
        try {
            require("fs").readFileSync("passwords.txt").toString().split("\n").forEach((el) => {
                const rowData = el.split(":")
                fileData[rowData[0]] = rowData[1]
            });
        } catch {
            outputHttpResponse(500, "Internal Server Error", $headers, '<h1 style="color:black">Internal Server Error</h1>');
            return;
        }

        // get login and pass
        const dataToCheck = {};
        $body.split("&").forEach((el) => {
            const rowData = el.split("=")
            dataToCheck[rowData[0]] = rowData[1]
        });

        // check if data in the file
        if (fileData[dataToCheck["login"]] === dataToCheck["password"]) {
            outputHttpResponse(200, "OK", $headers, '<h1 style="color:green">FOUND</h1>');
        } else {
            outputHttpResponse(404, "Not Found", $headers, '<h1 style="color:red">NO DATA FOUND</h1>');
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