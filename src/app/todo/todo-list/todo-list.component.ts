import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  todos:any
  showAll: boolean = false
  filteredTodos: Todo[] = [];

  constructor(private readonly todoService: TodoService) {}

  async ngOnInit() {
    this.todos = await this.todoService.getTodos();
    this.filterTodos();
  }

  filterTodos() {
    if(this.showAll){
      this.filteredTodos = this.todos;
    } else{
      this.filteredTodos = this.todos.filter((todo: { completed: boolean; }) => todo.completed === true);
    }
  }

  toggleView(){
    this.showAll = !this.showAll
    this.filterTodos()
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  async newTodo(title: string) {
    this.todoService.addTodo(title);
  }
}
