import { NgModule } from '@angular/core';
import { NgxFeatureFlagsModule } from 'ngx-feature-flags';
import { DirectiveTestsComponent } from './directive-tests/directive-tests.component';
// tslint:disable-next-line: completed-docs
@NgModule({
  declarations: [DirectiveTestsComponent],
  imports: [NgxFeatureFlagsModule],
  exports: [],
})
// tslint:disable-next-line: no-unnecessary-class
export class NgxFeatureFlagsTestingModule {}
