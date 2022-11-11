import Todo from './todo.js';
import Store from './store.js';
import UI from './ui.js';

jest.mock('./ui');

describe('adding tests', () => {
  test('should add todo successfully', () => {
    const todo = new Todo('study', false, 1212);

    const result = Store.addTodo(todo);
    expect(result).toEqual([{ desc: 'study', completed: false, id: 1212 }]);
    expect(result).toHaveLength(1);
    expect(localStorage.getItem('todos')).toEqual(
      JSON.stringify([{ desc: 'study', completed: false, id: 1212 }]),
    );
    expect(UI.displayTodos).toBeCalled();
    expect(UI.displayTodos).toBeCalledWith(Store.getTodos());
  });
});

describe('remving tests', () => {
  test('should remove todo successfully', () => {
    const result = Store.removeTodo(1212);
    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
    expect(localStorage.getItem('todos')).toEqual(JSON.stringify([]));
    expect(UI.displayTodos).toBeCalled();
    expect(UI.displayTodos).toBeCalledWith(Store.getTodos());
  });
});
