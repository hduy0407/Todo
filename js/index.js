const BACK_ROOT_URL = 'https://todo-l07n.onrender.com'
import { Todos } from "./class/Todos.js";

const todos = new Todos(BACK_ROOT_URL)

const list = document.querySelector('ul');
const input = document.querySelector('input');

input.disabled = true

const renderTask = (task) => {
    const li = document.createElement('li')
    li.setAttribute('class','list-group-item')
    li.setAttribute('data-key',task.getId().toString())
    //li.innerHTML = task.getText()
    renderSpan(li, task.getText())
    renderLink(li, task.getId())
    list.append(li)
}

const renderSpan = (li, text) => {
    const span = li.appendChild(document.createElement('span'))
    span.innerHTML = text
}

const renderLink = (li, id) => {
    const a = li.appendChild(document.createElement('a'))
    a.innerHTML = '<i class="bi bi-trash"></i>'
    a.setAttribute('style', 'float: right; cursor: pointer;')
    a.addEventListener('click',(event) => {
        todos.removeTask(id).then((removed_id) => {
            const li_to_move = document.querySelector(`[data-key='${removed_id}']`)
            if (li_to_move) {
                list.removeChild(li_to_move)
            }
        }).catch((error) => {
            alert(error)
        })
    })
}

const getTasks = async () => {
    todos.getTasks().then((tasks) => {
        tasks.forEach(task => {
            renderTask(task)
        });
        input.disabled = false
    }) .catch((error) => {
        alert(error)
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
            todos.addTask(task).then((task) => {
                renderTask(task)
                input.value = ''
                input.focus()
            })
            
        }
    }
})

getTasks()