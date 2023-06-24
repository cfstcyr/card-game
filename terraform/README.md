## Build image

```shell
gcloud auth configure-docker northamerica-northeast1-docker.pkg.dev
docker buildx build --platform linux/amd64 --push -t northamerica-northeast1-docker.pkg.dev/card-game-389821/card-game-prod/client .
gcloud run deploy card-game-prod \
    --image=northamerica-northeast1-docker.pkg.dev/card-game-389821/card-game-prod/client \
    --region=northamerica-northeast1 \
    --project=card-game-389821 \
    && gcloud run services update-traffic card-game-prod --region=northamerica-northeast1 --to-latest
```