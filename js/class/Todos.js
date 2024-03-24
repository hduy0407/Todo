import { resolve } from "path"
import {Task} from "./Task.js"
import { response } from "express"
import { json } from "body-parser"
import { error } from "console"

class Todos {
    #tasks = []
    #backend_url = ''

    constructor(url) {
        this.#backend_url = url
    }

    getTasks = () => {
        return new Promise(async(resolve, reject) => {
            fetch(this.#backend_url)
            .then((response) => response.json())
            .then((json) => {
                this.#readJson(json)
                resolve(this.#tasks)
            }, (error) => {
                reject(error)
            })
        })
    }

    #readJson = (taskAsJson) => {
        taskAsJson.forEach(node => {
            const task = new Task(node.id, node.description)
            this.#tasks.push(task)
        });
    }
} 

export {Todos}