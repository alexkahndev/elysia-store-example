import Elysia from "elysia";

export const plugin2 = new Elysia()
.get('/session', ({ store }) => store.session)