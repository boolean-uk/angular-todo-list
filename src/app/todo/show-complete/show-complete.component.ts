import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-show-complete',
  standalone: true,
  imports: [],
  templateUrl: './show-complete.component.html',
  styleUrl: './show-complete.component.css'
})
export class ShowCompleteComponent {
  @Output() onToggle = new EventEmitter<boolean>();

  onCheckboxChange(event: Event) {
    this.onToggle.emit((event.target as HTMLInputElement).checked);
  }
}
