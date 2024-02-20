export namespace ConnectType {
  export interface DBConnectionConfig {
    connect(): void
  }
  export enum DB_URL {
    DEFAULT = 'mongodb://localhost:27017/test'
  }
  export enum DB_STATUS {
    UP = 'Database connected successfully',
    DOWN = 'Database connection failed'
  }
}
