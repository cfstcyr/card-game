resource "google_storage_bucket" "games_bucket" {
 name          = "${var.project_name}-${var.environment}-games"
 location      = var.region
 storage_class = "STANDARD"

 uniform_bucket_level_access = true
}

resource "google_storage_bucket_iam_member" "games_bucket_access_by_public" {
  bucket = google_storage_bucket.games_bucket.name
  role = "roles/storage.objectViewer"
  member = "allUsers"
}
