import { ProxyIntegrationRoute } from "aws-lambda-router/lib/proxyIntegration";

let _handler: ProxyIntegrationRoute;

export type LambdaProxyHandler = (typeof _handler.action);
