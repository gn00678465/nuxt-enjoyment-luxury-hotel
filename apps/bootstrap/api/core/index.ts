import { ofetch } from 'ofetch';

const request = ofetch.create({
  baseURL: import.meta.env.apiUrl ||  "http://localhost:3005",
  parseResponse: JSON.parse
});

export { request }