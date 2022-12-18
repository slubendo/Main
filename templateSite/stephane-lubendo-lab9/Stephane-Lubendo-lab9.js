const user = document.getElementById('username');
const pass = document.getElementById('password');
const form = document.getElementById('lab9form');

form.addEventListener('submit', event => {
    event.preventDefault()
    if (pass.value.length < 8) {
        window.alert(`password must have 8 characters`)
    } else {
       form.submit()
    }
})

