resource "google_secret_manager_secret" "db_uri" {
  secret_id = "${var.project_id}_${var.environment}_db_uri"

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_version" "db_uri_version" {
  secret = google_secret_manager_secret.db_uri.id

  secret_data = replace(mongodbatlas_cluster.cluster.connection_strings[0].standard_srv, "mongodb+srv://", "mongodb+srv://${mongodbatlas_database_user.user.username}:${coalesce(nonsensitive(mongodbatlas_database_user.user.password), "null")}@")
}
