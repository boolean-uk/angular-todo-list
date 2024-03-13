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
  todos : any;
  showAll: boolean = false

  ngOnInit() {
    this.todos = this.todoService.todos
    this.filterinComplete()
  }

  filterinComplete(){
    this.todos = this.todoService.todos.then((res) => res.filter(t => t.completed === false))
  }

  toggleShowAll(){
    if (!this.showAll){
      this.showAll = true
      this.todos = this.todoService.todos
    } else {
      this.showAll = false
      this.filterinComplete()
    }
  }

  async updateTodo(todo: Todo) {
    await this.todoService.updateTodo(todo);
    this.filterinComplete()
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.todos = this.todoService.todos;
  }
}
