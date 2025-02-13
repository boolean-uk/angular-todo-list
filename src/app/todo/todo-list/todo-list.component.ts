import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { filter, map, Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  todos$ = new Observable<Todo[]>();

  @Input('checkbox') checkbox: boolean = false;

  ngOnInit(): void {
    this.todos$ = this.todosService.GetTodos(); 
    this.todos$.subscribe((todos) => {
      todos.forEach((todo) => {
        console.log(todo.title);
      });
    });
    this.getFilteredTodos()
  }

  constructor(private readonly todosService: TodoService) {}

  updateTodo(todo: Todo) {
    this.todosService.updateTodo(todo);
  }

  newTodo(title: string) {
    this.todosService.addTodo(title);
    this.getFilteredTodos();
  }

  toggleTaskList() {
    this.checkbox = !this.checkbox;
    if(!this.checkbox){
      this.todos$ = this.todos$.pipe(map(todos => {
        return todos.filter(todo => todo.completed)
      }))
      return;
    }
    this.todos$ = this.todosService.GetTodos();
  }
  
  getFilteredTodos() {
    if(!this.checkbox){
      this.todos$ = this.todos$.pipe(map(todos => {
        return todos.filter(todo => todo.completed)
      }))
      return;
    }
    this.todos$ = this.todosService.GetTodos();
  }
}
