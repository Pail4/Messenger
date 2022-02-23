import { apiData } from "./api.js";
export const socket = new WebSocket(apiData.URLS.getSocket());