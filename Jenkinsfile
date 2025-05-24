pipeline {
  agent any

  environment {
    REMOTE_HOST = "root@128.199.19.208"
    PROJECT_DIR = "/home/paani-wale" // path on server
  }

  stages {
    stage('Checkout Code') {
      steps {
        echo 'Cloning repository...'
        checkout scm
      }
    }

    stage('Deploy to DigitalOcean') {
      steps {
        sshagent(credentials: ['paani-ssh']) {
          sh """
            ssh -o StrictHostKeyChecking=no $REMOTE_HOST << 'EOF'
              cd $PROJECT_DIR
              git pull origin main
              docker compose down
              docker compose up -d --build
            EOF
          """
        }
      }
    }
  }

  post {
    success {
      echo '✅ Deployment Complete!'
    }
    failure {
      echo '❌ Deployment Failed!'
    }
  }
}
