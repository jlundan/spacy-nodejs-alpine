FROM node:8.5.0-alpine

ARG SPACY_VERSION

ENV LANG en
ENV PORT 3000

COPY ./src /app
COPY ./entry/services.yml /services.yml
COPY ./entry/.bashrc /root/.bashrc

RUN apk update && apk add --no-cache python3 tini bash libgomp && \
    apk add --no-cache --virtual .build-deps \
        build-base \
        subversion \
        python3-dev \
        g++ && \

    ln -s /usr/bin/python3 /usr/bin/python && \

    python3 -m ensurepip && \
    pip3 install --upgrade pip setuptools && \
    if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip ; fi && \

    python3 -m pip install -U socketIO-client spacy==${SPACY_VERSION} && \
    python3 -m spacy.${LANG}.download && \

    npm install --loglevel=warn pm2 -g && \

    cd /app && npm install --loglevel=warn && \

    apk del .build-deps \
        build-base \
        subversion \
        python3-dev \
        g++ && \

    rm -r /usr/lib/python*/ensurepip && \
    rm -r /root/.cache && \
    rm -r /root/.npm && \

    pip show spacy > /etc/spacy_info

EXPOSE ${PORT}

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["pm2-docker", "/services.yml"]
