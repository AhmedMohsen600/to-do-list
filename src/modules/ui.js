class UI {
  static displayTodos = (todos) => {
    const ul = document.querySelector('.list');
    ul.innerHTML = '';
    todos.forEach((tod) => {
      ul.innerHTML += `
          <li id=${tod.id} class="item">
            <div class='group'>
              <input id=${
                tod.id
              } class='bdan' name='checkbox' type="checkbox" ${
                tod.completed && 'checked'
              } />
              <p id=${tod.id} class='${
                tod.completed && 'line'
              }' contenteditable="true">${tod.desc}</p>
            </div>
            <i class="fa-solid fa-trash"></i>
          </li>`;
    });
  };

  static generateId = () => Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

  static clearValue = () => {
    document.querySelector('.input').value = '';
  };

  static addLineThroughToDos = ({ checked, id }) => {
    if (checked) {
      document.querySelectorAll('p').forEach((pTag) => {
        if (pTag.id === id) pTag.classList.add('line');
      });
    } else {
      document.querySelectorAll('p').forEach((pTag) => {
        if (pTag.id === id) pTag.classList.remove('line');
      });
    }
  };
}

export default UI;
