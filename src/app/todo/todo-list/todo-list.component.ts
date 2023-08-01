import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos$: Observable<Todo[]> = of([]);

  constructor(private readonly todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos(); 
  }

  loadTodos() {
    this.todos$ = this.todoService.getTodos();
  }

  async newTodo(title: string) {
    try {
      await this.todoService.addTodo(title).toPromise();
      this.loadTodos(); 
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe(
      () => console.log('Todo updated successfully'),
      (error) => console.error('Error updating todo:', error)
    );
  }
}