export default () => ({
	port: process.env.PORT,

	db_dialect: process.env.DB_DIALECT,
	db_port: process.env.DB_PORT,
	db_host: process.env.DB_HOST,
	db_user: process.env.DB_USER,
	db_password: process.env.DB_PASSWORD,
	db_database: process.env.DB_DATABASE,

	jwt_secret: process.env.JWT_SECRET,
	jwt_expire_time: process.env.JWT_EXPIRE_TIME,
})
