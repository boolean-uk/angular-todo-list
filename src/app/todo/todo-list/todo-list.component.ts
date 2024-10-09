import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  constructor(private readonly todoService: TodoService) {}

  todos!: Observable<Todo[]>; 

  ngOnInit(): void {
    this.loadTodos(); 
  }

  loadTodos(): void {
    this.todos = this.todoService.getTodos(); 
  }

  async newTodo(title: string): Promise<void> {
    await this.todoService.addTodo(title); 
    this.loadTodos(); 
  }

  updateTodo(updatedTodo: Todo): void {
    this.todoService.updateTodo(updatedTodo).subscribe(() => {
      this.loadTodos(); 
    });
  }
}
