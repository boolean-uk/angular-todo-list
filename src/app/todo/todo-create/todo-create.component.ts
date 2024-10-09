import { Component, EventEmitter, inject, Output } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css'],
})
export class TodoCreateComponent {
  @Output('newTodo') newTodo = new EventEmitter<string>();
  todo: string = '';  

  TodoService = inject(TodoService);
  router = inject(Router);

  addTodo() {
    const newTodo: Todo = {
      id: 0,  
      title: this.todo,
      completed: false,
    };

    this.TodoService.addTodo(newTodo).subscribe({
      next: (todo) => {
        console.log('Todo added successfully:', todo);
        this.newTodo.emit(todo.title);  
        this.router.navigate(['/todo']);  
      },
      error: (err) => {
        console.error('Error adding Todo:', err);
      },
    });
  }
}
