import { PermissionChangedEvent } from './permission-changed-event';
import { PermissionChangeType } from './permission-change-type.enum';

describe('PermissionChangedEvent', () => {
  it('should create an instance', () => {
    expect(new PermissionChangedEvent(PermissionChangeType.Add, [])).toBeTruthy();
  });
});
