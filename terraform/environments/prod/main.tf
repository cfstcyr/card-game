module "api" {
  source = "../../modules/api"

  project_id = var.project_id
}

module "registry" {
    source = "../../modules/registry"

    project_id = var.project_id
    project_name = var.project_name
    region = var.region
    environment = var.environment

    depends_on = [ module.api ]
}

module "bucket" {
  source = "../../modules/bucket"

    project_id = var.project_id
    project_name = var.project_name
    region = var.region
    environment = var.environment

    depends_on = [ module.api ]
}

module "cloud-run" {
  source = "../../modules/cloud-run"

    project_id = var.project_id
    project_name = var.project_name
    region = var.region
    environment = var.environment
    repository_id = module.registry.repository_id

    depends_on = [ module.api, module.registry ]
}

output "name" {
  value = module.bucket.bucket_url
}