export default [
	{
		context: [
			'/auth',
			'/api',
		],
		target: "http://localhost:8080/",
		// target: "http://demo-backend-env.eba-agk3i7ru.us-west-2.elasticbeanstalk.com/",
		secure: false,
		loglevel: 'debug'
	}
];