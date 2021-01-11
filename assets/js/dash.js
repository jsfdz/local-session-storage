const d = document,
    w = window,
    ls = localStorage,
    isConnected = ls.getItem('connected')

if (!isConnected) {
    w.location.href = '/login.html'
}

const username = ls.getItem('current-user')
d.getElementById('username').textContent = username

const logout = d.getElementById('logout')
logout.addEventListener('click', () => {
    ls.removeItem('current-user')
    ls.removeItem('connected')
    w.location.replace('/index.html')
})