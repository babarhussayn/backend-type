#!/bin/bash

ansible-playbook -e "repo_url=git@github.com:ianconnet/LogisticsFE-Admin.git \
                     dest=/iancon/logistics/admin/client \
                     npm_path=/snap/bin/npm \
                     site_dir=/sites build_dir_name=dist" \
                     --ask-become-pass \
                     clone_repo.yml


