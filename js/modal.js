class Modal{
    constructor(window,callback,type,text){
        this.window = window;
        this.callback = callback;
        this.buildModal(type,text)
    }
    buildModal = (type,text) => {
        console.log('building modal');
        const modal = document.createElement('div');
        modal.className = type === "message" ? type : "panel";
        const row1 = document.createElement('div');
        row1.className = "row";
        const close = document.createElement('button');

        close.className = 'close-modal-button';
        close.textContent = "x"
        close.addEventListener('click',()=>this.callback('close'));
        row1.appendChild(close);
        modal.appendChild(row1);
        if(text){
            const span = document.createElement('span');
            span.textContent = text;
            modal.appendChild(span);
        } else {
            const content = this.getContent(type);
            modal.appendChild(content);
        }
        this.window.appendChild(modal);
    }
    getContent = (type) => {
        const content = document.createElement('div');
        content.innerHTML = "CONTENT";
        return content
    }
}