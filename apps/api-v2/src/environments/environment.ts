import { ApiV2Environment } from './environment.interface';
import { environmentProcess } from './environment.process';

export const environment: ApiV2Environment = {
  production: false,
  ...environmentProcess,
};
