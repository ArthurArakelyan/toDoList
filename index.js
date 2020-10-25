const body = document.querySelector('body');
const changeTheme = document.querySelector('.changeTheme');
const toDoName = document.querySelector('.toDoName');

let localDarkMode = localStorage.getItem('theme');

changeTheme.addEventListener('click', () => {
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('darkMode');

        changeTheme.style.color = 'yellow';
        toDoName.style.color = 'white';
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('darkMode');

        changeTheme.style.color = 'black';
        toDoName.style.color = 'black';
        localStorage.setItem('theme', 'light');
    }
});

if (localDarkMode === 'dark') {
    document.body.classList.add('darkMode');

    changeTheme.style.color = 'yellow';
    toDoName.style.color = 'white';
} else {
    document.body.classList.remove('darkMode');

    changeTheme.style.color = 'black';
    toDoName.style.color = 'black';
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
const toDoDate = document.querySelector('.toDoDate');

class Todo {
    constructor() {
        this.toDo = this.toDoList.appendChild(document.createElement('div'));
        this.toDo.classList.add('toDo');
        
        this.toDoInfo = this.toDo.appendChild(document.createElement('div'));
        this.toDoInfo.classList.add('toDoInfo');

        this.toDoWork = this.toDoInfo.appendChild(document.createElement('h3'));
        this.toDoWork.innerHTML = this.toDoName.value;
        this.toDoWork.classList.add('toDoWork');

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
                this.toDoWork.classList.add('toDoCompleted');
                this.toDoCreatedTime.innerHTML = `Completed: ${new Date().toLocaleTimeString()}`;
                this.toDoComplete.innerHTML = 'No completed';
            } else {
                this.toDoWork.classList.remove('toDoCompleted');
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
                this.toDoCompleteAlert.firstChild.firstChild.innerHTML = this.toDoWorkFirstContent;
            }

            this.toDoAlertRemoving(this.toDoCompleteAlert);
        });

        this.toDoEdit.addEventListener('click', () => {
            this.toDoEdit.style.display = 'none';

            this.toDoWork.innerHTML = `<input type="text" value="${this.toDoWork.textContent.trim()}" class="toDoWorkInput">`;
            this.toDoConfirmEditing = this.toDoButtons.appendChild(document.createElement('button'));
            this.toDoConfirmEditing.innerHTML = 'Confirm';
            this.toDoConfirmEditing.classList.add('toDoConfirmEditing');
            this.toDoWorkInput = document.querySelector('.toDoWorkInput');
            this.toDoWorkInput.style.border = `2px ${getComputedStyle(this.toDo)['color']} solid`;

            this.toDoWorkFirstContent = this.toDoWorkInput.value;

            this.toDoChangeColor = this.toDoInfo.firstChild.appendChild(document.createElement('button'));
            this.toDoChangeColor.textContent = 'Color';
            this.toDoChangeColor.classList.add('toDoChangeColor');

            this.toDoChangeColor.addEventListener('click', () => {
                this.modal = this.createModal({
                    title: 'Change Colors',
                    width: '400px',
                    content: `
                        <div class="allColors">
                            <div class="colors">
                                <div class="colorsLines colorsLine1">
                                    <div class="colorChange" data-colors="red"></div>
                                    <div class="colorChange" data-colors="blue"></div>
                                    <div class="colorChange" data-colors="green"></div>
                                    <div class="colorChange" data-colors="darkgreen"></div>
                                    <div class="colorChange" data-colors="lightgreen"></div>
                                </div>
                                <div class="colorsLines colorsLine2">
                                    <div class="colorChange" data-colors="yellow"></div>
                                    <div class="colorChange" data-colors="darkorchid"></div>
                                    <div class="colorChange" data-colors="orange"></div>
                                    <div class="colorChange" data-colors="pink"></div>
                                    <div class="colorChange" data-colors="cyan"></div>
                                </div>
                                <div class="colorsLines colorsLine3">
                                    <div class="colorChange" data-colors="white"></div>
                                    <div class="colorChange" data-colors="springgreen"></div>
                                    <div class="colorChange" data-colors="gray"></div>
                                    <div class="colorChange" data-colors="fuchsia"></div>
                                    <div class="colorChange" data-colors="black"></div>
                                </div>
                                <button class="randomColorBtn">Random Color</button>
                            </div>
                        </div>
                    `,
                    closingFunction: this.modalColorsClosing
                });
    
                this.modalColor = this.modalColors();

                if(this.modalColor.style.color === 'inherit' && localStorage.getItem('theme') === 'dark') {
                    this.modalColor.style.color = 'white';
                } else if(this.modalColor.style.color === 'inherit' && localStorage.getItem('theme') === 'light') {
                    this.modalColor.style.color = 'black';
                }

                this.modalOk = document.querySelector('.modal__ok');
                this.randomColorBtn = document.querySelector('.randomColorBtn');
    
                this.randomColorBtn.addEventListener('click', () => {
                    this.randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    this.modalToDo.style.color = this.randomColor;
                });
    
                this.modalOk.addEventListener('click', () => {
                    this.modal.classList.remove('open');
                    this.modal.classList.add('hide');
    
                    this.toDoWork.innerHTML = this.toDoWorkFirstContent;
                    this.toDoConfirmEditing.remove();
                    this.toDoCreatedTime.innerHTML = `Edited Color: ${new Date().toLocaleTimeString()}`;
                    this.toDoEdit.style.display = 'block';

                    setTimeout(() => {
                        this.modal.classList.remove('hide');
                        this.modal.remove();
                    }, 200);
    
                    if(getComputedStyle(this.modalToDo)['color'] === 'rgb(255, 255, 255)' 
                    || getComputedStyle(this.modalToDo)['color'] === 'rgb(0, 0, 0)') {
                        this.toDo.style.color = 'inherit';
                    } else {
                        this.toDo.style.color = getComputedStyle(this.modalToDo)['color'];
                    }
                });

                setTimeout(() => {
                    this.modal.classList.add('open');
                }, 5);

                this.toDoWork.innerHTML = this.toDoWorkFirstContent;
            });

            this.toDoConfirmEditing.addEventListener('click', () => {
                if(this.toDoWorkInput.value === this.toDoWorkFirstContent) {
                    this.toDoWork.innerHTML = this.toDoWorkInput.value;
                    this.toDoConfirmEditing.remove();
                    this.toDoEdit.style.display = 'block';
                } else {
                    this.toDoWork.innerHTML = this.toDoWorkInput.value;
                    this.toDoConfirmEditing.remove();
                    this.toDoEdit.style.display = 'block';
                    this.toDoCreatedTime.innerHTML = `Edited: ${new Date().toLocaleTimeString()}`;
                }

                if(!this.toDoWorkInput.value.trim()) {
                    this.toDoWork.innerHTML = this.toDoWorkFirstContent;
                }
            });
        });

        this.toDoDelete.addEventListener('click', () => {
            this.toDoRemovedClone = this.toDo.cloneNode(true);

            this.toDo.remove();
            this.toDoRemoveAlert = this.toDoAlertsBlock.appendChild(this.toDoRemovedClone);
            this.toDoRemoveAlert.classList.add('removedToDo');
            this.toDoRemoveAlert.lastChild.remove();
            this.toDoRemovedTime = this.toDoRemoveAlert.firstChild.lastChild.innerHTML = `Removed: ${new Date().toLocaleTimeString()}`;

            this.toDoRestablish = this.toDoRemoveAlert.appendChild(document.createElement('button'));
            this.toDoRestablish.innerHTML = 'Restablish';
            this.toDoRestablish.classList.add('restablishBtn');

            this.toDoRestablish.addEventListener('click', () => {
                this.toDoList.appendChild(this.toDo);
                this.toDo.firstChild.lastChild.innerHTML = this.toDoRemovedTime;
                this.toDoRemoveAlert.remove();
            });

            if(this.toDoRemoveAlert.firstChild.firstChild.firstChild.tagName === 'INPUT') {
                this.toDoRemoveAlert.firstChild.firstChild.innerHTML = this.toDoWorkFirstContent;
            }

            this.toDoAlertRemoving(this.toDoRemoveAlert);
        });
    }

    createModal(options) {
        this.DEFAULTH_WIDTH = '400px';
        this.modal = document.body.appendChild(document.createElement('div'));
        this.modal.classList.add('modal');

        this.modal.addEventListener('click', event => {
            if(event.target.dataset.close) {
                options.closingFunction();
            }
        });

        this.modal.innerHTML = `
            <div class="modal__overlay" data-close="true">
                <div class="modal__content" style="width: ${options.width || this.DEFAULTH_WIDTH}">
                    <div class="modal__header">
                        <span class="modal__title">${options.title || 'Modal'}</span>
                        <span class="modal__close" data-close="true">&times;</span>
                    </div>
                    <div class="modal__body" style="color: ${options.color || 'black'};">
                        ${options.content || ''}
                    </div>
                    <div class="modal__footer">
                        <button class="modal__ok">OK</button>
                        <button class="modal__closeBtn" data-close="true">Close</button>
                    </div>
                </div>
            </div>
        `;

        return this.modal;
    }

    modalColors = () => {
        this.allColors = document.querySelector('.allColors');
        this.colorChange = document.querySelectorAll('.colorChange');

        this.modalBody = document.querySelector('.modal__body');
        this.modalToDo = this.modalBody.appendChild(this.toDo.cloneNode(true));
        this.modalToDo.classList.remove('toDo');
        this.modalToDo.classList.add('toDoColorChanging');
        this.modalToDo.lastChild.remove();
        this.modalToDo.firstChild.firstChild.innerHTML = this.toDoWorkFirstContent;

        if(getComputedStyle(document.body)['backgroundColor'] === 'rgb(32, 32, 32)') {
            this.modalToDo.classList.add('toDoColorChangingDark');
        } else {
            this.modalToDo.classList.remove('toDoColorChangingDark');
        }

        this.colorChange.forEach(elem => {
            elem.style.backgroundColor = elem.dataset.colors;
            elem.style.boxShadow = `0px 0px 10px 0px ${elem.dataset.colors}`;

            elem.addEventListener('click', () => {
                this.modalToDo.style.color = elem.dataset.colors;
            });
        });

        return this.modalToDo;
    }

    modalColorsClosing = () => {
        this.modal.classList.remove('open');
        this.modal.classList.add('hide');

        this.toDoWork.innerHTML = this.toDoWorkFirstContent;
        this.toDoConfirmEditing.remove();
        this.toDoEdit.style.display = 'block';
    
        setTimeout(() => {
            this.modal.classList.remove('hide');
            this.modal.remove();
        }, 200);
    }

    modalClosing = () => {
        this.modal.classList.remove('open');
        this.modal.classList.add('hide');
    
        setTimeout(() => {
            this.modal.classList.remove('hide');
            this.modal.remove();
        }, 200);
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

    toDoDate = document.querySelector('.toDoDate');
    toDoAlertsBlock = document.querySelector('.toDoAlertsBlock');
    toDoClock = document.querySelector('.toDoTime');
    toDoList = document.querySelector('.toDoList');
    toDoName = document.querySelector('.toDoName');
}

toDoDate.addEventListener('submit', (e) => {
    e.preventDefault();
    new Todo();
    toDoName.value = '';
});

const ToDo = new Todo();
ToDo.toDoTime();
