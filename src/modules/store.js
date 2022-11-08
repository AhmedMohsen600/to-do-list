import UI from './ui.js';

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

  static changeStateofToDos = (todos, { checked, id }) => todos.map((todo) => {
    if (!checked && id === todo.id) return { ...todo, completed: false };
    if (checked && id === todo.id) return { ...todo, completed: true };
    return todo;
  });

  static handelCheckBox = (checkbox) => {
    if (checkbox.classList.contains('bdan')) {
      let todos = Store.getTodos();
      checkbox.addEventListener('change', (e) => {
        UI.addLineThroughToDos(e.target);
        todos = Store.changeStateofToDos(todos, e.target);
        localStorage.setItem('todos', JSON.stringify(todos));
      });
    }
  };
}

export default Store;
