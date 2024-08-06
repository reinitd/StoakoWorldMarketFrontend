export interface ModalOptions {
    title: string;
    content: string;
}

export function showModal({ title, content }: ModalOptions) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.onclick = closeModal;

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.onclick = (event) => event.stopPropagation();

    const closeButton = document.createElement('span');
    closeButton.className = 'close';
    closeButton.innerHTML = '&times;';
    closeButton.onclick = closeModal;

    const modalTitle = document.createElement('h2');
    modalTitle.textContent = title;

    const modalParagraph = document.createElement('p');
    modalParagraph.innerHTML = content;

    modalContent.appendChild(closeButton);
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalParagraph);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);

    function closeModal() {
        modal.remove();
    }
}
