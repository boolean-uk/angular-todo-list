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

  constructor(private readonly todoService: TodoService) {}

  ngOnInit() {
    this.todos = this.todoService.todos
    console.log(this.todos)
  }


 async newTodo(title: string) {
  const res = await this.todoService.addTodo(title);
  console.log(res)
  this.todos = this.todoService.todos;
}


  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }


  
}
