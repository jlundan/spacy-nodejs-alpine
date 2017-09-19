A docker container which runs SpaCy and NodeJS API

### Build ###
```
docker build -t [tag]:[version] .
```

### Run ###
```
docker run -p [public port]:3000 [tag]:[version]
```

### Process a sentence ###
```
curl -X POST -H "Content-Type: application/json" --data '{"input": "This is test."}' http://localhost:[public port]
```
(if you are running on Windows or Mac, use your ip address instead of localhost)