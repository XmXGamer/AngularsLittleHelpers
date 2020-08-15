# ngx-feature-flags-testing

ngx-feature-flags-testing is a package to simplify writting tests when you use [ngx-feature-flags](https://www.npmjs.com/package/ngx-feature-flags). It offers you the ability to define directly feature flags in the import section of your `TestBed`.

## Installation

The `ngx-feature-flags-testing` module needs to be installed as a test dependency using your favorite NPM client.

```sh
npm install ngx-feature-flags-testing --save-dev
```

or

```sh
yarn add ngx-feature-flags-testing --dev
```

## Usage

The `NgxFeatureFlagsTestingModule` class can provide all of the capabilities of the `ngx-feature-flags` `NgxFeatureFlagsModule` (directives, pipes,and services) and easily be configured with feature flags for your test cases.

The module can easily be imported into your test cases:

```ts
import { NgxFeatureFlagsTestingModule } from 'ngx-feature-flags-testing';
```

### Using without feature flags

```ts
TestBed.configureTestingModule({
  imports: [NgxFeatureFlagsTestingModule],
});
```

### Using with one feature flag

```ts
TestBed.configureTestingModule({
  imports: [NgxFeatureFlagsTestingModule.withFeatureFlag('featureA', true)],
});
```

### Using with multiple feature flags

```ts
TestBed.configureTestingModule({
  imports: [
    NgxFeatureFlagsTestingModule.withFeatureFlags(
      new Map([
        ['featureA', true],
        ['featureB', false],
      ])
    ),
  ],
});
```

### Using with [Spectator](https://www.npmjs.com/package/@ngneat/spectator)

```ts
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
```
