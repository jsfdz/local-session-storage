const d = document,
    ls = localStorage,
    isConnected = ls.getItem('connected'),

    login = d.querySelector('#nav-menu a:nth-child(1)'),
    register = d.querySelector('#nav-menu a:nth-child(2)'),
    dashboard = d.querySelector('#nav-menu a:last-child')

if (isConnected) {
    login.remove()
    register.remove()
} else {
    dashboard.remove()
}

const users = JSON.parse(ls.getItem('users-db')),
    countUsers = d.getElementById('count-users'),
    userList = d.getElementById('user-list')

if (!users) {
    countUsers.innerHTML = 'no registered users'
} else {
    countUsers.innerHTML = users.length

    let html = ''

    html += `<table>
         <tr>
         <th>id</th>
         <th>Name</th>
         </tr>`

    users.forEach(user => {
        html += `<tr>
             <td>${user.id}</td>
             <td>${user.name}</td>
             </tr>`
    })

    html += `</tr>
         </table>`

    userList.innerHTML = html
}