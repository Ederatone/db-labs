const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.get('/roles', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Role"');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/roles/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM "Role" WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Role not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/roles', async (req, res) => {
    const { name, description } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO "Role" (name, description) VALUES ($1, $2) RETURNING *',
            [name, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/roles/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const result = await pool.query(
            'UPDATE "Role" SET name = $1, description = $2 WHERE id = $3 RETURNING *',
            [name, description, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Role not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/roles/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM "Role" WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Role not found' });
        }
        res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
