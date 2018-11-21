FROM ethereum/client-go:v1.8.18
MAINTAINER Chris Purta <cpurta@gmail.com>

ARG dev_chain
ENV DEV_CHAIN_ENABLED=${dev_chain}
ENV NETWORK_ID=15

RUN echo $DEV_CHAIN_ENABLED

RUN apk update && \
    apk add bash curl

RUN mkdir -p /ethereum/data

ADD . /ethereum/

EXPOSE 8545 8555 8080 6060

WORKDIR /ethereum

ENTRYPOINT ["./start-node.sh"]
