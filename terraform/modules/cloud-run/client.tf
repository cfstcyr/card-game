resource "google_cloud_run_v2_service" "client" {
  name     = "${var.project_name}-${var.environment}"
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    containers {
      image = "${var.region}-docker.pkg.dev/${var.project_id}/${var.repository_id}/client"
      ports {
        container_port = 80
      }
    }
  }
}

resource "google_cloud_run_v2_service_iam_member" "client_access_by_public" {
  location = google_cloud_run_v2_service.client.location
  project  = google_cloud_run_v2_service.client.project
  name     = google_cloud_run_v2_service.client.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

resource "google_cloud_run_domain_mapping" "domain_mapping_1" {
  for_each = toset(["card", "cards"])

  location = var.region
  name     = "${each.value}.cfstcyr.com"

  metadata {
    namespace = var.project_id
  }

  spec {
    force_override = true
    route_name     = google_cloud_run_v2_service.client.name
  }
}