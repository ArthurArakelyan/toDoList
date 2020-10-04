const body = document.querySelector('body');
const changeTheme = document.querySelector('.changeTheme');

let localDarkMode = localStorage.getItem('theme');

changeTheme.addEventListener('click', () => {
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('darkMode');

        changeTheme.style.color = 'yellow';
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('darkMode');

        changeTheme.style.color = 'black';
        localStorage.setItem('theme', 'light');
    }
});

if (localDarkMode === 'dark') {
    document.body.classList.add('darkMode');

    changeTheme.style.color = 'yellow';

} else {
    document.body.classList.remove('darkMode');

    changeTheme.style.color = 'black';
}

const incrementDecrementNumber = document.querySelector('.incrementDecrementNumber');
const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const defaultBtn = document.querySelector('.defaultBtn');

plus.addEventListener('click', () => {
    +incrementDecrementNumber.textContent++;


    localStorage.setItem('number', incrementDecrementNumber.textContent);

    if(localStorage.getItem('number') <= 0) {
        incrementDecrementNumber.style.color = 'red';

        localStorage.setItem('color', 'red');
    } else if(localStorage.getItem('number') > 0) {
        incrementDecrementNumber.style.color = 'green';

        localStorage.setItem('color', 'green');
    }
});

minus.addEventListener('click', () => {
    +incrementDecrementNumber.textContent--;

    localStorage.setItem('number', incrementDecrementNumber.textContent);

    if(localStorage.getItem('number') <= 0) {
        incrementDecrementNumber.style.color = 'red';

        localStorage.setItem('color', 'red');
    } else if(localStorage.getItem('number') > 0) {
        incrementDecrementNumber.style.color = 'green';

        localStorage.setItem('color', 'green');
    }
});

if(localStorage.getItem('color') === 'red') {
    incrementDecrementNumber.style.color = 'red';
} else if(localStorage.getItem('color') === 'green') {
    incrementDecrementNumber.style.color = 'green';
}

incrementDecrementNumber.textContent = localStorage.getItem('number');

defaultBtn.addEventListener('click', () => {
    incrementDecrementNumber.textContent = 0;
    localStorage.setItem('number', 0);
});


const addTodo = document.querySelector('.addTodo');
const toDoName = document.querySelector('.toDoName');

class Todo {
    constructor() {
        this.toDo = this.toDoList.appendChild(document.createElement('div'));
        this.toDo.classList.add('toDo');
        
        this.toDoInfo = this.toDo.appendChild(document.createElement('div'));
        this.toDoInfo.classList.add('toDoInfo');

        this.toDoh3 = this.toDoInfo.appendChild(document.createElement('h3'));
        this.toDoh3.innerHTML = `${this.toDoName.value}`;
        this.toDoh3.classList.add('toDoh3');

        this.toDoCreatedTime = this.toDoInfo.appendChild(document.createElement('p'));
        this.toDoCreatedTime.innerHTML = `Created: ${new Date().toLocaleTimeString()}`;
        this.toDoCreatedTime.classList.add('toDoCreatedTime');

        this.toDoButtons = this.toDo.appendChild(document.createElement('div'));
        this.toDoButtons.classList.add('toDoButtons');

        this.toDoComplete = this.toDoButtons.appendChild(document.createElement('button'));
        this.toDoComplete.innerHTML = 'Completed';
        this.toDoComplete.classList.add('toDoConfirm');
        
        this.toDoDelete = this.toDoButtons.appendChild(document.createElement('button'));
        this.toDoDelete.innerHTML = 'Remove';
        this.toDoDelete.classList.add('toDoDelete');

        this.toDoEdit = this.toDoButtons.appendChild(document.createElement('button'));
        this.toDoEdit.innerHTML = 'Edit';
        this.toDoEdit.classList.add('toDoEdit');

        if(!this.toDoName.value.trim()) {
            this.toDo.remove();
        }

        this.toDoComplete.addEventListener('click', () => {
            if(this.toDoComplete.textContent === 'Completed') {
                this.toDoh3.classList.add('toDoCompleted');
                this.toDoCreatedTime.innerHTML = `Completed: ${new Date().toLocaleTimeString()}`;
                this.toDoComplete.innerHTML = 'No completed';
            } else {
                this.toDoh3.classList.remove('toDoCompleted');
                this.toDoComplete.innerHTML = 'Completed';
            }

            this.toDoClone = this.toDo.cloneNode(true);

            if(this.toDoComplete.textContent === 'No completed') {
                this.toDoCompleteAlert = this.toDoAlertsBlock.appendChild(this.toDoClone);
                this.toDoCompleteAlert.classList.remove('toDo');
                this.toDoCompleteAlert.classList.add('completedToDo');
                this.toDoCompleteAlert.lastChild.remove();
            }
            
            this.toDoCompleteAlert.firstChild.firstChild.classList.remove('toDoCompleted');
            
            if(this.toDoCompleteAlert.firstChild.firstChild.firstChild.tagName === 'INPUT') {
                this.toDoCompleteAlert.firstChild.firstChild.innerHTML = this.toDoh3FirstContent;
            }

            this.toDoAlertRemoving(this.toDoCompleteAlert);
        });

        this.toDoEdit.addEventListener('click', () => {
            this.toDoEdit.style.display = 'none';

            this.toDoh3.innerHTML = `<input type="text" value="${this.toDoh3.textContent.trim()}" class="toDoh3Input">`;
            this.toDoConfirmEditing = this.toDoButtons.appendChild(document.createElement('button'));
            this.toDoConfirmEditing.innerHTML = 'Confirm';
            this.toDoConfirmEditing.classList.add('toDoConfirmEditing');
            this.toDoh3Input = document.querySelector('.toDoh3Input');

            this.toDoh3FirstContent = this.toDoh3Input.value;

            this.toDoConfirmEditing.addEventListener('click', () => {
                this.toDoh3.innerHTML = `${this.toDoh3Input.value}`;
                this.toDoConfirmEditing.remove();
                this.toDoCreatedTime.innerHTML = `Edited: ${new Date().toLocaleTimeString()}`;
                this.toDoEdit.style.display = 'block';

                if(!this.toDoh3Input.value.trim()) {
                    this.toDoh3.innerHTML = this.toDoh3FirstContent;
                }
            });
        });

        this.toDoDelete.addEventListener('click', () => {
            this.toDo.remove();
            this.ToDoRemoveAlert = this.toDoAlertsBlock.appendChild(this.toDo);
            this.ToDoRemoveAlert.classList.remove('toDo');
            this.ToDoRemoveAlert.classList.add('removedToDo');
            this.ToDoRemoveAlert.lastChild.remove();
            this.ToDoRemoveAlert.firstChild.lastChild.innerHTML = `Removed: ${new Date().toLocaleTimeString()}`;

            if(this.ToDoRemoveAlert.firstChild.firstChild.firstChild.tagName === 'INPUT') {
                this.toDoh3.innerHTML = this.toDoh3FirstContent;
            }
            
            this.toDoAlertRemoving(this.ToDoRemoveAlert);
        });
    }

    toDoAlertRemoving(alert) {
        setTimeout(() => {
            alert.style.opacity = 0;
        }, 3000);
        setTimeout(() => {
            alert.remove();
        }, 5000); 
    }

    toDoTime() {
        this.time = this.toDoClock.appendChild(document.createElement('p'));
        this.time.classList.add('time');
        this.time.textContent = new Date().toLocaleTimeString();
        
        setInterval(() => {
            return this.time.textContent = new Date().toLocaleTimeString();
        }, 1000);
    }

    toDoAlertsBlock = document.querySelector('.toDoAlertsBlock');
    toDoClock = document.querySelector('.toDoTime');
    toDoList = document.querySelector('.toDoList');
    toDoName = document.querySelector('.toDoName');
}

addTodo.addEventListener('click', () => {
    new Todo();
    toDoName.value = '';
});

const ToDo = new Todo();
ToDo.toDoTime();