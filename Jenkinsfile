pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        git(url: 'https://github.com/hcmiuiot/hcmiuiot_simple_chat_web', branch: 'master')
        sh 'ls'
      }
    }

    stage('Container') {
      agent any
      steps {
        sh '''

docker build -t hcmiuiot/simple_chat_web:latest'''
      }
    }

  }
}