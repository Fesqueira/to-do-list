const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const message = document.getElementById('message');

// Carrega tarefas do localStorage ou cria array vazio
let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

// Salva tarefas no localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Renderização de tarefas
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((t, idx) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const deleteBtn = document.createElement('button');

    span.textContent = t.text;
    deleteBtn.textContent = 'Excluir';
    deleteBtn.classList.add('delete-btn');

    if (t.done) li.classList.add('completed');

    // Marcar tarefa como finalizada
    span.addEventListener('click', () => {
      t.done = !t.done;
      saveTasks();
      renderTasks();
    });

    // Excluir tarefa
    deleteBtn.addEventListener('click', () => {
      tasks.splice(idx, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}
// Adicionar nova tarefa

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') {
    message.textContent = 'Digite uma tarefa antes de adicionar!';
    message.style.display = 'block';
    return;
  } else {
    message.style.display = 'none';
  }

  tasks.push({ text: taskText, done: false });
  saveTasks();
  renderTasks();
  taskInput.value = '';
  taskInput.focus();
}

// Adicionar tarefas (Corrigido para funcionar com Enter)

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

// Inicializa a lista de tarefas
renderTasks();
