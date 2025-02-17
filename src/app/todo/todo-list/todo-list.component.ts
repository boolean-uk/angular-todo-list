import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { TodoItemComponent } from "../todo-item/todo-item.component";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  standalone: false
})
export class TodoListComponent implements OnInit {
  constructor(private readonly todoService: TodoService) {}
  todos : Todo[]= [];

  ngOnInit(): void {
    this.todoService.todos.subscribe(t => this.todos=t)
  }




  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  async newTodo(title: string) {
    this.todoService.addTodo(title);
    //this.todos = this.todoService.todos;
  }
}
