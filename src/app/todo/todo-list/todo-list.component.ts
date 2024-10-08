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

  todos: Todo[] = [];
  showComplete: boolean = false;

  async ngOnInit() {
    await this.getTodos();
  }

  async getTodos(){
    this.todos = await this.todoService.getTodos();
    this.filterTodo();
  }

  toggleShowOnlyCompleted = () => {
    this.showComplete = !this.showComplete;
    this.filterTodo();
  }

  async filterTodo() {
    if (this.showComplete) {
      this.todos = (await this.todoService.getTodos()).filter(
        (todo: any) => todo.completed
      );
    }
    if (!this.showComplete) {
      this.todos = (await this.todoService.getTodos()).filter(
        (todo: any) => !todo.completed
      );
    }
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    await this.getTodos();
  }
}
