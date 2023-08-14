resource "mongodbatlas_project" "project" {
    name = "${var.project_id}-${var.environment}"
    org_id = var.organization_id
}

resource "mongodbatlas_cluster" "cluster" {
  project_id              = mongodbatlas_project.project.id
  name                    = var.project_name

  # Provider Settings "block"
  provider_name = "TENANT"
  backing_provider_name = "AWS"
  provider_region_name = "US_EAST_1"
  provider_instance_size_name = "M0"
}

resource "mongodbatlas_database_user" "test" {
  username           = "${var.project_name}-user"
  password           = var.db_password
  project_id         = mongodbatlas_project.project.id
  auth_database_name = "admin"

  roles {
    role_name     = "readWrite"
    database_name = mongodbatlas_cluster.cluster.name
  }

  roles {
    role_name     = "readAnyDatabase"
    database_name = "admin"
  }

  scopes {
    name   = mongodbatlas_cluster.cluster.name
    type = "CLUSTER"
  }
}

output "mongodb_uri" {
    # value = mongodbatlas_cluster.cluster.connection_strings[0].standard
    # value = mongodbatlas_cluster.cluser.
    value = "mongodb://${mongodbatlas_database_user.test.username}:${var.db_password}@${mongodbatlas_cluster.cluster.name}.${mongodbatlas_cluster.cluster.cluster_id}.mongodb.net/?retryWrites=true&w=majority"
}
