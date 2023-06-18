// 1. 2.
async function getIP() {
    const response = await fetch("https://api.ipify.org?format=json")
    const jsonData = await response.json()
    return jsonData.ip
}

// 3
async function getResponseJSON(url: string) {
    const response = await fetch(url)
    return await response.json()
}

// 3.1
async function receiveThreeNamesAsyncAwaitPromiseAll() {
    const getNameURL = "https://random-data-api.com/api/name/random_name";
    const promise1 = getResponseJSON(getNameURL).then((res) => res.name);
    const promise2 = getResponseJSON(getNameURL).then((res) => res.name);
    const promise3 = getResponseJSON(getNameURL).then((res) => res.name);
    return await Promise.all([promise1, promise2, promise3]).then((res) => {
        return res;
    })
}

// 3.2 
async function receiveThreeNamesAsyncAwait() {
    const getNameURL = "https://random-data-api.com/api/name/random_name";
    // res.push(await getResponseJSON(getNameURL).then((res) => res.name));
    // res.push(await getResponseJSON(getNameURL).then((res) => res.name));
    // res.push(await getResponseJSON(getNameURL).then((res) => res.name));
    const promise1 = getResponseJSON(getNameURL).then((res) => res.name);
    const promise2 = getResponseJSON(getNameURL).then((res) => res.name);
    const promise3 = getResponseJSON(getNameURL).then((res) => res.name);
    const res = await promise1.then(
        async (res1) => {
            let results = [];
            await promise2.then(
                async (res2) => {
                    await promise3.then(
                        async (res3) => {
                            results.push(res3)
                        })
                    results.push(res2)
                })
            results.push(res1);
            return results;
        })
    return res;
}

// 3.3
async function receiveThreeNamesThenOnly() {
    const getNameURL = "https://random-data-api.com/api/name/random_name";
    const promise1 = fetch(getNameURL).then((res) => res.json()).then((res) => res.name);
    const promise2 = fetch(getNameURL).then((res) => res.json()).then((res) => res.name);
    const promise3 = fetch(getNameURL).then((res) => res.json()).then((res) => res.name);
    const res = promise1.then(
        (res1) => {
            let results = [];
            promise2.then(
                (res2) => {
                    promise3.then(
                        (res3) => {
                            results.push(res3)
                        })
                    results.push(res2)
                })
            results.push(res1);
            return results;
        })
    return res;
}

// 4
const getUserInfoURL = "https://random-data-api.com/api/users/random_user"
// 4.1
function getWomanName(userName: string = "", attemptCount: number = 0) {
    //let attemptCount = 0;
    //let userName = "";
    if (userName !== "") {
        return userName;
    }

    if (userName === "") {
        return fetch(getUserInfoURL).then((res) => res.json()).then((res) => {
            // console.log(`${res.gender.toLowerCase()}, ${res.gender.toLowerCase() === "female"}`)
            if (res.gender.toLowerCase() === "female") {
                const currRes = `${res.first_name} ${res.last_name}... attempt count: ${attemptCount}`
                console.log(currRes)
                return currRes
            } else {
                getWomanName("", attemptCount + 1)
            }
        });
    }
}

// 4.2 
async function getWomanNameAsyncAwait() {
    let attemptCount = 1;
    let returnValue = "";

    while (returnValue === "") {
        const currRes = await fetch(getUserInfoURL).then((res) => res.json());
        if (currRes.gender.toLowerCase() === "female") {
            returnValue = `${currRes.first_name} ${currRes.last_name}... attempt count: ${attemptCount}`
            // console.log(returnValue)
        }
        attemptCount++;
    }
    return returnValue;
}

// 5
function testCallback(...args: string[]) {
    console.log(`test callback with params: ${args}`)
}
async function func1(callback: Function) {
    const currentIp = await getIP();
    callback(currentIp)
    return "Done"
}

async function func2() {
    return func1(testCallback)
}

// func2().then((res) => { console.log(res) });

// 6

async function fun1() {
    return await getIP();
}

async function fun2(callbackFunc: Function) {
    const resFromFunc1 = await fun1();
    callbackFunc(resFromFunc1)
    return "fun2:Done"
}

// fun2(testCallback).then((res) => console.log(res))