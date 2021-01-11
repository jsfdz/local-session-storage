const d = document,
    w = window,
    ls = localStorage

const users = JSON.parse(ls.getItem('users-db')) || [],
    isConnected = ls.getItem('connected')

if (isConnected) {
    w.location.href = '/dashboard.html'
}

function createUser() {
    const name = d.getElementById('name').value,
        email = d.getElementById('email').value,
        password = d.getElementById('pass').value

    let id = 1

    if (users.length > 0) id = users[users.length - 1].id + 1

    const user = {
        id,
        name,
        email,
        password
    }

    users.push(user)
    ls.setItem('users-db', JSON.stringify(users))
    w.location.replace('/login.html')
}

function login() {
    const email = d.getElementById('email').value,
        password = d.getElementById('pass').value,
        user = users.find(user => user.email === email && user.password === password)

    if (user) {
        ls.setItem('connected', true)
        ls.setItem('current-user', user.name)
        ls.setItem('current-user-id', user.id)
        w.location.replace('/dashboard.html')
    } else {
        alert('invalid user or password')
    }
}