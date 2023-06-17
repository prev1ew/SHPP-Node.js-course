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

receiveThreeNamesThenOnly().then((res) => console.log(res))