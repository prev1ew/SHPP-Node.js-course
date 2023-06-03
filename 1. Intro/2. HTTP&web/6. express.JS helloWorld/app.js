const express = require('express')
const app = express()
const port = 3000

let counter = 0;

app.get('/', (req, res) => {
    counter++;
    res.send(`Counter: ${counter}`)
})

app.listen(port, () => {
    console.log(`HelloWorld app listening on port ${port}`)
})