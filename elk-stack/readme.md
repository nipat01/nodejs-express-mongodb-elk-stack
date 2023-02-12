$ docker-compose up


This command will download the images, create the containers, and start the services. You can then access the Kibana web interface at http://localhost:5601.
 
% logstash for docerfile
docker build -t logstash .

docker run -d --name logstash logstash


% mongodb docker
docker pull mongo:4.0.4
docker run -d -p 27017:27017  --name test-mongo mongo:4.0.4