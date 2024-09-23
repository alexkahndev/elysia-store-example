import { html } from '@elysiajs/html';
import { Elysia } from 'elysia';

const plugin = new Elysia().get('/user', ({ store }) => store.user);

const plugin2 = new Elysia().get('/session', ({ store }) => store.session);

const app = new Elysia()
	.state({
		user: {
			Alex: 'Alex is a user'
		} as Record<string, string>,
		session: {
			1: 'Alex'
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
