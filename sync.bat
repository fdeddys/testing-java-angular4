@echo off

robocopy E:\apps\scm\repo\jhipster\generator-jhipster\generators .\node_modules\generator-jhipster\generators /MIR

call yo jhipster --force --client
call yarn run webpack:build:vendor
rem call yo jhipster:entity CustomerType --skip-server--regenerate --force
yarn start