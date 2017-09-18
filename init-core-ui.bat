@echo off
rem runas /user:bogo "mklink /D node_modules d:\apps\templates\node_modules\v4.7.0" 
robocopy d:\apps\templates\core-ui . /MIR
robocopy d:\apps\scm\repo\jhipster\generator-jhipster\generators .\node_modules\generator-jhipster\generators /MIR
call yo jhipster
robocopy d:\apps\scm\repo\jhipster\generator-jhipster\generators .\node_modules\generator-jhipster\generators /MIR
