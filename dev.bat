@echo off

cls

call mvn clean spring-boot:run -Dmaven.test.skip=true