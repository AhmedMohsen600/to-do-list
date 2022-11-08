import './style.css';
import '@fortawesome/free-solid-svg-icons';
import { UI, Store, Todo } from './modules/index.js';

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

document.querySelector('.list').addEventListener('click', (event) => {
  const { id } = event.target.parentElement;
  if (event.target.classList.contains('fa-trash')) Store.removeTodo(id);
  Store.handelCheckBox(event.target);
});

document.querySelector('button').addEventListener('click', () => {
  let todos = Store.getTodos();
  todos = todos.filter((todo) => todo.completed === false);
  localStorage.setItem('todos', JSON.stringify(todos));
  UI.displayTodos(todos);
});
