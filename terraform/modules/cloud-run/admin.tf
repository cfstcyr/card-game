resource "google_cloud_run_v2_service" "admin" {
  name     = "${var.project_name}-admin-${var.environment}"
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    containers {
      image = "${var.region}-docker.pkg.dev/${var.project_id}/${var.repository_id}/admin"
      ports {
        container_port = 80
      }

      env {
        name  = "REACT_APP_SERVER_URL"
        value = google_cloud_run_v2_service.server.uri
      }
    }
  }
}

resource "google_cloud_run_v2_service_iam_member" "admin_access_by_public" {
  location = google_cloud_run_v2_service.admin.location
  project  = google_cloud_run_v2_service.admin.project
  name     = google_cloud_run_v2_service.admin.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}
