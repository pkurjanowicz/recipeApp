module.exports ={
  port: process.env.POST || 3000,
  db: {
    database: process.env.DB_NAME || 'recipeapp',
    user: process.env.DB_USER || 'pkurjanowicz',
    password: process.env.DB_PASSWORD || 'Popcorn97',
    options: {
      dialect: process.env.DIALECT || 'postgres',
      host: process.env.HOST || 'localhost',
    }
  }
}