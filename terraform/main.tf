provider "aws" {
  region  = "us-east-1"
  profile = "default"
}

terraform {
  required_version = ">= 1.0.2"
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
    archive = {
      source = "hashicorp/archive"
    }
  }
}

# Create an archive form the Lambda source code,
# filtering out unneeded files.
data "archive_file" "lambda_source_package" {
  type        = "zip"
  source_dir  = "${path.module}/../dist/"
  output_path = "${path.module}/../function.zip"
}

data "aws_lambda_function" "f_data" {
  function_name = var.function_name
}

locals {
  # load env config for current workspace
  env           = lookup(var.env_config, terraform.workspace)
  secret_name   = (terraform.workspace == "prod") ? var.secret_prod : var.secret_dev
  function_data = data.aws_lambda_function.f_data
  alias_version = (terraform.workspace != "dev") ? aws_lambda_function.func.version : "$LATEST"
}

# Deploy the Lambda function to AWS
resource "aws_lambda_function" "func" {
  function_name    = local.function_data.function_name
  description      = local.env.description
  filename         = data.archive_file.lambda_source_package.output_path
  handler          = "index.handler"
  runtime          = local.function_data.runtime
  role             = local.function_data.role
  publish          = local.env.publish
  source_code_hash = filebase64sha256(data.archive_file.lambda_source_package.output_path)
  environment {
    variables = {
      SECRET_NAME = local.secret_name
      JWT_ISS     = "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_i8WFXfLE6"
    }
  }
  lifecycle {
    prevent_destroy = true
    ignore_changes  = [layers, timeout, tags, vpc_config]
  }
}

resource "aws_lambda_alias" "alias" {
  name             = local.env.alias_name
  description      = "${local.env.alias_name} deploy from terraform"
  function_name    = aws_lambda_function.func.arn
  function_version = local.alias_version
}

# API GATEWAY INTEGRATION - correr 1 vez para ambientes nuevos

resource "aws_lambda_permission" "api_gateway_invoke" {
  statement_id  = "ApiGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.func.arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = var.api_gateway_route
  qualifier     = aws_lambda_alias.alias.name
}

resource "aws_lambda_permission" "api_gateway_invoke_proxy" {
  statement_id  = "ApiGatewayInvokeProxy"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.func.arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = var.api_gateway_route_proxy
  qualifier     = aws_lambda_alias.alias.name
}