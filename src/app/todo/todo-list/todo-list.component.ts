import {Component, OnInit} from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import {filter} from "rxjs";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  constructor(private readonly todoService: TodoService) {}
  protected showCompletedTasks = false;
  todos = this.todoService.getTodos();
  filtered: Todo[] = [];

  refreshItems() {
    this.todos = this.todoService.getTodos();
    this.todos.subscribe((todos) => {
      this.filtered = this.filterTodos(todos);
    });
  }

  filterTodos(items: Todo[]) {
    return items.filter((item) => this.showCompletedTasks || !item.completed)
  }

  async updateTodo(todo: Todo) {
    await this.todoService.updateTodo(todo);
    this.refreshItems()
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.refreshItems();
  }

  ngOnInit() {
    this.refreshItems();
  }

  onShowCompleted($event: Event) {
    this.showCompletedTasks = ($event.target as HTMLInputElement).checked;
    this.refreshItems();
  }
}
