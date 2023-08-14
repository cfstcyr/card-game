variable "project_id" {
  type        = string
  description = "Project ID"
}

variable "project_name" {
  type        = string
  description = "Project name"
}

variable "environment" {
    type = string
    description = "Environment"
}

variable "organization_id" {
  type = string
  description = "Mongo Atlas organization ID"
}

variable "db_password" {
  type = string
}