import { execSync } from 'child_process';

export interface VulnerabilitiesSummary {
  info: number;
  low: number;
  moderate: number;
  high: number;
  critical: number;
}

export interface AuditMetaData {
  vulnerabilities: VulnerabilitiesSummary;
  dependencies: number;
  devDependencies: number;
  optionalDependencies: number;
  totalDependencies: number;
}

export interface AuditOutput {
  metadata: AuditMetaData;
}

export class AuditService {
  getMetaData(): AuditMetaData | undefined {
    console.log('INFO:', 'Running npm audit --production...');

    try {
      const outputString = execSync(
        'npm audit --audit-level=none --production --json',
        {
          encoding: 'utf8',
        }
      );

      console.log('INFO:', 'npm audit succeeded');

      return (JSON.parse(outputString) as AuditOutput).metadata;
    } catch (error) {
      console.error(error);

      return undefined;
    }
  }
}
