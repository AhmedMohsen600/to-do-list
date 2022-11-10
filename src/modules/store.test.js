import Todo from './todo.js';
import Store from './store.js';

describe('adding tests', () => {
  test('Add first new item to the list', () => {
    const todo = new Todo('test1', false, 1);
    const length = Store.add(todo);
    expect(length).toHaveLength(1);
  });
  test('Add secound new item to the list', () => {
    const todo = new Todo('test2', false, 2);
    const length = Store.add(todo);
    expect(length).toHaveLength(2);
  });
});

describe('removing tests', () => {
  test('remove one new item to the list', () => {
    const length = Store.remove(2);
    expect(length).toHaveLength(1);
  });

  test('remove one new item to the list', () => {
    const length = Store.remove(1);
    expect(length).toHaveLength(0);
  });
});
