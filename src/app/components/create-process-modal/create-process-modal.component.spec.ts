import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProcessModalComponent } from './create-process-modal.component';

describe('CreateProcessModalComponent', () => {
  let component: CreateProcessModalComponent;
  let fixture: ComponentFixture<CreateProcessModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateProcessModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateProcessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
