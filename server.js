const express = require('express');
const mysql = require('mysql');
const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'usuarios'
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conectado a la base de datos');
    }
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/consultar', (req, res) => {
    const id = req.body.id;
    const query = 'SELECT * FROM usuarios WHERE id = ?';

    db.query(query, [id], (err, resultados) => {
        if (err) {
            console.error('Error en la consulta:', err);
            res.status(500).send('Error en la consulta a la base de datos');
        } else if (resultados.length === 0) {
            res.status(404).send('Usuario no encontrado');
        } else {
            res.render('detalle', { usuario: resultados[0] });
        }
    });
});

app.listen(4000, () => {
    console.log('Servidor corriendo en http://localhost:4000');
});
