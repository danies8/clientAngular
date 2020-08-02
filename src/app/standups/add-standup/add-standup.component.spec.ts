import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStandupComponent } from './add-standup.component';

describe('AddStandupComponent', () => {
  let component: AddStandupComponent;
  let fixture: ComponentFixture<AddStandupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStandupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStandupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
