#!/usr/bin/env bash
set -eu

# FUTURE: Make sourcing this file optional and rely on existing environment variables
source ./.env-build

APP=$1
APP_NAME=

# nx build "${APP}" --prod

case "${APP}" in
api)
  APP_NAME=discover-daily-api
  ;;
discover-daily)
  APP_NAME=discover-daily
  ;;
esac

if [ -z "${APP_NAME}" ]; then
  echo 'No app name found'
  exit 1
fi

IMAGE_TAG="${DOCKER_REPO_ROOT}/${APP_NAME}:latest"

docker build -f "./caprover/${APP}/Dockerfile" -t "${IMAGE_TAG}" .


docker push "${IMAGE_TAG}"

caprover deploy -i "${IMAGE_TAG}" -n "${CAPROVER_MACHINE_NAME}" -a "${APP_NAME}"
