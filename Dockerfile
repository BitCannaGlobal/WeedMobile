# Only for dev and testing
# Update the image in Docker Hub:
    # docker buildx build --push --platform linux/amd64,linux/arm64 --tag bernalraul/weedmobile:latest .

    ARG BASE_IMAGE=node:18-alpine3.18

    FROM ${BASE_IMAGE} AS runner
    
    # Set the Work folder 
    WORKDIR /app
    
    # Copy dependencies file
    COPY package.json yarn.lock ./
    
    # Install dependencies for that Arch.
    RUN yarn install --production
    
    # Copy the rest of the App
    COPY . .
    
    # Expose 3000 port
    EXPOSE 3000
    
    # start App
    CMD ["yarn", "dev"]
    