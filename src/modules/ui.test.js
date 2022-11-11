import UI from './ui.js';

describe('UI', () => {
  test('should add todo to UI', () => {
    const todo = {
      id: 1,
      completed: true,
      desc: 'test todo',
    };
    document.body.innerHTML = `
    <ul class='list'></ul>
    `;
    UI.displayTodos([todo]);
    const ul = document.querySelector('.list');
    expect(ul.children).toHaveLength(1);
  });
});
