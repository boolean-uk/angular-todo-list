import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  todos$ = this.todoService.getTodos();
  status: string = 'Show Complete';
  constructor(private readonly todoService: TodoService) {}

  handleButtonClick(): void{
    if (this.status == 'Show Complete'){
      this.status = 'Show Incomplete';
    }
    else {
      this.status = 'Show Complete'
    }
  }


    updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe(() => {
      this.todos$ = this.todoService.getTodos();
    });
   
  }

   async newTodo(title: string) {
    this.todoService.addTodo(title).subscribe(() => {
      this.todos$ = this.todoService.getTodos();
    });
  }
}
