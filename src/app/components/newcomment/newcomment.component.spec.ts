import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcommentComponent } from './newcomment.component';

describe('NewcommentComponent', () => {
  let component: NewcommentComponent;
  let fixture: ComponentFixture<NewcommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewcommentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewcommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
