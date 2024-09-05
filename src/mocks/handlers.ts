import { http, HttpResponse } from "msw";
import data from "../assets/data/data.json";
import ICard from "../types/Card";

export const handlers = [
  http.get("/api/cats", () => {
    try {
      const catsDataJson: string | null = localStorage.getItem("catsData");
      let catsData: ICard[] = data;
      if (catsDataJson) {
        catsData = JSON.parse(catsDataJson);
      }
      return HttpResponse.json({ data: catsData });
      // eslint-disable-next-line
    } catch (ex) {
      return HttpResponse.json({ data: [] });
    }
  }),
  http.post("/api/cats", async ({ request }) => {
    const body = await request.json();
    localStorage.setItem("catsData", JSON.stringify(body));
    return HttpResponse.json({ message: "Data saved" });
  }),
];
