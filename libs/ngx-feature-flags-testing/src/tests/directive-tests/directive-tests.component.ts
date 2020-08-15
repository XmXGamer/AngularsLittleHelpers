import { Component, OnInit } from '@angular/core';

// tslint:disable-next-line: completed-docs
@Component({
  selector: 'angulars-little-helpers-test',
  template: `
    <p *ngxShowIfFeature="'featureB'">FeatureB is enabled</p>
    <p *ngxShowIfNotFeature="'featureB'">FeatureB is disabled</p>
  `,
  styles: [],
})
// tslint:disable-next-line: no-unnecessary-class
export class DirectiveTestsComponent {}
