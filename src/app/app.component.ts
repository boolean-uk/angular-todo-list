import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-todo-list';
  toggleFinished = false;
  @Output('updateview') updateView = new EventEmitter<boolean>();

UpdateToggle(){
  this.toggleFinished = !this.toggleFinished;
  this.updateView.emit(this.toggleFinished);
  
}





}
