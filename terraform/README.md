## Build image

```shell
gcloud auth configure-docker us-central1-docker.pkg.dev

docker buildx build --platform linux/amd64 --push -t us-central1-docker.pkg.dev/card-game-389821/card-game-prod/client .

gcloud run deploy card-game-prod \
        --image=us-central1-docker.pkg.dev/card-game-389821/card-game-prod/client \
        --region=us-central1 \
        --project=card-game-389821 \
    && gcloud run services update-traffic card-game-prod --region=us-central1 --project=card-game-389821 --to-latest
```