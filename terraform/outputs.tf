output "firebase_web_app_config" {
  description = "Firebase Web App configuration"
  value = {
    app_id      = google_firebase_web_app.mezbani.app_id
    project_id  = var.project_id
    auth_domain = "${var.project_id}.firebaseapp.com"
    storage_bucket = "${var.project_id}.appspot.com"
  }
  sensitive = true
}
