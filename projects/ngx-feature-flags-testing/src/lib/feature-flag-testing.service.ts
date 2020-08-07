import { Injectable, Inject, InjectionToken } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export const FEATURE_CONFIG = new InjectionToken<Map<string, boolean>>('FeatureConfig');
@Injectable({
  providedIn: 'root'
})
export class FeatureFlagTestingService {

  private _featureFlags: Map<string, boolean>;
  public initialized = false;

  private _refresh: Subject<boolean>;
  public refresh$: Observable<boolean>;

  constructor(@Inject(FEATURE_CONFIG) featureFlags: Map<string, boolean>) {
    this._featureFlags = featureFlags;
    this._refresh = new Subject<boolean>();
    this.refresh$ = this._refresh.asObservable();
    this._refresh.next(true);
  }

  public featureOff(featureName: string): boolean {
    return !this.featureOn(featureName);
  }

  public featureOn(featureName: string): boolean {
    if (!featureName) {
      return true;
    }
    return this._featureFlags.has(featureName) && this._featureFlags.get(featureName) as boolean;
  }

  public async initialize(): Promise<void>{
    this.initialized = true;
  }
}
