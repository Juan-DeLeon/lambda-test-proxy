export interface HttpLambdaError extends Error {
    statusCode?: number
}