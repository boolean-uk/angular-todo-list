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
  todos : Todo[] = [];
 

  ngOnInit(){
    this.loadTodos();
  }

  loadTodos(){
    this.todoService.getTodos().subscribe((todos) =>{
      this.todos = todos;
    });
  }

  updateTodo(updatedTodo: Todo) {
    this.todoService.updateTodo(updatedTodo).subscribe(() => {
      this.loadTodos();
    });
  }

   newTodo(title: string) {
    this.todoService.addTodo(title).subscribe();
    this.loadTodos();
    
  }
}
