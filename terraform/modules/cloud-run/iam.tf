data "google_service_account" "service_account" {
  account_id   = "${var.project_name}-${var.environment}-svc"
}

resource "google_secret_manager_secret_iam_member" "secret-access" {
  secret_id = data.google_secret_manager_secret.db_uri.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${data.google_service_account.service_account.email}"
}
