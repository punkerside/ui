project          = titan
env              = prod
service          = ui
domain           = ui.punkerside.io
aws_route53_zone = punkerside.io

export AWS_DEFAULT_REGION=us-east-1

init:
	cd terraform/ && terraform init -backend-config=config.remote.tfbackend

apply:
	cd terraform/ && terraform apply -var="project=${project}" -var="env=${env}" -var="service=${service}" -var="domain=${domain}" -var="aws_route53_zone=${aws_route53_zone}"