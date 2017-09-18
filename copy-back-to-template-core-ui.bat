@echo off
rem call yarn install

robocopy .\node_modules d:\apps\templates\core-ui\node_modules  /MIR
copy .\packages.json d:\apps\templates\core-ui /y
copy packages.json d:\apps\templates\core-ui /y 
copy yarn.lock d:\apps\templates\core-ui /y 
