const express = require('express');
const app = express();
const path = require('path');
const fs= require('fs');
const { log } = require('console');
const port=5000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));    
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    fs.readdir(`./files`, (err, files) => {
        res.render("index", {files:files});
    });
});

app.get('/files/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, 'utf8', (err, filedata) => {
        res.render('show',{filename:req.params.filename,filedata:filedata});
    });
});

app.get('/edit/:filename', (req, res) => {
    res.render('edit',{filename:req.params.filename});
});

app.post('/edit', (req, res) => {
   fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`, (err) => {
       res.redirect('/')});
})

app.post('/create', (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details, (err) => {
        res.redirect('/');
    });
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})








// app.get('/profile/:username', (req, res) => {
//     const username = req.params.username;
//     res.send(username);
// });

// app.get('/author/:username/:age', (req, res) => {
//     const username = req.params.username;
//     const age = req.params.age;
//     res.send(`username: ${username}, age: ${age}`);
// });