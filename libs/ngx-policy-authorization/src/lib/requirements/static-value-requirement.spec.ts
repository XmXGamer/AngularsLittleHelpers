import { StaticValueRequirement } from './static-value-requirement';

describe('StaticValueRequirement', () => {
  describe('if static value is true', () => {
    let requirement: StaticValueRequirement;

    beforeEach(() => {
      requirement = new StaticValueRequirement(true);
    });

    it('should return true in handle', () => {
      expect(requirement.handle([])).toBeTrue();
    });
  });

  it('should create an instance', () => {
    expect(new StaticValueRequirement(true)).toBeTruthy();
  });
});
