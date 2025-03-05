import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  // Başlangıçta görevleri al
  useEffect(() => {
    axios.get('http://localhost:3001/api/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Görevler alınırken hata:', error));
  }, []);

  // Yeni görev ekleme
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/todos', { title, completed: false });
      setTodos([...todos, response.data]);
      setTitle('');
    } catch (error) {
      console.error('Görev oluşturulurken hata:', error);
    }
  };

  // Görev silme
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Görev silinirken hata:', error);
    }
  };

  // Düzenleme moduna geçme
  const handleEdit = (todo) => {
    setEditId(todo.id);
    setEditTitle(todo.title);
  };

  // Düzenlenmiş görevi güncelleme
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/api/todos/${editId}`, { title: editTitle });
      setTodos(todos.map(todo => todo.id === editId ? response.data : todo));
      setEditId(null);
      setEditTitle('');
    } catch (error) {
      console.error('Görev güncellenirken hata:', error);
    }
  };

  // Görevin tamamlanma durumunu değiştirme (toggle)
  const toggleCompleted = async (todo) => {
    try {
      const updatedTodo = await axios.put(`http://localhost:3001/api/todos/${todo.id}`, {
        title: todo.title,          // title'ı koruyoruz
        completed: !todo.completed  // mevcut durumun tersini gönderiyoruz
      });
      setTodos(todos.map(t => t.id === todo.id ? updatedTodo.data : t));
    } catch (error) {
      console.error('Görev durumu güncellenirken hata:', error);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">To-Do Uygulaması</h1>

      {/* Görev ekleme formu */}
      <div className="card p-4 mb-4 shadow-sm">
        <form onSubmit={handleSubmit} className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Yeni görev ekle..."
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">Ekle</button>
        </form>
      </div>

      {/* Görev listesi */}
      <ul className="list-group">
        {todos.map(todo => (
          <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center" style={{ backgroundColor: todo.completed ? '#c8ffa4' : '' }}>
            <div className="d-flex align-items-center">
              {/* Check box ile tamamlanma durumu */}
              <input
                type="checkbox"
                className="form-check-input me-2"
                style={{ backgroundColor: todo.completed ? '#3c9800' : '#f9e79f' }}
                checked={todo.completed}
                onChange={() => toggleCompleted(todo)}
              />
              {editId === todo.id ? (
                <input
                  type="text"
                  className="form-control me-2"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                />
              ) : (
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  {todo.title}
                </span>
              )}
            </div>
            <div className="todo-actions">
              {editId === todo.id ? (
                <>
                  <button className="btn btn-success btn-sm me-2" onClick={handleUpdate}>Güncelle</button>
                  <button
                    className="btn btn-secondary btn-sm me-2"
                    onClick={() => { setEditId(null); setEditTitle(''); }}>
                    İptal
                  </button>
                </>
              ) : (
                <>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(todo)}>Düzenle</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(todo.id)}>Sil</button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
