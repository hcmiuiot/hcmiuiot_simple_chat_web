pipeline {
  agent none
  stages {
    stage('Checkout') {
      steps {
        git(url: 'https://github.com/hcmiuiot/hcmiuiot_simple_chat_web', branch: 'master')
      }
    }

    stage('Container') {
      steps {
        archiveArtifacts 'artifact'
      }
    }

  }
}