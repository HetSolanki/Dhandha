pipeline {
    agent any

    environment {
        WORKDIR = "/home/paani-wale"
    }

    stages {
        stage('Clean Workspace') {
            steps {
                echo "🧼 Cleaning previous workspace..."
                cleanWs()
            }
        }

       stage('Clone Repository') {
          steps {
                git credentialsId: 'het-github-auth', url: 'https://github.com/HetSolanki/Dhandha.git', branch: 'main'
              }
        }


        stage('Run Docker Compose') {
            steps {
                echo '🐳 Running docker-compose up...'
                dir("$WORKDIR") {
                    sh "docker-compose down || true" // stop old containers (optional)
                    sh "docker-compose up -d --build"
                }
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful via Docker Compose!'
        }
        failure {
            echo '❌ Deployment Failed!'
        }
    }
}
