export class DragAndDrop {
    constructor() {
    }

    handleDragStart(e) {
        e.currentTarget.style.opacity = '0.4';

        this.dragSrcEl = e.currentTarget;

        console.log('handleDragStart e.currentTarget-->>', e.currentTarget);
        console.log('handleDragStart this.dragSrcEl-->>', this.dragSrcEl);

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', e.currentTarget.innerHTML);
    }

    handleDragEnd(e) {
        e.target.style.opacity = '1';

        const cards = document.querySelectorAll('.card-container');

        cards.forEach(function (item) {
            item.classList.remove('over');
        })

    }

    handleDragOver(e) {
        e.preventDefault();
    }

    handleEnter(e) {
        e.currentTarget.classList.add('over');
    }

    handleLeave(e) {
        e.currentTarget.classList.remove('over');
    }

    handleDrop(e) {
        e.stopPropagation();
        console.log('handleDrop this.dragSrcEl-->>', this.dragSrcEl);
        console.log('handleDrop e.currentTarget-->>', e.currentTarget);

        if (this.dragSrcEl !== e.currentTarget) {
            const dragElId = this.dragSrcEl.getAttribute('id');
            const currentElId = e.currentTarget.getAttribute('id');

            this.dragSrcEl.innerHTML = e.currentTarget.innerHTML;
            e.currentTarget.innerHTML = e.dataTransfer.getData('text/html');

            this.dragSrcEl.setAttribute('id', currentElId);
            e.currentTarget.setAttribute('id', dragElId);
        }
        return false
    }

}

