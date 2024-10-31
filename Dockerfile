# Only for dev and testing
# Update the image in Docker Hub:
    # docker buildx build --push --platform linux/amd64,linux/arm64  --tag bernalraul/weedmobile:latest .

ARG BASE_IMAGE=node:18-alpine3.18

FROM  ${BASE_IMAGE} AS runner

### First install the dependencies (as they change less often)
COPY . /app

WORKDIR /app

CMD ["yarn", "dev"]