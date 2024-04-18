# What is this?

    This repo is aimed to learn microservice application with different technology. The application is still immature hence please do not expect too much. This project is only to learn about kafka and elasticsearch. 

## Technology required

    All technology that is required for this application is listed in docker-compose.yml file. Please make sure install docker and docker-compose in your local computer first. After that, you can run 'docker-compose up -d'. These are the technology that will run through the docker:

        - mongodb
        - postgres
        - redis
        - pgAdmin
        - elasticsearch
        - kibana
        - kafka
        - zookeeper

## How to run each service?

### Auth

    Please make sure create '.env' file first. The variable is located in 'env-example' file. Then run 'npm run start'.

### Order

    Please make sure create '.env' file first. The variable is located in 'env-example' file. Then run 'npm run start:dev'.

### Product

    Please make sure create '.env' file first. The variable is located in 'env-example' file. Then run 'npm run start'.

## How to test each service?

### Auth

    Go to 'http://localhost:{YOUR_PORT}/graphql'

### Order

    Go to 'http://localhost:{YOUR_PORT}/api'

### Product

    Go to 'http://localhost:{YOUR_PORT}/graphql'