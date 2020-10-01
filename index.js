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

        if(!toDoName.value.trim()) {
            this.toDo.remove();
        }

        this.toDoComplete.addEventListener('click', () => {
            this.toDoh3.classList.toggle('toDoCompleted');
            this.toDoCreatedTime.innerHTML = `Completed: ${new Date().toLocaleTimeString()}`;
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
        });
    }

    toDoh3Input = document.querySelector('.toDoh3Input');
    toDoList = document.querySelector('.toDoList');
    toDoName = document.querySelector('.toDoName');
}

addTodo.addEventListener('click', () => {
    new Todo();
    toDoName.value = '';
});

const time = document.querySelector('.time');
time.textContent = new Date().toLocaleTimeString();

setInterval(() => {
    const date = new Date().toLocaleTimeString();
    time.textContent = date;
}, 1000);