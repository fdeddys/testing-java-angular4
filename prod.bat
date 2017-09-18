@echo off
cls
call mvn clean package -Pprod,swagger -Dmaven.test.skip=true
call java -jar -Dspring.profiles.active=dev target\core-0.0.1-SNAPSHOT.war