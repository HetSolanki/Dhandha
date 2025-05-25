pipeline {
  agent any

  environment {
    PROJECT_DIR = "/home/paani-wale" // The directory where your project is cloned
  }

  stages {
    stage('Pull Latest Code') {
      steps {
        dir("$PROJECT_DIR") {
          echo '📥 Pulling latest code from Git...'
          sh 'git pull origin main'
        }
      }
    }

    stage('Build Docker Image') {
      steps {
        dir("$PROJECT_DIR") {
          echo '🐳 Building Docker image...'
          sh 'docker compose build'
        }
      }
    }

    stage('Run Docker Container') {
      steps {
        dir("$PROJECT_DIR") {
          echo '🚀 Starting Docker containers...'
          sh 'docker compose down && docker compose up -d'
        }
      }
    }
  }

  post {
    success {
      echo '✅ Deployment Successful!'
    }
    failure {
      echo '❌ Deployment Failed!'
    }
  }
}
