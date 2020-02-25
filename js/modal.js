class Modal{
    constructor(window,closeModal,type,text){
        this.window = window;
        this.closeModal = closeModal;
        this.buildModal(type,text)
    }
    buildModal = (type,text) => {
        console.log('building modal');
        const modal = document.createElement('div');
        modal.className = type;
        const row1 = document.createElement('div');
        row1.className = "row";
        const close = document.createElement('button');

        close.className = 'close-modal-button';
        close.textContent = "x"
        close.addEventListener('click',this.closeModal);
        row1.appendChild(close);
        modal.appendChild(row1);
        if(text){
            const span = document.createElement('span');
            span.textContent = text;
            modal.appendChild(span);
        }
        this.window.appendChild(modal);
    }
}