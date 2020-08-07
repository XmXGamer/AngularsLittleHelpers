import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxFeatureFlagsTestingModule } from '../../lib/ngx-feature-flags-testing.module';

import { DirectiveTestComponent } from './directive-test.component';
import { By } from '@angular/platform-browser';
import { NgxFeatureFlagsService } from 'ngx-feature-flags';

describe('DirectiveTestComponent', () => {
  let component: DirectiveTestComponent;
  let fixture: ComponentFixture<DirectiveTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectiveTestComponent ],
      imports: [
        NgxFeatureFlagsTestingModule.withFeatureFlags(new Map([['featureA', false]]))
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectiveTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('html element should exist', () => {
    expect(TestBed.get(NgxFeatureFlagsService)).toBeTruthy();
    console.log(TestBed.get(NgxFeatureFlagsService).refresh$);
    expect(TestBed.get(NgxFeatureFlagsService).refresh$).toBeTruthy();
    const element = fixture.debugElement.query(By.css('#test'));
    expect(element).toBeTruthy();
  });
});
