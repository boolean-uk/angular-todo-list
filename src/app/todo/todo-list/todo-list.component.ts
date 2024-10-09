import { Component, inject } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {

  todoService = inject(TodoService)

  todos$: Observable<Todo[]> = this.todoService.getAllTasks()

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe()
    this.todoService.getAllTasks().pipe(tap(data => {console.log("inside pipe.", data)})).subscribe()
  }

  public newTodo(title: string) {
    this.todoService.addTodo(title).subscribe()
    this.todos$ = this.todoService.getAllTasks()
  }

  public toggleCompeted(){
    this.todoService.toggleHideCompleted()
  }
}
