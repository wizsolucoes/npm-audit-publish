import { AuditService } from '../audit/audit.service';
import { EnvironmentService } from '../environment/environment.service';
import { ProcessService } from '../process/process.service';
import { PublishService } from '../publish/publish.service';

export class Main {
  private auditService: AuditService;
  private publishService: PublishService;
  private processService: ProcessService;
  private environmentService: EnvironmentService;

  constructor(
    auditService: AuditService,
    publishService: PublishService,
    processService: ProcessService,
    environmentService: EnvironmentService
  ) {
    this.auditService = auditService;
    this.publishService = publishService;
    this.processService = processService;
    this.environmentService = environmentService;
  }

  async run() {
    const tableInfo = this.environmentService.getTableInfo();
    const buildInfo = this.processService.getBuildInfo();
    const auditMetadata = this.auditService.getMetaData();

    if (tableInfo && buildInfo && auditMetadata) {
      try {
        await this.publishService.publishMetaData(
          tableInfo,
          buildInfo,
          auditMetadata
        );
        process.exit(0);
      } catch (error) {
        console.error(error);
        process.exit(1);
      }
    }

    console.warn('WARN:', 'Failed to get or publish npm audit metadata');
    process.exit(0);
  }
}
