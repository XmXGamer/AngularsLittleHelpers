import { Directive, Input, ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthorizationService } from './authorization.service';

@Directive({
  selector: '[authorize]'
})
export class AuthorizeDirective {
  private _policy: string | undefined = undefined;

  @Input() set authorize(policy: string){
    this._policy = policy;
  }

  constructor(
    private readonly element: ElementRef,
    private readonly templateRef: TemplateRef<any>,
    private readonly viewContainer: ViewContainerRef,
    private readonly authorizationService: AuthorizationService
  ) { }

  private updateView() {
    if (this.checkPermission()) {
        this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
  private checkPermission(): boolean {
    return this.authorizationService.authorize(this._policy);
  }
}
