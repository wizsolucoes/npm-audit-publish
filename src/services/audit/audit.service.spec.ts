import { AuditService } from './audit.service';

describe('AuditService', () => {
  let service: AuditService;

  beforeEach(() => {
    service = new AuditService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getMetaData', () => {
    it('should return npm audit metadata', () => {
      const result = service.getMetaData();

      if (result) {
        expect(result.vulnerabilities).toMatchObject({
          info: expect.any(Number),
          low: expect.any(Number),
          moderate: expect.any(Number),
          high: expect.any(Number),
          critical: expect.any(Number),
        });
        return;
      }

      expect(result).toBeUndefined();
    });
  });
});
