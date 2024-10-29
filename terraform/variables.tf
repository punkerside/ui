variable "project" {
  type = string
}

variable "env" {
  type = string
}

variable "service" {
  type = string
}

variable "domain" {
  type = string
}

variable "aws_route53_zone" {
  type    = string
  default = null
}