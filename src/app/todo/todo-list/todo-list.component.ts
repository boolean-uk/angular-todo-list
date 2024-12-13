import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  todos = this.todoService.todos;
  showDone: boolean = false
  filteredTodos: Array<any> = []
  
  constructor(private readonly todoService: TodoService) {
    this.todos.then(todo => this.filteredTodos = todo.filter((task => !task.completed)))
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).then((task) => {
      if (task.completed !== this.showDone) this.filteredTodos.splice(this.filteredTodos.indexOf(task), 1)
    })
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.todos = this.todoService.todos;
  }

  toggleTasks(): void
  {
    this.showDone = !this.showDone
    this.todos.then(todo => this.filteredTodos = todo.filter((task => task.completed === this.showDone)))
  }
}
