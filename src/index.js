import './style.css';
import '@fortawesome/free-solid-svg-icons';
const todo = ['go to gym', 'Study', 'work'];

const displayTodos = (todo) => {
  const ul = document.querySelector('ul');
  let content = '';
  todo.forEach((tod) => {
    content += `<li class="item">
        <input type="checkbox" />
        <p contenteditable="true">${tod}</p>
      </li>`;
    ul.innerHTML = content;
  });

  content = '';
};

displayTodos(todo);
