import express from 'express';

const app = express();
const port = 4000

app.use(express.static('static'))

app.get('/', (req, res) => {
    //res.send('Hello World!')
    res.render('static/index.html');
})

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
