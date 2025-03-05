const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const Todo = require('./models/todo.js'); // Todo modelini import et

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Veritabanı ile senkronize et
sequelize.sync().then(() => {
    console.log('Veritabanı senkronize edildi!');
}).catch((error) => {
    console.error('Veritabanı senkronizasyon hatası:', error);
});

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
            completed: completed || false,  // Eğer `completed` verilmemişse, varsayılan olarak false
        });

        res.status(201).json(newTodo);  // Başarıyla oluşturulan Todo'yu döndür
    } catch (error) {
        res.status(500).json({ message: 'Görev oluşturulurken hata oluştu!', error });
    }
});

app.delete('/api/todos/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const result = await Todo.destroy({
            where: { id }
        });

        if (result) {
            res.status(200).json({ message: 'Görev başarıyla silindi!' });
        } else {
            res.status(404).json({ message: 'Görev bulunamadı!' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Silme işlemi sırasında bir hata oluştu!', error });
    }
});

app.put('/api/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    try {
        const [updated] = await Todo.update({ title, completed }, {
            where: { id }
        });

        if (updated) {
            const updatedTodo = await Todo.findByPk(id);
            res.status(200).json(updatedTodo);
        } else {
            res.status(404).json({ message: 'Görev bulunamadı!' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Güncelleme işlemi sırasında bir hata oluştu!', error });
    }
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor.`);
});
