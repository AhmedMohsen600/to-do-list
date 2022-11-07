import './style.css';
import '@fortawesome/free-solid-svg-icons';

class Todo {
  constructor(desc, completed, id) {
    this.desc = desc;
    this.completed = completed;
    this.id = id;
  }
}
class UI {
  static displayTodos = (todos) => {
    const ul = document.querySelector('.list');
    ul.innerHTML = '';
    todos.forEach((tod) => {
      ul.innerHTML += `
        <li id=${tod.id} class="item">
          <div class='group'>
            <input id=${tod.id} class='bdan' name='checkbox' type="checkbox" ${
        tod.completed && 'checked'
      } />
            <p id=${tod.id} class='${
        tod.completed && 'line'
      }' contenteditable="true">${tod.desc}</p>
          </div>
          <i class="fa-solid fa-trash"></i>
        </li>`;
    });
  };

  static generateId = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);

  static clearValue = () => {
    document.querySelector('.input').value = '';
  };

  static addLineThrowToDos = ({ checked, id }) => {
    if (checked) {
      document.querySelectorAll('p').forEach((pTag) => {
        if (pTag.id === id) pTag.classList.add('line');
      });
    } else {
      document.querySelectorAll('p').forEach((pTag) => {
        if (pTag.id === id) pTag.classList.remove('line');
      });
    }
  };
}

class Store {
  static getTodos = () => {
    let todos;
    if (!localStorage.getItem('todos')) todos = [];
    else todos = JSON.parse(localStorage.getItem('todos'));
    return todos;
  };

  static addTodo = (todo) => {
    const todos = Store.getTodos();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    UI.displayTodos(todos);
  };

  static removeTodo = (id) => {
    let todos = Store.getTodos();
    todos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(todos));
    UI.displayTodos(todos);
  };

  static changeStateofToDos = (todos, { checked, id }) =>
    todos.map((todo) => {
      if (!checked && id === todo.id) return { ...todo, completed: false };
      else if (checked && id === todo.id) return { ...todo, completed: true };
      return todo;
    });
}

// EVENTS
document.addEventListener('DOMContentLoaded', () => {
  const todos = Store.getTodos();
  UI.displayTodos(todos);
});

document.querySelector('.fa-turn-down').addEventListener('click', () => {
  const input = document.querySelector('.input').value;
  const newTodo = new Todo(input, false, UI.generateId());
  Store.addTodo(newTodo);
  UI.clearValue();
});

document.querySelector('.list').addEventListener('click', (e) => {
  const { id } = e.target.parentElement;
  if (e.target.classList.contains('fa-trash')) Store.removeTodo(id);
});

document.querySelector('.list').addEventListener('click', (event) => {
  if (event.target.classList.contains('bdan')) {
    let todos = Store.getTodos();
    event.target.addEventListener('change', (e) => {
      UI.addLineThrowToDos(e.target);
      todos = Store.changeStateofToDos(todos, e.target);
      localStorage.setItem('todos', JSON.stringify(todos));
    });
  }
});

document.querySelector('button').addEventListener('click', () => {
  let todos = Store.getTodos();
  todos = todos.filter((todo) => todo.completed === false);
  localStorage.setItem('todos', JSON.stringify(todos));
  UI.displayTodos(todos);
});
