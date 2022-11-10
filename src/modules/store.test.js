jest.mock('./ui');
import Todo from './todo.js';
import Store from './store.js';
import UI from './ui';

describe('adding tests', () => {
  test('should add todo successfully', () => {
    const result = Store.addTodo({ test: 'todo item' });
    expect(result).toEqual([{ test: 'todo item' }]);
    expect(localStorage.getItem('todos')).toEqual(
      JSON.stringify([{ test: 'todo item' }])
    );
    expect(UI.displayTodos).toBeCalled();
    expect(UI.displayTodos).toBeCalledWith(Store.getTodos());
  });
});

// describe('removing tests', () => {
//   test('remove one new item to the list', () => {
//     const length = Store.remove(2);
//     expect(length).toHaveLength(1);
//   });

//   test('remove one new item to the list', () => {
//     const length = Store.remove(1);
//     expect(length).toHaveLength(0);
//   });
// });
