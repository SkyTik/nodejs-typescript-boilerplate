import Agent from "agentkeepalive";
import axios from "axios";

const httpAgent = new Agent({
  maxSockets: 100,
  maxFreeSockets: 20,
  timeout: 20000,
  freeSocketTimeout: 10000,
});

const httpsAgent = new Agent.HttpsAgent({
  maxSockets: 100,
  maxFreeSockets: 20,
  timeout: 20000,
  freeSocketTimeout: 10000,
});

const clientAxios = axios.create({
  timeout: 3000,
  headers: { "User-Agent": "Order Matching Helper" },
  httpsAgent,
  httpAgent,
});

export default clientAxios;
