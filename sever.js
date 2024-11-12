const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuração do banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'seu_usuario',
    password: 'sua_senha',
    database: 'escola'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados MySQL!');
});

// Rota para listar professores
app.get('/api/professores', (req, res) => {
    const sql = 'SELECT * FROM professores';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Rota para adicionar professor
app.post('/api/professores', (req, res) => {
    const { nome, disciplina, faltas, motivo, substituto } = req.body;
    const sql = 'INSERT INTO professores (nome, disciplina, faltas, motivo, substituto) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nome, disciplina, faltas, motivo, substituto], (err, result) => {
        if (err) throw err;
        res.status(201).json({ id: result.insertId });
    });
});

// Rota para excluir professor
app.delete('/api/professores/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM professores WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.status(200).json({ message: 'Professor excluído com sucesso!' });
    });
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
