import { html } from '@elysiajs/html';
import { Elysia } from 'elysia';
import { plugin } from './plugin';
import { plugin2 } from './plugin2';

const app = new Elysia()
	.state({
		user: {
			'Alex' : 'Alex is a user',
		} as Record<string, string>,
		session: {
			1: 'Alex',
		} as Record<number, string>
	})
	.use(html())
	.get(
		'/',
		() => `
			<html lang='en'>
				<head>
					<title>Store Plugin Example</title>
				</head>
				 <body>
                <h1>Welcome to Elysia</h1>
                <nav>
                    <a href="/user">User</a>
                    <a href="/session">Session</a>
                </nav>
            </body>
			</html>`
	)
	.use(plugin)
	.use(plugin2)
	.listen(3000);

console.log(
	`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
