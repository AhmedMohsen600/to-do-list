import './style.css';
import '@fortawesome/free-solid-svg-icons';

const todoList = [
  {
    description: 'An example described in the string',
    completed: false,
    index: 0,
  },
  {
    description: 'An example described in the string',
    completed: false,
    index: 1,
  },
  {
    description: 'An example described in the string',
    completed: true,
    index: 2,
  },
];

const displayTodos = (todo) => {
  const ul = document.querySelector('ul');
  let content = '';
  todo.forEach((tod) => {
    content += `<li class="item">
        <input type="checkbox" />
        <p contenteditable="true">${tod.description}</p>
      </li>`;
    ul.innerHTML = content;
  });

  content = '';
};
displayTodos(todoList);
