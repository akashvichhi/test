import { http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";

// 2. Describe network behavior with request handlers.
const worker = setupWorker(
  http.get("/octocat", ({ request, params, cookies }) => {
    return HttpResponse.json(
      {
        message: "Mocked response",
      },
      {
        status: 200,
      }
    );
  })
);

// 3. Start request interception by starting the Service Worker.
await worker.start();
