resource "google_project_service" "registry" {
  project = var.project_id
  service = "artifactregistry.googleapis.com"
}

resource "google_project_service" "cloud-run" {
  project = var.project_id
  service = "run.googleapis.com"
}

resource "google_project_service" "dns" {
  project = var.project_id
  service = "dns.googleapis.com"
}

resource "google_project_service" "compute" {
  project = var.project_id
  service = "compute.googleapis.com"
}