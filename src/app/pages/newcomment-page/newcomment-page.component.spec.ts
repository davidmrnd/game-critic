import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcommentPageComponent } from './newcomment-page.component';

describe('NewcommentPageComponent', () => {
  let component: NewcommentPageComponent;
  let fixture: ComponentFixture<NewcommentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewcommentPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewcommentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
