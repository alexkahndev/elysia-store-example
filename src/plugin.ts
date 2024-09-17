import Elysia from "elysia";

export const plugin = new Elysia()
    .get('/user', ({ store }) => store.user)