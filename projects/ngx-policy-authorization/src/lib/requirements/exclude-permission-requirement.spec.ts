import { ExcludePermissionRequirement } from './exclude-permission-requirement';

describe('ExcludePermissionRequirement', () => {
  it('should create an instance', () => {
    expect(new ExcludePermissionRequirement('permission')).toBeTruthy();
  });
});
