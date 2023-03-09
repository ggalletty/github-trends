import { HttpClient } from "./http-client";

export class FetchClient implements HttpClient {
  public get<T>(url: string): Promise<T> {
    return fetch(url).then((res) => res.json());
  }
}
