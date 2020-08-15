// tslint:disable
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { NgxFeatureFlagsTestingModule } from '../../lib/ngx-feature-flags-testing.module';
import { DirectiveTestsComponent } from './directive-tests.component';

describe('Import without configuration', () => {
  let spectator: Spectator<DirectiveTestsComponent>;
  const createComponent = createComponentFactory({
    imports: [NgxFeatureFlagsTestingModule],
    component: DirectiveTestsComponent,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should display "FeatureB is disabled', () => {
    expect(spectator.query('p')).toHaveText('FeatureB is disabled');
  });
});

describe('Import with flag configuration enabled', () => {
  let spectator: Spectator<DirectiveTestsComponent>;
  const createComponent = createComponentFactory({
    imports: [NgxFeatureFlagsTestingModule.withFeatureFlag('featureB', true)],
    component: DirectiveTestsComponent,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should display "FeatureB is enabled', () => {
    expect(spectator.query('p')).toHaveText('FeatureB is enabled');
  });
});

describe('Import with flag configuration disabled', () => {
  let spectator: Spectator<DirectiveTestsComponent>;
  const createComponent = createComponentFactory({
    imports: [NgxFeatureFlagsTestingModule.withFeatureFlag('featureB', false)],
    component: DirectiveTestsComponent,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should display "FeatureB is disabled', () => {
    expect(spectator.query('p')).toHaveText('FeatureB is disabled');
  });
});
