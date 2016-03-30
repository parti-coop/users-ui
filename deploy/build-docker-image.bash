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
DOCKER_REPO=partixyz/users-ui
USERS_UI_VERSION=${USERS_UI_VERSION:-$( git describe --tags --long )}

docker build -t ${DOCKER_REPO}:${USERS_UI_VERSION} ${SCRIPT_DIR}/..
docker tag ${DOCKER_REPO}:${USERS_UI_VERSION} $DOCKER_REPO:current
