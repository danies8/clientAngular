import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandupsListComponent } from './standups-list.component';

describe('StandupsListComponent', () => {
  let component: StandupsListComponent;
  let fixture: ComponentFixture<StandupsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandupsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandupsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
