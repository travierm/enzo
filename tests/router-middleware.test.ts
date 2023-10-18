import { expect, test } from "bun:test";

import Router from "../src/framework/server/router";
import { Middleware } from "../src/framework/server/routerMiddlewareMixin";

const router = new Router();
test("can run global middleware", async () => {
  // Arrange
  let counter: number = 0;

  router.use(async (req) => {
    counter = counter + 1;

    return req;
  });

  router.get("/", async (req) => {
    return new Response("middleware");
  });

  // Act
  router.serve(new Request("http://localhost/"));
  router.serve(new Request("http://localhost/"));

  // Assert
  expect(counter).toBe(2);
});

test("can run route specfic middleware", async () => {
  // Arrange
  let counter: number = 0;
  const routeSpecficMiddleware: Middleware = async (req) => {
    counter = counter + 1;

    return req;
  };

  router.group([routeSpecficMiddleware], () => {
    router.get("/ping", async (req) => {
      return new Response("middleware");
    });
  });

  // Act & Assert
  await router.serve(new Request("http://localhost/about"));
  expect(counter).toBe(0);
  await router.serve(new Request("http://localhost/ping"));
  expect(counter).toBe(1);
});
