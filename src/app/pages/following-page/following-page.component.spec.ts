import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingPageComponent } from './following-page.component';

describe('FollowingPageComponent', () => {
  let component: FollowingPageComponent;
  let fixture: ComponentFixture<FollowingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowingPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
