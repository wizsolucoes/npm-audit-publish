import { PublishServiceOptions } from '../publish/publish.service';

export class EnvironmentService {
  private keys: string[] = [
    'SYZ_ANALYSIS_STORAGE_TABLE',
    'SYZ_ANALYSIS_STORAGE_ACCOUNT',
    'SYZ_ANALYSIS_STORAGE_KEY',
  ];

  getTableInfo(): PublishServiceOptions | undefined {
    let info: PublishServiceOptions | undefined;

    this.checkVariables();

    const tableName = process.env[this.keys[0]];
    const storageName = process.env[this.keys[1]];
    const sharedKey = process.env[this.keys[2]];

    if (storageName && tableName && sharedKey) {
      info = {
        storageName,
        tableName,
        sharedKey,
      };
    }

    return info;
  }

  private checkVariables(): void {
    this.keys.forEach((key) => {
      this.checkEnvVariable(key);
    });
  }

  private checkEnvVariable(key: string): void {
    if (!process.env[key]) {
      console.error('ERROR:', `Missing environment variable "${key}"`);
      process.exit(1);
    }
  }
}
