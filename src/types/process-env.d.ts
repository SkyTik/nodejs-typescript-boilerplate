declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URL: string;
      REDIS_URL: string;
    }
  }
}

export {};
