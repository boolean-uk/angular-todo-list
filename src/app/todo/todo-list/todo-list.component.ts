// import { Component } from '@angular/core';
// import { TodoService } from '../services/todo.service';
// import { Todo } from '../models/todo';

// @Component({
//   selector: 'app-todo-list',
//   templateUrl: './todo-list.component.html',
//   styleUrls: ['./todo-list.component.css'],
// })
// export class TodoListComponent {
//   constructor(private readonly todoService: TodoService) {}

//   todos = this.todoService.todos;

//   updateTodo(todo: Todo) {
//     this.todoService.updateTodo(todo);
//   }

//   async newTodo(title: string) {
//     await this.todoService.addTodo(title);
//     this.todos = this.todoService.todos;
//   }
// }
import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos$!: Promise<Todo[]>; // Ensure todos$ is defined with a definite type

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  async loadTodos() {
    try {
      const todos = await this.todoService.todos$.toPromise();
      if (todos) {
        this.todos$ = Promise.resolve(todos);
      } else {
        console.error('Error loading todos: todos is undefined');
        this.todos$ = Promise.resolve([]); // Handle the case where todos is undefined
      }
    } catch (error) {
      console.error('Error loading todos:', error);
      this.todos$ = Promise.resolve([]); // Handle other errors
    }
  }

  async updateTodo(updatedTodo: Todo) {
    await this.todoService.updateTodo(updatedTodo);
    this.loadTodos();
  }

  // Define the newTodo method to handle the newTodo event
  async newTodo(newTodo: Todo) {
    // Handle the new todo
    await this.todoService.addTodo(newTodo.title); // Assuming you only pass the title for simplicity
    this.loadTodos(); // Reload todos after adding a new todo
  }
}
