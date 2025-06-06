**🚀Implemented Docker best practices in a single project :**

I’ve built a Docker image that encapsulates my simple Node.js application featuring a user form interface. The application container is seamlessly connected to MongoDB and Mongo Express containers via a custom Docker bridge network, ensuring secure and isolated communication between services. To maintain data persistence across container restarts, I’ve utilized named volumes, allowing the MongoDB data to be stored reliably outside the container lifecycle.


**🔐BEST PRACTICES I ENSURED :**

1. Using official base docker images for mongo and mongo-express.
2. Not using full blown OS images and keeping the OS image very light such as alpine-18
3. Optimized image creation speed with image layering 
4. optimized image sized using mutli-stage build image creation.
5. Used dockerignore 
6. The containers will be run using a non-priviledged user with least admin rights.
7. Scanned the image to analyze vulnerabilities using docker scout functionality
8. Avoided any secret value to be hardcoded in the docker compose file

**🔑 Key Learnings**
1. Docker runs on Linux — but works on Windows via WSL2, which provides a lightweight Linux kernel to run the Docker Engine smoothly on Windows systems.

2. MongoDB 5.0+ requires AVX support from the host CPU. Since my Ubuntu VM lacked AVX, the container failed to run, so I switched to running it locally on AVX-capable hardware.


**How to Launch Project**
1. Make sure you have a docker desktop starting in your machine.
2. Pull the official images : **mongo** and **mongo-express** 
    using docker pull command.
3. Pull my node application image using : docker pull devanshnischal/expedition:1.0
4. Clone the github repo in your system : https://github.com/devanshnischal/dockerBestPractices.git

5. You will see the docker-compose-mongo.yaml (Just run this)
    Before running : 
    Create a docker network using :
    docker network create mongo-network
    docker create volume host-volume
    
    docker compose -f <file path of docker compose> up -d


6. Access the containers on the localhost using :
   localhost:3000 (application)
   localhost:8081 (mongo-express UI)
   localhost:27017 (mongodb)

