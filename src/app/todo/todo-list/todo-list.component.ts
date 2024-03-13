import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  constructor(private readonly todoService: TodoService) {}
  
  //todos = this.todoService.todos;
  filteredTodos: Todo[] = []
  completed = false;
  uncompleted = true;
  
  ngOnInit() {
    this.filterTodos();
  }

  async filterTodos() {
    const allTodos = await this.todoService.todos;
    this.filteredTodos = allTodos.filter(todo => {
      if (this.completed && !this.uncompleted) {
        return todo.completed;
      } else if (!this.completed && this.uncompleted) {
        return !todo.completed;
      } else if (!this.completed && !this.uncompleted){
        return false;
      } else {
        return true;
      }
    });
  }
  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
    this.filterTodos();
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
  }
  
}
