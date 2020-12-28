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
            </li>
          `
        })
        .join(' ')}
    </ul>
  `

  todoListEl.innerHTML = todosHTML
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

inputEl.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addTodo()
  }
})

updateUI()
