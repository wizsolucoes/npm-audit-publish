#!/usr/bin/env node

import { AuditService } from './services/audit/audit.service';
import { EnvironmentService } from './services/environment/environment.service';
import { Main } from './services/main/main.service';
import { ProcessService } from './services/process/process.service';
import { PublishService } from './services/publish/publish.service';

new Main(
  new AuditService(),
  new PublishService(),
  new ProcessService(),
  new EnvironmentService()
).run();
