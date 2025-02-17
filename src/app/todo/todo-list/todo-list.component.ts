import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent  {
  
  todos = this.todoService.getTodos()

  constructor(private readonly todoService: TodoService) {}
  

  updateTodo(todo: Todo): void {
    this.todoService.updateTodo(todo).subscribe(() => {
      this.todos = this.todoService.getTodos()
    });
  }

  newTodo(title: string) {
  this.todoService.addTodo(title).subscribe(() => {
    this.todos = this.todoService.getTodos()
  });
  }


  // toggleDisplay(): void {
  //   this.showCompleted = !this.showCompleted

  
}
