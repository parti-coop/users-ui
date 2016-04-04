#!/usr/bin/env bash

script_dir() {
    local source="${BASH_SOURCE[0]}"
    while [ -h "$source" ] ; do # resolve $SOURCE until the file is no longer a symlink
        local dir="$( cd -P "$( dirname "$source" )" && pwd )"
        source="$( readlink "$source" )";
        # if $source was a relative symlink
        # we need to resolve it relative to the path where the symlink file was located
        [[ $source != /* ]] && source="$dir/$source"
    done
    printf "$( cd -P "$( dirname "$source" )" && pwd )"
}

SCRIPT_DIR=$( script_dir )
ROOT_DIR=$( dirname $SCRIPT_DIR )

DOCKER_COMPOSE_FILE=${SCRIPT_DIR}/docker-compose-deps.yml

docker-compose -f ${DOCKER_COMPOSE_FILE} up -d db
sleep 2
docker-compose -f ${DOCKER_COMPOSE_FILE} run --rm auth-api bin/rails db:setup
docker-compose -f ${DOCKER_COMPOSE_FILE} up -d auth-api
docker-compose -f ${DOCKER_COMPOSE_FILE} run --rm users-api bin/rails db:setup
docker-compose -f ${DOCKER_COMPOSE_FILE} up -d users-api
