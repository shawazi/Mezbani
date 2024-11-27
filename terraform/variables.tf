variable "project_id" {
  description = "The ID of the GCP project"
  type        = string
}

variable "region" {
  description = "The region for GCP resources"
  type        = string
  default     = "us-central1"
}

variable "firebase_location" {
  description = "Location for Firebase/Firestore resources"
  type        = string
  default     = "us-central"
}
