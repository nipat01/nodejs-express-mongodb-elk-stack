FROM docker.elastic.co/logstash/logstash:7.11.1

# Install the Logstash input plugin for MongoDB
RUN logstash-plugin install logstash-input-mongodb

# Copy the logstash.conf into the container
COPY logstash.conf /usr/share/logstash/pipeline/

# Set the entrypoint to start Logstash with the pipeline configuration
ENTRYPOINT ["/usr/share/logstash/bin/logstash", "--path.settings", "/usr/share/logstash/config"]
