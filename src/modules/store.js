import UI from './ui.js';

let todos = [];

class Store {
  static getTodos = () => {
    if (!localStorage.getItem('todos')) todos = [];
    else todos = JSON.parse(localStorage.getItem('todos'));
    return todos;
  };

  static addTodo = (todo) => {
    const todos = Store.getTodos();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    UI.displayTodos(todos);
    return todos;
  };

  static removeTodo = (id) => {
    const todos = Store.getTodos();
    this.remove(id);
    localStorage.setItem('todos', JSON.stringify(todos));
    UI.displayTodos(todos);
  };

  static remove(id) {
    todos = todos.filter((todo) => todo.id !== id);
    return todos;
  }

  static changeStateofToDos = (todos, { checked, id }) =>
    todos.map((todo) => {
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
