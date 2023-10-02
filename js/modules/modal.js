

    let modal = document.querySelector('.modal');
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal(modalTimerId) {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        
        console.log(modalTimerId)
        if(modalTimerId) {
        clearInterval(modalTimerId); }
    }

    function modall(modalTimerId){
        const modalTrigger = document.querySelectorAll('[data-modal]');
                     

        modalTrigger.forEach(btn => {
            btn.addEventListener('click',()=> openModal(modalTimerId));
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.getAttribute('data-close') == "") {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.code === "Escape" && modal.classList.contains('show')) { 
                closeModal();
            }
        });

        
        // Изменили значение, чтобы не отвлекало

        function showModalByScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                openModal(modalTimerId);
                window.removeEventListener('scroll', showModalByScroll);
            }
        }
        window.addEventListener('scroll', showModalByScroll);

    }


export default modall;
export {openModal};
export {closeModal};

