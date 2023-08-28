resource "google_artifact_registry_repository" "registry" {
  location      = var.region
  repository_id = "${var.project_name}-${var.environment}"
  format        = "DOCKER"
}

output "repository_id" {
  value = google_artifact_registry_repository.registry.repository_id
}