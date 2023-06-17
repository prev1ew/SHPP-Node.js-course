// 1. 2.
async function getIP() {
    const response = await fetch("https://api.ipify.org?format=json")
    const jsonData = await response.json()
    return jsonData.ip
}

// 3.1
// async function getResponseJSON(url: string) {
//     const response = await fetch("https://api.ipify.org?format=json")
//     return await response.json()
// }

