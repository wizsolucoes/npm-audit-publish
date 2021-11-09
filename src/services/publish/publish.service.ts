import azure from 'azure-storage';
import { AuditMetaData } from '../audit/audit.service';

export interface PublishServiceOptions {
  storageName: string;
  tableName: string;
  sharedKey: string;
}

export interface BuildInfo {
  appName: string;
  teamName: string;
  buildUrl: string;
}

export class PublishService {
  private azureTableService: azure.TableService | undefined;
  private entGen = azure.TableUtilities.entityGenerator;

  async publishMetaData(
    tableInfo: PublishServiceOptions,
    buildInfo: BuildInfo,
    metadata: AuditMetaData
  ): Promise<void> {
    try {
      this.azureTableService = azure.createTableService(
        tableInfo.storageName,
        tableInfo.sharedKey
      );

      await this.createTableIfNotExists(tableInfo);

      await this.insertOrMergeApplicationEntity(tableInfo, buildInfo);

      await this.insertAnalysisEntity(tableInfo, buildInfo, metadata);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private createTableIfNotExists(
    tableInfo: PublishServiceOptions
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log(
        'INFO:',
        `Creating "${tableInfo.tableName}" table if needed...`
      );

      this.azureTableService?.createTableIfNotExists(
        tableInfo.tableName,
        (error) => {
          if (error) {
            return reject(error);
          }

          console.log(
            'INFO:',
            `"${tableInfo.tableName}" table created or already exists`
          );

          resolve();
        }
      );
    });
  }

  private insertOrMergeApplicationEntity(
    tableInfo: PublishServiceOptions,
    buildInfo: BuildInfo
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      console.log(
        'INFO:',
        `Creating "${buildInfo.appName}" entity if needed...`
      );

      const appEntity = {
        PartitionKey: this.entGen.String(buildInfo.appName),
        RowKey: this.entGen.String('Application'),
        team: this.entGen.String(buildInfo.teamName),
      };

      this.azureTableService?.insertOrMergeEntity(
        tableInfo.tableName,
        appEntity,
        (error) => {
          if (error) {
            return reject(error);
          }

          console.log(
            'INFO:',
            `"${buildInfo.appName}" entity created or already exists`
          );

          resolve();
        }
      );
    });
  }

  private insertAnalysisEntity(
    tableInfo: PublishServiceOptions,
    buildInfo: BuildInfo,
    metadata: AuditMetaData
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      console.log('INFO:', `Creating analysis entity...`);
      const summary = metadata.vulnerabilities;

      const analsysEntity = {
        PartitionKey: this.entGen.String(buildInfo.appName),
        RowKey: this.entGen.String(`${new Date().getTime()}`),
        buildUrl: this.entGen.String(buildInfo.buildUrl),
        info: this.entGen.Int32(summary.info),
        low: this.entGen.Int32(summary.low),
        moderate: this.entGen.Int32(summary.moderate),
        high: this.entGen.Int32(summary.high),
        critical: this.entGen.Int32(summary.critical),
      };

      this.azureTableService?.insertOrMergeEntity(
        tableInfo.tableName,
        analsysEntity,
        (error) => {
          if (error) {
            return reject(error);
          }

          console.log('INFO:', `Analysis entity created`);

          resolve();
        }
      );
    });
  }
}
