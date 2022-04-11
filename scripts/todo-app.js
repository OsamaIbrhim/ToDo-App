'use strict'

let todos = getSavedTodos()

const filters = {
    searchText: '',
    hideCompleted: false
}
renderTodos(todos, filters)

document.querySelector('#search-text').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

document.querySelector('#new-todo').addEventListener('submit', function (e) {
    const text = e.target.elements.text.value.trim()
    e.preventDefault()
    if(text.length > 0){
        todos.push({
            id: uuidv4(),
            text,
            completed: false
        })
        saveTodos(todos)
        renderTodos(todos, filters)
        text= ''
    }
})

document.querySelector('#hide-completed').addEventListener('change', function (e) {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})