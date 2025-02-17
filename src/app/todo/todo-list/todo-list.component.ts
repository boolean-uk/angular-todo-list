import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit{
  todos$ = new Observable<Todo[]>();
  constructor(private readonly todoService: TodoService) {
    console.log('url:', `${environment.apiUrl}`);
  }
  ngOnInit(): void {
    this.todos$ = this.todoService.getTodos();
    this.todos$.subscribe((todos) => {
      todos.forEach((todos) => {
        console.log(todos.title);
      });
    });
  }

  

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
    

  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.todos$ = await this.todoService.getTodos();
  }
}
