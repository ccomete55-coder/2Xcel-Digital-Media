# SiteOne Crawler is a Rust CLI binary with no server mode of its own.
# This image installs the prebuilt static-musl release (no Rust toolchain /
# compile step needed) and runs it behind server.js, a tiny Express job API.

FROM node:20-slim AS runtime

ARG CRAWLER_VERSION=v2.5.1
ARG CRAWLER_ASSET=siteone-crawler-${CRAWLER_VERSION}-linux-musl-x64.tar.gz

RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates curl \
    && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL \
      "https://github.com/janreges/siteone-crawler/releases/download/${CRAWLER_VERSION}/${CRAWLER_ASSET}" \
      -o /tmp/crawler.tar.gz \
    && tar -xzf /tmp/crawler.tar.gz -C /opt \
    && ln -s /opt/siteone-crawler/siteone-crawler /usr/local/bin/siteone-crawler \
    && chmod +x /opt/siteone-crawler/siteone-crawler \
    && rm /tmp/crawler.tar.gz

WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev

COPY server.js ./

ENV NODE_ENV=production
ENV CRAWLER_BIN=/usr/local/bin/siteone-crawler

EXPOSE 10000
CMD ["node", "server.js"]
