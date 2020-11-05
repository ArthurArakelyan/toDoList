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

/*
*** To Do
*/

const addTodo = document.querySelector('.addTodo');
const toDoDate = document.querySelector('.toDoDate');
const toDoNameAnim = document.querySelector('.toDoNameAnim');

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

        this.toDoComplete = this.toDoButtons.appendChild(document.createElement('label'));
        this.toDoComplete.classList.add('toDoComplete');

        this.toDoCheckbox = this.toDoComplete.appendChild(document.createElement('input'));
        this.toDoCheckbox.setAttribute('type', 'checkbox');
        this.toDoCheckbox.classList.add('toDoCheckbox');
        this.toDoCompleteChecked = false;

        this.toDoCheckmark = this.toDoComplete.appendChild(document.createElement('span'));
        this.toDoCheckmark.classList.add('toDoCheckmark');

        this.toDoDelete = this.toDoButtons.appendChild(document.createElement('button'));
        this.toDoDelete.innerHTML = 'Remove';
        this.toDoDelete.classList.add('toDoDelete', 'btn', 'btn-sm', 'btn-danger');

        this.toDoEdit = this.toDoButtons.appendChild(document.createElement('button'));
        this.toDoEdit.textContent = 'Edit';
        this.toDoEdit.classList.add('toDoEdit', 'btn', 'btn-sm', 'btn-primary');

        if(!this.toDoName.value.trim()) {
            this.toDo.remove();
        }

        this.toDoCheckbox.addEventListener('click', () => {       
            if(!this.toDoCompleteChecked) {
                this.toDoCheckbox.setAttribute('checked', 'true');
                this.toDoCompleteChecked = true;

                this.toDoWork.classList.add('toDoCompleted');
                this.toDoCreatedTime.innerHTML = `Completed: ${new Date().toLocaleTimeString()}`;
            } else {
                this.toDoCheckbox.removeAttribute('checked');
                this.toDoCompleteChecked = false;

                this.toDoWork.classList.remove('toDoCompleted');
            }

            this.toDoClone = this.toDo.cloneNode(true);

            if(this.toDoCompleteChecked) {
                this.toDoCompleteAlert = this.toDoAlertsBlock.appendChild(this.toDoClone);
                this.toDoCompleteAlert.classList.remove('toDo');
                this.toDoCompleteAlert.classList.add('completedToDo');
                this.toDoCompleteAlert.lastChild.remove();
            }
            
            this.toDoCompleteAlert.firstChild.firstChild.classList.remove('toDoCompleted');

            this.toDoAlertRemoving(this.toDoCompleteAlert);
        });

        this.toDoEdit.addEventListener('click', () => {
            document.body.classList.add('scrollLock');

            this.modal = this.createModal({
                title: 'Editing',
                width: '400px',
                content: `
                    <form class="toDoChangeGroup input-group input-group-sm mb-3 mt-1">
                        <input type="text" value="${this.toDoWork.textContent.trim()}" class="toDoWorkInput form-control" placeholder="Name..." aria-label="Name..." aria-describedby="button-addon2">
                        <div class="input-group-append">
                            <button class="confirmChange btn btn-outline-secondary">Change</button>
                        </div>
                    </form>
                    <div class="allColors">
                        <div class="colors">
                            <div class="colorsLines colorsLine1">
                                <div class="colorChange" data-colors="red"></div>
                                <div class="colorChange" data-colors="blue"></div>
                                <div class="colorChange" data-colors="yellow"></div>
                                <div class="colorChange" data-colors="green"></div>
                                <div class="colorChange" data-colors="lightgreen"></div>
                            </div>
                            <div class="colorsLines colorsLine2">
                                <div class="colorChange" data-colors="darkgreen"></div>
                                <div class="colorChange" data-colors="springgreen"></div>
                                <div class="colorChange" data-colors="orange"></div>
                                <div class="colorChange" data-colors="pink"></div>
                                <div class="colorChange" data-colors="cyan"></div>
                            </div>
                            <div class="colorsLines colorsLine3">
                                <div class="colorChange" data-colors="fuchsia"></div>
                                <div class="colorChange" data-colors="darkorchid"></div>
                                <div class="colorChange" data-colors="gray"></div>
                                <div class="colorChange" data-colors="white"></div>
                                <div class="colorChange" data-colors="black"></div>
                            </div>
                        </div>
                        <button class="randomColorBtn btn btn-outline-primary btn-block btn-sm">Random Color</button>
                    </div>
                `,
                closingFunction: this.modalClosing
            });

            this.allColorChanges = document.querySelectorAll('.colorChange');

            this.modalColor = this.modalColors();

            this.toDoChangeGroup = document.querySelector('.toDoChangeGroup');
            this.toDoWorkInput = document.querySelector('.toDoWorkInput');
            this.confirmChange = document.querySelector('.confirmChange');

            this.toDoChangeGroup.addEventListener('submit', (e) => {
                e.preventDefault();

                if(!this.toDoWorkInput.value.trim()) {
                    this.toDoWorkInput.classList.add('redPlaceholder');
                } else {
                    if(this.toDoWorkInput.value.trim() !== this.modalColor.firstChild.firstChild.textContent) {
                        this.toDoWorkInput.classList.remove('redPlaceholder');
                        this.modalColor.firstChild.firstChild.innerHTML = this.toDoWorkInput.value.trim();
                    } else {
                        return
                    }
                }
            });

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
                document.body.classList.remove('scrollLock');

                this.toDoWork.textContent = this.modalColor.firstChild.firstChild.textContent;
                this.toDoCreatedTime.innerHTML = `Edited: ${new Date().toLocaleTimeString()}`;

                setTimeout(() => {
                    this.modal.classList.remove('hide');
                    this.modal.remove();
                }, 300);

                if(getComputedStyle(this.modalToDo)['color'] === 'rgb(255, 255, 255)' 
                || getComputedStyle(this.modalToDo)['color'] === 'rgb(0, 0, 0)') {
                    this.toDo.style.color = 'inherit';
                } else {
                    this.toDo.style.color = getComputedStyle(this.modalToDo)['color'];
                }
            });

            setTimeout(() => {
                this.modal.classList.add('open');

                let time = 50;
                this.allColorChanges.forEach(color => {
                    time += 50;
    
                    setTimeout(() => {
                        color.style.opacity = 1;
                    }, time);
                });
            }, 10);
        });

        this.toDoDelete.addEventListener('click', () => {
            this.toDoRemovedClone = this.toDo.cloneNode(true);
            this.toDoRemoved = true;

            this.toDo.remove();
            this.toDoRemoveAlert = this.toDoAlertsBlock.appendChild(this.toDoRemovedClone);
            this.toDoRemoveAlert.classList.add('removedToDo');
            this.toDoRemoveAlert.lastChild.remove();
            this.toDoRemovedTime = this.toDoRemoveAlert.firstChild.lastChild.innerHTML = `Removed: ${new Date().toLocaleTimeString()}`;

            this.toDoRestablish = this.toDoRemoveAlert.appendChild(document.createElement('button'));
            this.toDoRestablish.innerHTML = 'Restablish';
            this.toDoRestablish.classList.add('restablishBtn', 'btn', 'btn-success');

            this.toDoRestablish.addEventListener('click', () => {
                this.toDoRemoved = false;
                this.toDoList.appendChild(this.toDo);
                this.toDo.firstChild.firstChild.lastChild.innerHTML = this.toDoRemovedTime;
                this.toDoRemoveAlert.remove();
            });

            this.toDoAlertRemoving(this.toDoRemoveAlert);
        });
    }

    createModal(options) {
        const DEFAULTH_WIDTH = '400px';
        this.modal = document.body.appendChild(document.createElement('div'));
        this.modal.classList.add('amodal');

        this.modal.addEventListener('click', event => {
            if(event.target.dataset.close) {
                options.closingFunction();
            }
        });

        this.modal.innerHTML = `
            <div class="modal__overlay" data-close="true">
                <div class="modal__content" style="width: ${options.width || DEFAULTH_WIDTH}">
                    <div class="modal__header">
                        <h5 class="modal__title modal-title">${options.title || 'Modal'}</h5>
                        <span class="modal__close close"><i class="fas fa-times" data-close="true"></i></span>
                    </div>
                    <div class="modal__body" style="color: ${options.color || 'black'};">
                        ${options.content || ''}
                    </div>
                    <div class="modal__footer">
                        ${options.footer || `
                            <button class="modal__ok mr-2 btn btn-success btn-sm">OK</button>
                            <button class="modal__closeBtn btn btn-danger btn-sm" data-close="true">Close</button>
                        `}
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
        this.modalToDo.classList.remove('editOpen');
        this.modalToDo.lastChild.remove();
        this.modalToDo.firstChild.firstChild.innerHTML = this.toDoWork.textContent;

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

    modalClosing = () => {
        this.modal.classList.remove('open');
        this.modal.classList.add('hide');
        document.body.classList.remove('scrollLock');
    
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

    if(toDoName.value.trim()) {
        new Todo();
    } else {
        return false;
    }

    toDoName.value = '';
});

const ToDo = new Todo();
ToDo.toDoTime();

window.addEventListener('load', () => {
    toDoNameAnim.style.animation = 'lineAnim 1s 0s ease-in-out';
});
