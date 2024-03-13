import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  constructor(private readonly todoService: TodoService) {
    this.getTodos();
  }

  public showAll : boolean = false;

  // @ts-ignore
  todos : Todo[];
  // @ts-ignore
  filteredTodos : Todo[];

  async getTodos() {
    this.todos = await this.todoService.todos;
    this.showFiltered();
  } 

  showFiltered(){
    this.filteredTodos = this.todos.filter((todo : any) => !todo.completed);
    console.log(this.filteredTodos);
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.todos = await this.todoService.todos;
  }
}
