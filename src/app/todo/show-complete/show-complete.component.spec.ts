import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCompleteComponent } from './show-complete.component';

describe('ShowCompleteComponent', () => {
  let component: ShowCompleteComponent;
  let fixture: ComponentFixture<ShowCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowCompleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
