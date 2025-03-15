const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./src/config/database.js');
const Todo = require('./src/models/todo.js'); // Todo modelini import et

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/todos', async (req, res) => {
    try {
        const todos = await Todo.findAll();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Yeni Todo oluşturma
app.post('/api/todos', async (req, res) => {
    const { title, completed } = req.body;

    try {
        const newTodo = await Todo.create({
            title,
            completed: completed || false,
        });

        res.status(201).json(newTodo);  // Başarıyla oluşturulan Todo'yu döndür
    } catch (error) {
        res.status(500).json({ message: 'Todo oluşturulurken hata', error });
    }
});

app.delete('/api/todos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Todo.destroy({
            where: { id }
        });

        if (result) {
            res.status(200).json({ message: 'Todo başarıyla silindi!' });
        } else {
            res.status(404).json({ message: 'Todo bulunamadı!' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Silme işlemi sırasında bir hata', error });
    }
});

app.put('/api/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    try {
        const todo = await Todo.findByPk(id);

        if (!todo) {
            return res.status(404).json({ message: 'Görev bulunamadı!' });
        }

        const updateData = {};

        if (title !== undefined) {
            updateData.title = title;
        }

        if (completed !== undefined) {
            updateData.completed = completed;
            updateData.completed_date = completed ? new Date().toLocaleString() : null;
        }

        await todo.update(updateData);

        res.status(200).json(todo);

    } catch (error) {
        console.error('Güncelleme hatası:', error);
        res.status(500).json({ message: 'Güncelleme işlemi sırasında bir hata oluştu!', error: error.message });
    }
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, "127.0.0.1", () => {
    console.log(`Server ${PORT} portunda çalışıyor.`);
});
