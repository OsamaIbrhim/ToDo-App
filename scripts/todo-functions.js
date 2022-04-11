'use strict'

// Fetch existing todos from localStorage
const getSavedTodos = function () {
    const todosJSON = localStorage.getItem('todos')

    try{
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
        return []
    }


}

// Save todos to localStorage
const saveTodos = function (todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Render application todos based on filters
const renderTodos = function (todos, filters) {
    const todoEl = document.querySelector('#todos')
    const filteredTodos = todos.filter(function (todo) {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)

    todoEl.innerHTML = ''
    todoEl.appendChild(generateSummaryDOM(incompleteTodos))
    
    if(filteredTodos.length > 0){
            filteredTodos.forEach(function (todo) {
                todoEl.appendChild(generateTodoDOM(todo))
            })
    }else{
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'U have no to-dos to show it !..'
        todoEl.appendChild(messageEl)
    }

}

//remove a todo from the list
const removeTodo = function(id){
    const todoIndex = todos.findIndex(function(todo){
        return todo.id == id
    })
    if(todoIndex > -1){
        todos.splice(todoIndex,1)
    }

}
// To find todo id
const findTodo = function(id){
    const todo = todos.find(function(todo){
        return todo.id == id
    })
    if(todo)
        todo.completed = !todo.completed
}

// Get the DOM elements for an individual note
const generateTodoDOM = function (todo) {
    const todoEl = document.createElement('lable')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')

    // Setup todo checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change',function(){
        findTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos , filter)
    })
    
    // Setup the todo text
    todoText.textContent = todo.text
    containerEl.appendChild(todoText)
    
    //setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    // Setup the remove button
    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton)

    //remov todo from the list
    removeButton.addEventListener('click',function(){
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos,filters)
    })



    return todoEl
}

// Get the DOM elements for list summary
const generateSummaryDOM = function (incompleteTodos) {
    const summary = document.createElement('h2')
    if(incompleteTodos.length === 1){
        summary.textContent = `You have ${incompleteTodos.length} todo left`
    }else{
        summary.textContent = `You have ${incompleteTodos.length} todos left`
    }
    summary.classList.add('list-title')
    return summary
}