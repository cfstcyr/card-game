resource "google_project_service" "registry" {
  project = var.project_id
  service = "artifactregistry.googleapis.com"
}

resource "google_project_service" "cloud-run" {
  project = var.project_id
  service = "run.googleapis.com"
}