const express = require("express");
const app = express();
const proxy = require("http-proxy-middleware");

app.use("/api", proxy.createProxyMiddleware({ target: "http://localhost:5000", changeOrigin: true }));

app.listen(8000, () => console.log("API Gateway running on port 8000"));
