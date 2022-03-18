#!/bin/bash -e
if [ $# -eq 0 ]; then
    echo "Missing arg(s): environment"
    exit 1
fi

LAMBDA=$(head -n 1 config.auto.tfvars | cut -d "\"" -f 2)

terraform init

for env in "$@"
do
    terraform workspace select $env
    terraform import aws_lambda_function.func $LAMBDA
    terraform import aws_lambda_alias.alias $LAMBDA/${env^}
done
