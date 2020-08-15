import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthorizationService } from './authorization.service';

@Directive({
  selector: '[authorize]'
})
export class AuthorizeDirective {
  private _policy: string | undefined = undefined;

  @Input() set authorize(policy: string){
    this._policy = policy;
    this.updateView();
  }

  constructor(
    // tslint:disable-next-line: no-any
    private readonly _templateRef: TemplateRef<any>,
    private readonly _viewContainer: ViewContainerRef,
    private readonly _authorizationService: AuthorizationService
  ) { }

  private updateView(): void {
    if (this.checkPermission()) {
        this._viewContainer.createEmbeddedView(this._templateRef);
    } else {
      this._viewContainer.clear();
    }
  }

  private checkPermission(): boolean {
    return this._authorizationService.authorize(this._policy);
  }
}
