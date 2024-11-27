terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
    firebase = {
      source  = "terraform-providers/firebase"
      version = "~> 1.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

# Enable required APIs
resource "google_project_service" "firebase" {
  service = "firebase.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "firestore" {
  service = "firestore.googleapis.com"
  disable_on_destroy = false
}

# Create Firebase project
resource "google_firebase_project" "default" {
  provider = google
  project  = var.project_id

  depends_on = [
    google_project_service.firebase
  ]
}

# Enable Firestore
resource "google_firestore_database" "default" {
  project     = var.project_id
  name        = "(default)"
  location_id = var.region
  type        = "FIRESTORE_NATIVE"

  depends_on = [
    google_project_service.firestore
  ]
}

# Create Firebase Web App
resource "google_firebase_web_app" "mezbani" {
  provider     = google
  project      = var.project_id
  display_name = "Mezbani Chai House"
  
  depends_on = [
    google_firebase_project.default
  ]
}
