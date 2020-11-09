export interface ApiV2EnvironmentStatic {
  production: boolean;
}

export interface ApiV2EnvironmentProcess {
  sessionSecretKey: string;
  port: number;
  spotify: {
    clientId: string;
    clientSecret: string;
    callbackURL: string;
  };
}

export type ApiV2Environment = ApiV2EnvironmentStatic & ApiV2EnvironmentProcess;
