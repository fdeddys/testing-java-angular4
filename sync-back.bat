@echo off
set src=.
set tgt=E:\apps\templates\eara-base
set entity=%1
set srcpathcode=%src%\src\main\java\id\eara
set tgtpathcode=%tgt%\src\main\java\id\eara
set testpathcode=%tgt%\src\test\java\id\eara

copy %src%\.jhipster\%entity%.json %tgt%\.jhipster /y

copy %srcpathcode%\domain\%entity%.java %tgtpathcode%\domain\%entity%.java /y
copy %srcpathcode%\repository\%entity%Repository.java %tgtpathcode%\repository\%entity%Repository.java /y
copy %srcpathcode%\repository\search\%entity%SearchRepository.java %tgtpathcode%\repository\search\%entity%SearchRepository.java /y
copy %srcpathcode%\service\%entity%Service.java %tgtpathcode%\service\%entity%Service.java /y
copy %srcpathcode%\service\dto\%entity%DTO.java %tgtpathcode%\service\dto\%entity%DTO.java /y
copy %srcpathcode%\service\mapper\%entity%Mapper.java %tgtpathcode%\service\mapper\%entity%Mapper.java /y
copy %srcpathcode%\web\rest\%entity%Resource.java %tgtpathcode%\web\rest\%entity%Resource.java /y
copy %srcpathcode%\web\rest\%entity%Resource.java %tgtpathcode%\web\rest\%entity%Resource.java /y

copy %src%\src\main\resources\config\liquibase\changelog\*_%entity%.xml %tgt%\src\main\resources\config\liquibase\changelog /y
copy %src%\src\main\resources\config\liquibase\%entity%.csv %tgt%\src\main\resources\config\liquibase\%entity%.csv /y

del %testpathcode%\web\rest\%entity%ResourceIntTest.java