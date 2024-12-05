import { ofetch } from 'ofetch';

const request = ofetch.create({ baseURL: "http://localhost:3005", parseResponse: JSON.parse });

export { request }