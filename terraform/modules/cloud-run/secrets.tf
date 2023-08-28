data "google_secret_manager_secret" "db_uri" {
  secret_id = "${var.project_id}_${var.environment}_db_uri"
}