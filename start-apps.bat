@echo off
start mvn clean spring-boot:run -Dmaven.test.skip=true
start yarn start