import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  // The line below is basically the same as: 
  // private todoService = inject(TodoService);
  constructor(private readonly todoService: TodoService) {}
  showComplete: boolean = false;
  todos: any;

  // if (showComplete) {
  //   this.todos = this.todoService.todos();
  // }


  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.todos = this.todoService.todos();
  }

  // Function to handle the toggle:
  toggleDisplay() {
    console.log("HAHAHHA");
    this.showComplete = !this.showComplete;
  }

}
