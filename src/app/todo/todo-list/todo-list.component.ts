import { Component, inject } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  TodoService = inject(TodoService);

  Todos: Observable<Todo[]> = this.TodoService.getAllTodos();  
  newTodo(newTitle: string) {
    console.log('New todo created:', newTitle);
    this.Todos = this.TodoService.getAllTodos(); 
  }

  updateTodo(updatedTodo: Todo) {
    this.TodoService.updateTodo(updatedTodo).subscribe({
      next: () => {
        this.Todos = this.TodoService.getAllTodos(); 
      },
      error: (err) => {
        console.error('Error updating todo:', err);
      },
    });
  }
}  
