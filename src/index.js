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
    const ul = document.querySelector('ul');
    if (!todos.length) ul.innerHTML = '';
    let content = '';
    todos.forEach((tod) => {
      content += `
        <li id=${tod.id} class="item">
          <div class='group'>
            <input class='bdan' name='checkbox' type="checkbox" />
            <p contenteditable="true">${tod.desc}</p>
          </div>
          <i class="fa-solid fa-trash"></i>
        </li>`;
    });
    ul.innerHTML = content;
    content = '';
    UI.updateStatus();
  };

  static generateId = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);

  static clearValue = () => {
    document.querySelector('.input').value = '';
  };
  static updateStatus = () => {
    const nono = document.querySelector('ul');
    const children = nono.childNodes;
    children.forEach((child) => {
      const div = child.childNodes[1];
      console.log(div);
    });
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
}

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
