import express from 'express';
import nunjucks from 'nunjucks';

const db = require('./db');

const server = express()

server.use(express.static("public"))
server.use(express.urlencoded({ extended: true}))


nunjucks.configure("views", {
  express: server,
  noCache: true
})


server.get('/', (req,res) => {

  db.all(`SELECT * FROM ideas`, function (err, rows) {
    if(err) {
      console.log(err)
      return res.send('Erro no banco de dados')
    }

    const reversedIdeas = [...rows];

    let lastIdeas = []
    for(let idea of reversedIdeas.reverse()){
      if(lastIdeas.length < 2){
        lastIdeas.push(idea)
      } 
    }
    return res.render('index.html', { ideas: lastIdeas })
  });

})

server.get('/ideias', (req,res) => {

  db.all(`SELECT * FROM ideas`, function (err, rows) {
    if(err) {
      console.log(err)
      return res.send('Erro no banco de dados')
    }

    const reversedIdeas = [...rows];
    return res.render("ideias.html", { ideas: reversedIdeas.reverse() })
  });


})

server.post('/', (req,res) => {
  const query =  `INSERT INTO ideas(image, title, category, description, link) VALUES (?,?,?,?,?);`;
  const values = [
    req.body.image,
    req.body.title,
    req.body.category,
    req.body.description,
    req.body.link,
  ]
  db.run (query, values, function(err) {
    if(err) {
      console.log(err)
      return res.send('Erro no banco de dados')
    }

    return res.redirect("/ideias");
  })
})

server.listen(3333);
