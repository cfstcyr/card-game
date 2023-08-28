module "api" {
  source = "../../modules/api"

  project_id = var.project_id
}

module "iam" {
  source = "../../modules/iam"

  project_id   = var.project_id
  project_name = var.project_name
  environment  = var.environment
}

module "secrets" {
  source = "../../modules/secrets"

  project_id   = var.project_id
  project_name = var.project_name
  environment  = var.environment

  depends_on = [ module.api ]
}

module "db" {
  source = "../../modules/db"

  project_id   = var.project_id
  project_name = var.project_name
  environment  = var.environment
  organization_id = var.organization_id
  db_password = module.secrets.db_password

  depends_on = [ module.api ]
}

module "registry" {
  source = "../../modules/registry"

  project_id   = var.project_id
  project_name = var.project_name
  region       = var.region
  environment  = var.environment

  depends_on = [module.api]
}

module "bucket" {
  source = "../../modules/bucket"

  project_id   = var.project_id
  project_name = var.project_name
  region       = var.region
  environment  = var.environment

  depends_on = [module.api]
}

module "cloud-run" {
  source = "../../modules/cloud-run"

  project_id    = var.project_id
  project_name  = var.project_name
  region        = var.region
  environment   = var.environment
  repository_id = module.registry.repository_id

  depends_on = [module.api, module.iam, module.registry, module.secrets]
}

# output "name" {
#   value = module.bucket.bucket_url
# }