resource "google_cloud_run_v2_service" "server" {
  name     = "${var.project_name}-server-${var.environment}"
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    service_account = data.google_service_account.service_account.email

    containers {
      image = "${var.region}-docker.pkg.dev/${var.project_id}/${var.repository_id}/server"
      ports {
        container_port = 3000
      }
      env {
        name = "DB_URI"
        value_source {
          secret_key_ref {
            secret  = data.google_secret_manager_secret.db_uri.secret_id
            version = "latest"
          }
        }
      }
    }
  }
}

resource "google_cloud_run_v2_service_iam_member" "server_access_by_public" {
  location = google_cloud_run_v2_service.server.location
  project  = google_cloud_run_v2_service.server.project
  name     = google_cloud_run_v2_service.server.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}
