import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = []
  defaultView = true;
  
  constructor(private readonly todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getTodos().subscribe((data) => {
      this.todos = data;
      console.log(data);
    })
  }

  addToDoTitle : string = '';

  newTodo(title: string) {
    this.todoService.addTodo(title).subscribe((newTodo) => {
      this.todos.push(newTodo);
      this.addToDoTitle = '';
    });
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe((updatedTodo) => {
      const index = this.todos.findIndex((t) => t.id === updatedTodo.id);
      if (index !== -1) {
        this.todos[index] = updatedTodo;
      }
    });
  }

  toggleView() {
    this.defaultView = !this.defaultView;
  }
}
