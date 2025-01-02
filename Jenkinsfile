pipeline {
    agent any

    stages {
        stage('Instalação') {
            steps {
                git branch: 'main', url: 'https://github.com/danimaleski/teste_ebac_ui.git'
                sh 'npm ci'
            }
        }
        stage('Testes') {
            steps {
                sh 'NO_COLOR=1 npm test'
            }
        }
    }
}
