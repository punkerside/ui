data "aws_region" "main" {}

data "aws_route53_zone" "main" {
  name         = "${var.aws_route53_zone}."
  private_zone = false
}