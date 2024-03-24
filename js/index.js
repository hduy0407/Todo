const BACK_ROOT_URL = 'http://localhost:3001'
import { Todos } from "./class/Todos.js";

const todos = new Todos(BACK_ROOT_URL)

const list = document.querySelector('ul');
const input = document.querySelector('input');

input.disabled = true

const renderTask = (task) => {
    const li = document.createElement('li')
    li.setAttribute('class','list-group-item')
    li.innerHTML = task.getText()
    list.append(li)
}

const getTasks = async () => {
    todos.getTasks().then((tasks) => {
        tasks
    })
}

const saveTask = async (task) => {
    try {
        const json = JSON.stringify({description: task})
        const response = await fetch(BACK_ROOT_URL + '/new',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        })
        return response.json()
    } catch (error) {
        alert("Error saving task" + error.message)
    }
}

input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault()
        const task = input.value.trim()
        if (task !== '') {
            saveTask(task).then((json) => {
                renderTask(task)
                input.value = ''
            })
            
        }
    }
})

getTasks()