import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: any;

  showCompleted = false; // New property to track the visibility of completed todos

  constructor(private readonly todoService: TodoService) {}

  ngOnInit() {
    this.todos = this.todoService.todos.then((res) => res.filter(todo => todo.completed === false))
  }

 async newTodo(title: string) {
  await this.todoService.addTodo(title);
  this.filterList()
}

  async updateTodo(todo: Todo) {
    await this.todoService.updateTodo(todo);
    this.filterList()
  }

  toggleCompleted() {
    this.showCompleted = !this.showCompleted; // Toggle the visibility of completed todos
    console.log(this.showCompleted)
    this.filterList()
 }

 filterList(){
  if (!this.showCompleted){
    this.todos = this.todoService.todos.then((res) => res.filter(todo => todo.completed === false))
    
  } else {
    this.todos = this.todoService.todos.then((res) => res.filter(todo => todo.completed === true))
  }
 }

}


