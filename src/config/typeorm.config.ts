import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'pgsql',
  port: 5432,
  username: 'pguser',
  password: 'pgpass',
  database: 'ze',
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  synchronize: true,
};

export default typeOrmConfig;
