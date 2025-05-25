pipeline {
  agent any

  environment {
    PROJECT_DIR = "/home/paani-wale" // The directory where your project is cloned
  }

  stages {
   pipeline {
  agent any

  stages {
    stage('Clone Repository') {
      steps {
        echo '📥 Cloning repository...'
        checkout([$class: 'GitSCM',
          branches: [[name: '*/main']],
          userRemoteConfigs: [[
            url: 'https://github.com/HetSolanki/Dhandha.git',
            credentialsId: 'github-https-het'
          ]]
        ])
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
