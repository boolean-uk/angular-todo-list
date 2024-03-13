import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
},
)


export class AppComponent {
  title = 'angular-todo-list';
  
 toggleCompleted = false;
 
  //@Output('updateview') updateView = new EventEmitter<boolean>();

UpdateToggle(){
  this.toggleCompleted = !this.toggleCompleted;
  console.log(this.toggleCompleted)
 //this.updateView.emit(this.toggleCompleted);
  
}
}

