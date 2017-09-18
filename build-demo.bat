@echo off
robocopy d:\apps\scm\repo\jhipster\generator-jhipster\generators .\node_modules\generator-jhipster\generators /MIR
call yo jhipster:entity Market --regenerate --force --skip-install
call yo jhipster:entity Category --regenerate --force --skip-install
call yo jhipster:entity Product --regenerate --force --skip-install
call start-apps
