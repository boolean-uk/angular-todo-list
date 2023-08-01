import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  showCompleted: boolean = false;

  constructor(private readonly todoService: TodoService) {}

  todos$: Observable<Todo[]> | undefined;
  listToDisplay: Todo[] = [];

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todos$ = this.todoService.getTodos();
    this.filterTodos();
  }

  newTodo(title: string) {
    this.todoService.addTodo(title).subscribe((addedTodo) => {
      console.log(addedTodo, "New todo has been added ");
      this.loadTodos();
    });
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe((updatedTodo) => {
      console.log(updatedTodo, "Todo has been updated ");
      this.loadTodos();
    });
  }

  deleteTodoById(id: number) {
    this.todoService.deleteTodoById(id).subscribe(() => {
      console.log(id, "Todo has been deleted ");
      this.loadTodos();
    });
  }

  filterTodos() {
    this.listToDisplay = [];
    if (this.todos$) {
      this.todos$.subscribe((todos) => {
        todos.forEach(todo => {
          if (todo.completed === this.showCompleted) {
            this.listToDisplay.push(todo);
          }
        });
      });
    }
  }

  toggleShowCompleted() {
    this.showCompleted = !this.showCompleted;
    this.filterTodos(); 
  }
}
