This docker container runs [spaCy](https://spacy.io/) behind NodeJS API allowing clients to communicate with spaCy via HTTP requests.

Prebuilt Docker images are available at [https://hub.docker.com/r/jlundan/spacy-nodejs-alpine/](https://hub.docker.com/r/jlundan/spacy-nodejs-alpine/)
## Supported tags and Dockerfile links

* 1.0.0, latest [(1.0.0/Dockerfile)](https://github.com/jlundan/spacy-nodejs-alpine/blob/1.0.0/Dockerfile) - spaCy version [1.9.0](https://github.com/explosion/spaCy/releases/tag/v1.9.0)

## Examples ##
### Running ###
```
docker run -p 5000:3000 jlundan/spacy-nodejs-alpine
```

### Get some info about the API ###
```
curl -H "Content-Type: application/json" http://localhost:5000
```

You should receive following kind of response
```json
{
  "title": "spaCy JSON service",
  "spacyInfo": {
    "name": "spacy",
    "version": "1.9.0",
    "website": "https://spacy.io/"
  }
}
```

### Processing a sentence ###
```
curl -X POST --data '{"input": "This is a test."}' \
    -H "Content-Type: application/json" http://localhost:5000
```

You should receive following response

```json
{
  "text": "This is a test.",
  "len": 5,
  "tokens": [
    "This",
    "is",
    "a",
    "test",
    "."
  ],
  "noun_phrases": [
    "a test"
  ],
  "parse_tree": [
    {
      "word": "is",
      "lemma": "be",
      "NE": "",
      "POS_fine": "VBZ",
      "POS_coarse": "VERB",
      "arc": "ROOT",
      "modifiers": [
        {
          "word": "This",
          "lemma": "this",
          "NE": "",
          "POS_fine": "DT",
          "POS_coarse": "DET",
          "arc": "nsubj",
          "modifiers": []
        },
        {
          "word": "test",
          "lemma": "test",
          "NE": "",
          "POS_fine": "NN",
          "POS_coarse": "NOUN",
          "arc": "attr",
          "modifiers": [
            {
              "word": "a",
              "lemma": "a",
              "NE": "",
              "POS_fine": "DT",
              "POS_coarse": "DET",
              "arc": "det",
              "modifiers": []
            }
          ]
        },
        {
          "word": ".",
          "lemma": ".",
          "NE": "",
          "POS_fine": ".",
          "POS_coarse": "PUNCT",
          "arc": "punct",
          "modifiers": []
        }
      ]
    }
  ],
  "parse_list": [
    {
      "word": "This",
      "lemma": "this",
      "NE": "",
      "POS_fine": "DT",
      "POS_coarse": "DET"
    },
    {
      "word": "is",
      "lemma": "be",
      "NE": "",
      "POS_fine": "VBZ",
      "POS_coarse": "VERB"
    },
    {
      "word": "a",
      "lemma": "a",
      "NE": "",
      "POS_fine": "DT",
      "POS_coarse": "DET"
    },
    {
      "word": "test",
      "lemma": "test",
      "NE": "",
      "POS_fine": "NN",
      "POS_coarse": "NOUN"
    },
    {
      "word": ".",
      "lemma": ".",
      "NE": "",
      "POS_fine": ".",
      "POS_coarse": "PUNCT"
    }
  ]
}
```
### Building ###
```
docker build -t [tag]:[version] --build-arg SPACY_VERSION=[spacy version] .
```