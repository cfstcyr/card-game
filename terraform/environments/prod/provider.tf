terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.51.0"
    }
    mongodbatlas = {
      source = "mongodb/mongodbatlas"
      version = "1.11.0"
    }
  }

  backend "gcs" {
    bucket = "card-game-tf-prod"
    prefix = "terraform/state"
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

provider "mongodbatlas" {
  public_key = "vsznweey"
  private_key  = "b0553e41-5074-43cf-959b-429d44e01717"
}