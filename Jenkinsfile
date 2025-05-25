pipeline {
    agent any

    environment {
        WORKDIR = "/home/paani-wale"
    }

    stages {
        stage('Clean Workspace') {
            steps {
                echo "🧼 Cleaning previous workspace..."
        sh '''
        mkdir -p /home/paani-wale
        rm -rf /home/paani-wale/*
        '''
            }
        }

        stage('Clone Repository') {
            steps {
                echo '📥 Cloning repository into $WORKDIR...'
                sh "git clone https://github.com/HetSolanki/Dhandha.git $WORKDIR"
            }
        }

        stage('Run Docker Compose') {
            steps {
                echo '🐳 Running docker-compose up...'
                dir("$WORKDIR") {
                    sh "docker-compose down" // stop old containers (optional)
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
