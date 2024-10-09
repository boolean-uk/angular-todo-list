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
  onlyCompleted = true;
  todos: Observable<Todo[]>
  toDisplay : Todo[] = []

  constructor(private readonly todoService: TodoService) 
  {
    this.todos = this.todoService.getTodos();
    this.changeDisplayed()
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  newTodo(title: string) {
    this.todoService.addTodo({
      id: 0,
      title: title,
      completed: false
    });
    this.todos = this.todoService.getTodos()
  }

  changeDisplayed(){

    this.onlyCompleted = !this.onlyCompleted;

    const weirdIntermediate = this.todos.subscribe((todoArray: Todo[]) => this.toDisplay = todoArray.filter(t => t.completed === this.onlyCompleted)  )
  }

}
