var dbConfig = {
  synchronize: false,
  migrations: ["migrations/*.js"],
  cli: {
    migrationsDir: "migrations",
  },
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "password",
  database: "myapp",
  entities: ["**/*.entity.js"],
};
