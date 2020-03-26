import express from 'express';
import nunjucks from 'nunjucks';


const ideas = [
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
    title: "Cursos de Programação",
    category: "Estudo",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus quos nihil tempora architecto, facilis quisquam fugit corrupti cupiditate omnis consectetur, sit consequuntur. Quae cupiditate mollitia ea quisquam deleniti ex obcae",
    url: "https://google.com"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
    title: "Exercicios",
    category: "Saude",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus quos nihil tempora architecto, facilis quisquam fugit corrupti cupiditate omnis consectetur, sit consequuntur. Quae cupiditate mollitia ea quisquam deleniti ex obcae",
    url: "https://google.com"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729069.svg",
    title: "Meditação",
    category: "Mentalidade",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus quos nihil tempora architecto, facilis quisquam fugit corrupti cupiditate omnis consectetur, sit consequuntur. Quae cupiditate mollitia ea quisquam deleniti ex obcae",
    url: "https://google.com"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
    title: "Karaokê",
    category: "Diversão em Familia",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus quos nihil tempora architecto, facilis quisquam fugit corrupti cupiditate omnis consectetur, sit consequuntur. Quae cupiditate mollitia ea quisquam deleniti ex obcae",
    url: "https://google.com"
  },
]

const server = express()

server.use(express.static("public"))


nunjucks.configure("views", {
  express: server,
  noCache: true
})


server.get('/', (req,res) => {

  const reversedIdeas = [...ideas];

  let lastIdeas = []
  for(let idea of reversedIdeas.reverse()){
    if(lastIdeas.length < 2){
      lastIdeas.push(idea)
    } 
  }
  return res.render('index.html', { ideas: lastIdeas })
})

server.get('/ideias', (req,res) => {
  const reversedIdeas = [...ideas];
  return res.render("ideias.html", { ideas: reversedIdeas.reverse() })
})

server.listen(3333);
