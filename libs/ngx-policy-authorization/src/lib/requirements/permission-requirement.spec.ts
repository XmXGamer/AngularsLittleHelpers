import { PermissionRequirement } from './permission-requirement';

describe('PermissionRequirement', () => {
  it('should create an instance', () => {
    expect(new PermissionRequirement('permission')).toBeTruthy();
  });
});
