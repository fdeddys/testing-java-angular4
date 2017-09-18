@echo off
del yarn.lock /q
call yarn install
robocopy d:\apps\scm\repo\jhipster\generator-jhipster\generators .\node_modules\generator-jhipster\generators /MIR
