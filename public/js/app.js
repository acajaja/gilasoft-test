document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.getElementsByClassName('user-button');
    const showUserInfo = e => {
        const id = e.target.dataset.id;
        e.preventDefault();

        const user = document.getElementById(id);
        user.classList.toggle('hide');

        e.target.innerText = user.classList.contains('hide') ? 'show' : 'hide';
    }

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', showUserInfo);
    }
})
