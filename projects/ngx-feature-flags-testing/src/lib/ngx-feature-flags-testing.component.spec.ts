import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFeatureFlagsTestingComponent } from './ngx-feature-flags-testing.component';

describe('NgxFeatureFlagsTestingComponent', () => {
  let component: NgxFeatureFlagsTestingComponent;
  let fixture: ComponentFixture<NgxFeatureFlagsTestingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxFeatureFlagsTestingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFeatureFlagsTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
