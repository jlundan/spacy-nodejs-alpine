A docker container which runs SpaCy and NodeJS API

### Build ###
```
docker build -t [tag]:[version] --build-arg SPACY_VERSION=1.9.0 .
```

### Run ###
```
docker run -p [public port]:3000 [tag]:[version]
```

### Process a sentence ###
```
curl -X POST -H "Content-Type: application/json" --data '{"input": "This is a test."}' http://localhost:[public port]
```
(if you are running on Windows or Mac, use your ip address instead of localhost)

You should receive about following response

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