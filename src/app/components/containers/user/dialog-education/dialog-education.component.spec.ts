import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEducationComponent } from './dialog-education.component';

describe('DialogEducationComponent', () => {
  let component: DialogEducationComponent;
  let fixture: ComponentFixture<DialogEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEducationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
