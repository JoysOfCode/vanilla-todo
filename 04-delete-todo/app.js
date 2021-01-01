const inputEl = document.querySelector('[data-input]')
const todoListEl = document.querySelector('[data-todos]')

let todos = [
  {
    id: 1,
    todo: 'Refund Cyberpunk',
    completed: false,
  },
  {
    id: 2,
    todo: 'Pre-order KFConsole',
    completed: false,
  },
]

function updateUI() {
  inputEl.value = ''

  const todosHTML = `
    <ul>
      ${todos
        .map(({ id, todo }) => {
          return `
            <li class="todo" data-todo="${id}">
              <input class="todo-checkbox" type="checkbox">
              <label class="todo-label" data-todo-label>${todo}</label>

              <input class="todo-update" style="display: none" data-update-input />
              <button class="todo-update-toggle" data-update-btn>✏️</button>

              <button class="todo-delete" data-delete-btn>❌</button>
            </li>
          `
        })
        .join(' ')}
    </ul>
  `

  todoListEl.innerHTML = todosHTML

  todoListEl.onmouseover = ({ target }) => {
    const parentEl = target.closest('[data-todo]')

    if (!parentEl) return

    const todoId = +parentEl.dataset.todo

    const labelEl = parentEl.querySelector('[data-todo-label]')
    const inputEl = parentEl.querySelector('[data-update-input]')
    const btnUpdateEl = parentEl.querySelector('[data-update-btn]')
    const btnDeleteEl = parentEl.querySelector('[data-delete-btn]')

    btnUpdateEl.onclick = () => {
      labelEl.style.display = 'none'
      inputEl.style.display = 'inline'

      inputEl.focus()
    }

    btnDeleteEl.onclick = () => deleteTodo(todoId)

    inputEl.onkeyup = () => {
      labelEl.innerText = inputEl.value
    }

    inputEl.onblur = () => {
      labelEl.style.display = 'inline'
      inputEl.style.display = 'none'

      inputEl.value = ''

      const updatedTodos = updateTodo(todoId, inputEl.value)
      todos = updatedTodos
    }
  }
}

function addTodo() {
  if (!inputEl.value) return

  const todo = {
    id: todos.length + 1,
    todo: inputEl.value,
    completed: false,
  }

  todos.push(todo)

  updateUI()
}

function updateTodo(todoId, updatedTodoValue) {
  return todos.map((todo) => {
    if (todoId === todo.id) {
      return {
        ...todo,
        todo: updatedTodoValue,
      }
    }

    return {
      ...todo,
    }
  })
}

function deleteTodo(todoId) {
  const filteredTodos = todos.filter((todo) => todoId !== todo.id)
  todos = filteredTodos

  updateUI()
}

inputEl.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addTodo()
  }
})

updateUI()
