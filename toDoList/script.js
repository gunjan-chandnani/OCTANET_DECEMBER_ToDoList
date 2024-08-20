document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.querySelector('.todo-input');
  const todoButton = document.querySelector('.todo-button');
  const todoList = document.querySelector('.todo-list');
  const filterOption = document.querySelector('.filter-todo');

  todoButton.addEventListener('click', addTodo);
  todoList.addEventListener('click', deleteCheck);
  filterOption.addEventListener('change', filterTodo);
  
  function addTodo(event) {
    event.preventDefault();
    if (todoInput.value.trim() !== '') {
      const todoDiv = document.createElement('div');
      todoDiv.classList.add('todo');

      const newTodo = document.createElement('li');
      newTodo.innerText = todoInput.value;
      newTodo.classList.add('todo-item');
      todoDiv.appendChild(newTodo);

      const completeButton = document.createElement('button');
      completeButton.innerHTML = '<i class="fas fa-check-circle"></i>';
      completeButton.classList.add('complete-btn');
      todoDiv.appendChild(completeButton);

      const trashButton = document.createElement('button');
      trashButton.innerHTML = '<i class="fas fa-trash"></i>';
      trashButton.classList.add('trash-btn');
      todoDiv.appendChild(trashButton);

      todoList.appendChild(todoDiv);
      todoInput.value = '';
      newTodo.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }

  function deleteCheck(event) {
    const item = event.target;

    if (item.classList.contains('trash-btn')) {
      const todo = item.parentElement;
      todo.classList.add('slide');
      todo.addEventListener('transitionend', () => {
        todo.remove();
      });
    }

    if (item.classList.contains('complete-btn')) {
      const todo = item.parentElement;
      todo.classList.toggle('completed');
    }
  }

  function filterTodo() {
    const todos = todoList.childNodes;
    todos.forEach(todo => {
      switch (filterOption.value) {
        case 'all':
          todo.style.display = 'flex';
          break;
        case 'completed':
          if (todo.classList.contains('completed')) {
            todo.style.display = 'flex';
          } else {
            todo.style.display = 'none';
          }
          break;
        case 'incomplete':
          if (!todo.classList.contains('completed')) {
            todo.style.display = 'flex';
          } else {
            todo.style.display = 'none';
          }
          break;
          
      }
    });
  }
});