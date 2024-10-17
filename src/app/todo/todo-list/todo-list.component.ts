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
  todos$ = new Observable<Todo[]>();

  ngOnInit(): void {
    this.todos$ = this.todosService.todos$; 
    this.todos$.subscribe((todos) => {
      todos.forEach((todo) => {
        console.log(todo.title);
      });
    });
  }

  constructor(private readonly todosService: TodoService) {}

  updateTodo(todo: Todo) {
    this.todosService.updateTodo(todo);
  }


  newTodo(title: string) {
    this.todosService.addTodo(title);
    this.todos$ = this.todosService.GetTodos();
  }
  
}
