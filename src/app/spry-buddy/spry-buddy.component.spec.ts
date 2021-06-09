import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpryBuddyComponent } from './spry-buddy.component';

describe('SpryBuddyComponent', () => {
  let component: SpryBuddyComponent;
  let fixture: ComponentFixture<SpryBuddyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpryBuddyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpryBuddyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
