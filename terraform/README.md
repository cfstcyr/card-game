## Build image

```shell
gcloud auth application-default login

gcloud auth configure-docker us-central1-docker.pkg.dev

# Server =====

docker buildx build --platform linux/amd64 --push -t us-central1-docker.pkg.dev/card-game-389821/card-game-prod/server .

gcloud run deploy card-game-server-prod \
        --image=us-central1-docker.pkg.dev/card-game-389821/card-game-prod/client \
        --region=us-central1 \
        --project=card-game-389821 \
    && gcloud run services update-traffic card-game-server-prod --region=us-central1 --project=card-game-389821 --to-latest


# Client =====

docker buildx build --platform linux/amd64 --push -t us-central1-docker.pkg.dev/card-game-389821/card-game-prod/client .

gcloud run deploy card-game-prod \
        --image=us-central1-docker.pkg.dev/card-game-389821/card-game-prod/client \
        --region=us-central1 \
        --project=card-game-389821 \
    && gcloud run services update-traffic card-game-prod --region=us-central1 --project=card-game-389821 --to-latest



# Admin =====

docker buildx build --platform linux/amd64 --push --build-arg SERVER_URL="https://card-game-server-prod-guqcsz3edq-uc.a.run.app" -t us-central1-docker.pkg.dev/card-game-389821/card-game-prod/admin .

```