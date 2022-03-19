import {Task} from './models/task.js';

class todosApp {
  tasks: Task[];

  constructor() {
    this.onInit();
  }

  onInit(): void {
    this.getTasks();
    this.renderForm();
    this.renderList();
  }

  getTasks() {
    const data = localStorage.getItem('tasks');
    if (data) {
      this.tasks = JSON.parse(data);
    } else {
      this.tasks = [];
    }
  }

  renderList() {
    const list: HTMLUListElement = document.querySelector('.list');
    list.innerHTML = '';
    this.tasks.forEach((item) => {
      const li: HTMLLIElement = document.createElement('li');
      const text: string = item.title;
      const checkbox: HTMLInputElement = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.checked = item.isComplete;
      checkbox.addEventListener('change', (event: Event) => {
        item.isComplete = (event.target as HTMLInputElement).checked;
        this.saveTasks(this.tasks);
      });
      const button: HTMLElement = document.createElement('button');
      button.innerHTML = '&times;';
      button.addEventListener('click', () => {
        this.tasks = this.tasks.filter((task) => task.title !== item.title);
        this.renderList();
        this.saveTasks(this.tasks);
      });
      li.appendChild(checkbox);
      li.append(text);
      li.appendChild(button);
      list.appendChild(li);
    });
  }

  addTask(text: string) {
    const task: Task = { title: text, isComplete: false };
    this.tasks.push(task);
    this.renderList();
    this.saveTasks(this.tasks);
  }

  renderForm() {
    const input: HTMLInputElement = document.querySelector('.input');
    const button: HTMLElement = document.querySelector('.button');
    button.addEventListener('click', () => {
      this.addTask(input.value);
      input.value = '';
    });
  }

  saveTasks(task: Task[]) {
    localStorage.setItem('tasks', JSON.stringify(task));
  }
}

const todos = new todosApp();