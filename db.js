const mysql = require('mysql2');

const obterConexao = () => {
    return mysql.createConnection({
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    });
}

const listar = (callback) => {
    const conexao = obterConexao();
    conexao.query(
        'SELECT * FROM filme',
        (erro, resultado) => {
            callback(resultado)
        }
    );
}

const total = (callback) => {
    const conexao = obterConexao();
    conexao.query(
        'SELECT valor from tb_tarefa',
        (erro, resultado) => {
            callback(resultado)
        }
    );
}

const inserir = (filme, callback) => {
    const conexao = obterConexao();
    conexao.execute(
        'INSERT INTO filme(titulo,origem_uf,sinopse,genero,data_lancamento) VALUES (?,?,?,?,?)',
        [filme.titulo, filme.origem_uf, filme.sinopse, filme.genero, filme.data_lancamento],
        (erro, resultado) =>{
            callback(resultado);
        }
    );
}

const atualizar = (tarefa, callback) =>{
    const conexao = obterConexao();
    conexao.execute(
        'UPDATE tb_tarefa SET finalizada = ? WHERE id = ?',
        [tarefa.finalizada, tarefa.id],
        (erro, resultado) =>{
            callback(resultado);
        }
    );
}

const excluir = (tarefa, callback) => {
    const conexao = obterConexao();
    conexao.execute(
        'DELETE FROM tb_tarefa where id = ?',
        [tarefa.id],
        (erro, resultado) =>{
            callback(resultado);
        }
    );
}

module.exports = {
    listar,
    inserir, 
    atualizar,
    excluir, 
    total
}