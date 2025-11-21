import { PokerGame } from './poker.js'; 

export class Tasks {
    constructor(spinSystem) {
        this.spinSystem = spinSystem;
        this.modal = document.getElementById('tasks-modal');
        this.grid = document.getElementById('tasks-grid');
        this.btn = document.getElementById('get-spins-btn');
        this.close = document.querySelector('#tasks-modal .close-modal');
        
        this.totalTasks = 10;
        this.tasksState = new Array(10).fill(false);
        
        this.pokerGame = new PokerGame(() => this.completeTask(0)); 

        this.init();
    }

    init() {
        this.btn.addEventListener('click', () => this.modal.classList.remove('hidden'));
        this.close.addEventListener('click', () => this.modal.classList.add('hidden'));
        this.render();
    }

    render() {
        this.grid.innerHTML = '';
        for (let i = 0; i < this.totalTasks; i++) {
            const btn = document.createElement('button');
            btn.className = 'task-btn';
            
            if (this.tasksState[i]) {
                btn.innerText = `Задание ${i + 1}\n(Выполнено)`;
                btn.classList.add('done');
                btn.disabled = true;
            } else {
                btn.innerText = `Задание ${i + 1}`;
                
                btn.onclick = () => this.startTask(i);
            }
            this.grid.appendChild(btn);
        }
    }

    startTask(index) {
        if (index === 0) {
            this.modal.classList.add('hidden'); 
            this.pokerGame.open(); 
            return;
        }

        alert(`Интерактив для Задания ${index + 1} (в разработке)`);
        const success = confirm("Ты справился?");
        if (success) {
            this.completeTask(index);
        }
    }

    completeTask(index) {
        this.tasksState[index] = true;
        this.spinSystem.addSpins(1);
        this.render();
        alert("Задание выполнено! +1 Спин 🌀");
    }
}