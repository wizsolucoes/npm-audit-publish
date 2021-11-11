import { BuildInfo } from '../publish/publish.service';
import commandLineArgs, { CommandLineOptions } from 'command-line-args';

export class ProcessService {
  getBuildInfo(): BuildInfo {
    const optionDefinitions = [
      { name: 'app', alias: 'a', type: String },
      { name: 'team', alias: 't', type: String },
      { name: 'branch', alias: 'b', type: String },
      { name: 'build-url', alias: 'u', type: String },
    ];

    const options: CommandLineOptions = commandLineArgs(optionDefinitions);

    this.checkArgs(options);

    return {
      appName: options.app,
      teamName: options.team,
      branchName: options.branch,
      buildUrl: options['build-url'],
    };
  }

  private checkArgs(options: CommandLineOptions): void {
    const keys = ['app', 'team', 'branch', 'build-url'];

    keys.forEach((key) => {
      this.checkArg(options, key);
    });
  }

  private checkArg(options: CommandLineOptions, key: string): void {
    if (!options[key]) {
      console.error('ERROR:', `Missing argument "${key}"`);
      process.exit(1);
    }

    console.log('INFO:', `${key}: ${options[key]}`);
  }
}
