require('dotenv').config();
const cors = require('cors');
const db = require('./db');
const express = require('express');
const app = express();
app.use(express.json());
app.use(cors());

const obterFilmes = (req, res) =>{
    db.listar((filmes)=>{
        filmes = filmes.map((f)=>{
            return {id_filme: f.id_filme, titulo: f.titulo, data_lancamento: f.data_lancamento, origem_uf: f.origem_uf, sinopse: f.sinopse,
            qualificacao: f.qualificacao, genero: f.genero, imagem: f.imagem}
        });
        res.json({filmes});
    });
}

const obterTotal = (req, res) => {
    db.total((listaTotal) => {
        listaTotal = listaTotal.map((t) =>{
            return {valor: t.valor}
        });
        res.json({listaTotal});
    })
}

app.get("/tarefas/total", (req, res) => {
    obterTotal(req, res);
})

//http://localhost:3000/tarefas (GET)
app.get("/filmes", (req, res) => {
    obterFilmes(req, res);
    //res.json({tarefas});
})

//http://localhost:3000/tarefas (POST)
app.post("/filmes", (req, res) => {
    const t = req.body;
    db.inserir(t, (resultado) =>{
        obterFilmes(req, res);
    });
});

app.put("/tarefas", (req, res) => {
    db.atualizar(req.body, (resultado) =>{
        obterTarefas(req, res);
    });
})

app.delete("/tarefas", (req, res) => {
    db.excluir(req.body, (resultado)=>{
        obterTarefas(req, res);
    });
})

app.listen(process.env.PORT, () => console.log("up and running"));
