declare module '@nestjs/config' {
  import { ModuleMetadata, Provider, Type } from '@nestjs/common';

  export interface ConfigModuleOptions {}

  export class ConfigModule {
    static forRoot(opts?: ConfigModuleOptions): any;
    static forFeature(...args: any[]): any;
  }

  export function register(options?: any): any;
  export const ConfigService: any;
}
