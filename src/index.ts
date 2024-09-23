import { html } from '@elysiajs/html';
import { Elysia } from 'elysia';

const statePlugin = new Elysia({ name: 'statePlugin' }).state({
    user: {
    } as Record<string, string>
});

const plugin = new Elysia()
    .use(statePlugin)
    .get('/user', ({ store }) => store.user);

const plugin2 = new Elysia().use(statePlugin).post('/add-user', async ({ store, body }) => {
    const { name } = body as { name?: string };

    if (!name || name.trim() === '') {
        return 'Please provide a valid name.';
    }

    store.user[name] = `${name} is a user`;
    return `User ${name} added successfully.`;
});

const app = new Elysia()
    
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
                        <a href="/user">View Users</a>
                    </nav>
                    <form action="/add-user" method="post">
                        <label for="name">Enter a user name:</label>
                        <input type="text" id="name" name="name" required />
                        <button type="submit">Add User</button>
                    </form>
                </body>
            </html>`
    )
    .use(plugin)
    .use(plugin2)
    .listen(3000);

console.log(
    `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
