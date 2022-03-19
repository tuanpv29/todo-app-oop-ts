class todosApp {
    constructor() {
        this.onInit();
    }
    onInit() {
        this.getTasks();
        this.renderForm();
        this.renderList();
    }
    getTasks() {
        const data = localStorage.getItem('tasks');
        if (data) {
            this.tasks = JSON.parse(data);
        }
        else {
            this.tasks = [];
        }
    }
    renderList() {
        const list = document.querySelector('.list');
        list.innerHTML = '';
        this.tasks.forEach((item) => {
            const li = document.createElement('li');
            const text = item.title;
            const checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            checkbox.checked = item.isComplete;
            checkbox.addEventListener('change', (event) => {
                item.isComplete = event.target.checked;
                this.saveTasks(this.tasks);
            });
            const button = document.createElement('button');
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
    addTask(text) {
        const task = { title: text, isComplete: false };
        this.tasks.push(task);
        this.renderList();
        this.saveTasks(this.tasks);
    }
    renderForm() {
        const input = document.querySelector('.input');
        const button = document.querySelector('.button');
        button.addEventListener('click', () => {
            this.addTask(input.value);
            input.value = '';
        });
    }
    saveTasks(task) {
        localStorage.setItem('tasks', JSON.stringify(task));
    }
}
const todos = new todosApp();
export {};
