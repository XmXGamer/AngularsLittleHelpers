import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFeatureFlagsModule, NgxFeatureFlagsService } from 'ngx-feature-flags';
import { DirectiveTestComponent } from './directive-test/directive-test.component';



@NgModule({
  declarations: [DirectiveTestComponent],
  imports: [
    CommonModule,
    NgxFeatureFlagsModule
  ],
  providers: [
    NgxFeatureFlagsService
  ]
})
export class TestModule { }
