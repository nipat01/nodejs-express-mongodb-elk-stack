$ docker-compose up


This command will download the images, create the containers, and start the services. You can then access the Kibana web interface at http://localhost:5601.


 
logstash for docerfile
docker build -t logstash .

docker run -d --name logstash logstash