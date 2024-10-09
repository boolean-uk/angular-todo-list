import { Component } from '@angular/core';
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
  todos: Todo[] = []
  onlyShowComplete: boolean = false;


  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos
    });
  }

  async newTodo(title: string): Promise<void> {
    this.todoService.addTodo(title).subscribe(() => {
      this.todoService.getTodos().subscribe((todos) => {
        this.todos = todos
      });
    });
  }

  updateTodo(updatedTodo: Todo): void {
    this.todoService.updateTodo(updatedTodo).subscribe(() => {
      this.todoService.getTodos().subscribe((todos) => {
        this.todos = todos
      });
    })
  }

  filterTodo(): Todo[] {
    if(this.onlyShowComplete) {
      return this.todos;
    }
    return this.todos.filter(t => !t.completed);
  }

  toggleTodo(): void {
    this.onlyShowComplete = !this.onlyShowComplete;
  }
}
