function getCategories() {
    const url = 'https://opentdb.com/api_category.php'
    fetch(url)
        .then(res => res.json())
        .then(data => setCategories(data.trivia_categories))
}

function setCategories(arr) {
    arr.forEach(category => {
        const selectCategory = d.getElementById('select-category')
        selectCategory.innerHTML += `<option value="${category.id}">${category.name}</option>`
    })
}

getCategories()

function getQuestions() {
    const quizCount = d.getElementById('quiz-count').value,
        errorMsg = d.getElementById('error-message')

    let selectCategory = d.getElementById('select-category').value,
        selectDifficulty = d.getElementById('select-difficulty').value,
        selectType = d.getElementById('select-type').value

    selectCategory === 'any' ? selectCategory = '' : selectCategory
    selectDifficulty === 'any' ? selectDifficulty = '' : selectDifficulty
    selectType === 'any' ? selectType = '' : selectType

    fetch(`https://opentdb.com/api.php?amount=${quizCount}&category=${selectCategory}&difficulty=${selectDifficulty}&type=${selectType}`)
        .then(res => res.json())
        .then(data => {
            if (data.response_code === 1) {
                errorMsg.innerHTML = '🤔 insufficient questions for that selection'
                setTimeout(() => {
                    errorMsg.innerHTML = ''
                }, 3000)
            } else {
                saveQuiz(data)
            }
        })

}

const userID = ls.getItem('current-user-id')
let quizzes = JSON.parse(localStorage.getItem('quizs')) || []

function saveQuiz(quizs) {
    const name = d.getElementById('name').value
    let id = 1

    if (quizzes.length > 0) {
        id = quizzes[quizzes.length - 1].id + 1
    }

    const newQuiz = {
        id,
        name,
        quizs,
        userID,
        username
    }

    quizzes.push(newQuiz)
    showQuizList()
    ls.setItem('quizs', JSON.stringify(quizzes))
}

function showQuizList() {

    const quizzesList = document.getElementById('quizs-list'),
        quiz = quizzes.filter(quiz => quiz.userID === userID)

    if (quiz.length === 0) {
        quizzesList.innerHTML = 'There is not any quizzes'
    } else {
        let html = ''

        html += `<table>
            <tr>
            <th>id</th>
            <th>Name</th>
            <th>Options</th>
            </tr>`

        quiz.forEach(quiz => {
            html += `<tr>
                            <td>${quiz.id}</td>
                            <td>${quiz.name}</td>
                            <td>
                                <button onclick="deleteQuiz(${quiz.id})">
                                    Eliminar
                                </button>
                                <button onclick="editQuiz(${quiz.id})">
                                    Actualizar
                                </button>
                            </td>
                        </tr>`
        })

        html += `</tr>
            </table>`

        quizzesList.innerHTML = html
    }
}

function deleteQuiz(id) {
    const index = quizzes.findIndex(quiz => quiz.id == id)
    quizzes.splice(index, 1)

    showQuizList()
    ls.setItem('quizs', JSON.stringify(quizzes))
}

function editQuiz(id) {
    const quiz = quizzes.find(quiz => quiz.id === id)

    let categoryInput = [],
        difficultyInput = [],
        typeInput = []

    quiz.quizs.results.forEach(quiz => categoryInput.push(quiz.category))
    quiz.quizs.results.forEach(quiz => difficultyInput.push(quiz.difficulty))
    quiz.quizs.results.forEach(quiz => typeInput.push(quiz.type))

    let getCategory = [...new Set(categoryInput)],
        getDifficulty = [...new Set(difficultyInput)],
        getType = [...new Set(typeInput)]

    getCategory.length > 1 ? getCategory = 'any' : getCategory
    getDifficulty.length > 1 ? getDifficulty = 'any' : getDifficulty[0]
    getType.length > 1 ? getType = 'any' : getType[0]

    d.getElementById('name').value = quiz.name
    d.getElementById('quiz-count').value = quiz.quizs.results.length
    d.getElementById('select-category').value = getCategory
    d.getElementById('select-difficulty').value = getDifficulty
    d.getElementById('select-type').value = getType
}

function saveEdit() {

}

showQuizList()