import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  constructor(private readonly todoService: TodoService) {}

  todos = this.todoService.todos();
  boolShowCompleted = false;

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  showCompleted(){
    if(this.boolShowCompleted){
      this.todos = this.todoService.todos()
    }
    else{
      this.todos = this.todoService.getCompleted()
    }
    this.boolShowCompleted = !this.boolShowCompleted
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.todos = this.todoService.todos();
  }
}
