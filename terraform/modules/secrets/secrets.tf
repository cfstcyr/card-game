resource "google_secret_manager_secret" "db_password" {
  secret_id = "${var.project_id}_${var.environment}_db_password"

  replication {
    automatic = true
  }
}

resource "random_password" "db_password_value" {
  length           = 30
  special          = false
}

resource "google_secret_manager_secret_version" "db_password_version" {
  secret = google_secret_manager_secret.db_password.id

  secret_data = random_password.db_password_value.result
}

output "db_password" {
    value = random_password.db_password_value.result
}