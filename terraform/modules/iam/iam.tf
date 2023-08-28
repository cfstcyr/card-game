resource "google_service_account" "service_account" {
  account_id   = "${var.project_name}-${var.environment}-svc"
  display_name = "${var.project_name} executor service account"
}