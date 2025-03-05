import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // API'den görevleri almak için GET isteği gönderiyoruz
    axios.get('http://localhost:3001/api/todos')
      .then((response) => {
        const res = response.data;
        console.log(res);
        setTodos(res);
      })
      .catch((error) => {
        console.error('Görevler alınırken hata oluştu:', error);
      });
  }, []); // Bileşen ilk yüklendiğinde çalışacak

  const [editTitle, setEditTitle] = useState('');
  const [editingId, setEditingId] = useState(null);

  const startEdit = (todo) => {
    setEditTitle(todo.title);
    setEditingId(todo.id);
  };

  const updateTodo = async () => {
    try {
      const updatedTodo = await axios.put(`http://localhost:3001/api/todos/${editingId}`, {
        title: editTitle
      });
      setTodos(todos.map(todo => todo.id === editingId ? updatedTodo.data : todo));
      setEditingId(null);
      setEditTitle('');
    } catch (error) {
      console.error('Görev güncellenirken hata:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));  // Silinen görevi listeden çıkar
    } catch (error) {
      console.error('Görev silinirken hata:', error);
    }
  };

  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);  // Varsayılan olarak false

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/todos', { title, completed });
      console.log('Yeni görev oluşturuldu:', response.data);
      // Yeni görev ekledikten sonra listeyi güncelle
      setTodos([...todos, response.data]); // Güncel todos dizisini ekler
      setTitle('');  // Formu sıfırla
      setCompleted(false);  // Varsayılan olarak false yap
    } catch (error) {
      console.error('Görev oluşturulurken hata oluştu:', error);
    }
  };

  const toggleCompleted = async (id, currentStatus) => {
    try {
      const updatedStatus = !currentStatus; // Eğer mevcut durum false ise true, true ise false olacak
      const updatedTodo = await axios.put(`http://localhost:3001/api/todos/${id}`, {
        completed: updatedStatus
      });
      setTodos(todos.map(todo => todo.id === id ? updatedTodo.data : todo));
    } catch (error) {
      console.error('Görev durumu güncellenirken hata oluştu:', error);
    }
  };

  return (
    <div className="App">
      <h1>To-Do Uygulaması</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Görev Adı:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <button type="submit">Görevi Ekle</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingId === todo.id ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            ) : (
              <span>{todo.title}</span>
            )}

            {/* Checkbox ekleniyor */}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompleted(todo.id, todo.completed)}
            />
            <button onClick={() => toggleCompleted(todo.id, todo.completed)}>
              {todo.completed ? 'Tamamlandı' : 'Tamamla'}
            </button>



            <div className="todo-actions">
              <button onClick={() => deleteTodo(todo.id)}>Sil</button>
              <button onClick={() => startEdit(todo)}>Düzenle</button>
              {editingId === todo.id && <button onClick={updateTodo}>Güncelle</button>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

}

export default App;
