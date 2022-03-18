$ErrorActionPreference = "Stop"

$textInfo = (Get-Culture).TextInfo

if (!$args[0]) {
    Write-Output "Missing arg(s): environment"
    exit 1
}

$vars = import-csv .\config.auto.tfvars -Delimiter '=' -Header Key,Value
$LAMBDA = $vars[0].Value # first value after =

terraform init

for ($i = 0 ; $i -lt $args.Count ; $i++) {
    $env = $textInfo.ToTitleCase($args[$i]) # uppercase first letter
    terraform workspace select $args[$i]
    terraform import aws_lambda_function.func $LAMBDA
    terraform import aws_lambda_alias.alias $LAMBDA/$env
}
