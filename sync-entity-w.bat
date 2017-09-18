@echo off
set src=d:\apps\projects\atiila-core
set tgt=.
set entity=%1
set entityts=%2
set srcpathcode=%src%\src\main\java\id\atiila
set tgtpathcode=%tgt%\src\main\java\id\atiila

set testpathcode=%tgt%\src\test\

set tss=%src%\src\main\webapp\app\entities\%entityts%
set tst=%tgt%\src\main\webapp\app\entities\%entityts%

set ltss=%src%\src\main\webapp\i18n
set ltst=%tgt%\src\main\webapp\i18n

rem prepare old data
copy %tst%\%entityts%.route.ts %tmp%\%entityts%.route.ts /y
copy %tst%\%entityts%.module.ts %tmp%\%entityts%.module.ts /y

copy %src%\.jhipster\%entity%.json %tgt%\.jhipster /y
call yo jhipster:entity %entity% --regenerate --force --skip-install

rem remove old files
del %tst%\*.* /q /f

copy %srcpathcode%\domain\%entity%.java %tgtpathcode%\domain\%entity%.java /y
copy %srcpathcode%\repository\%entity%Repository.java %tgtpathcode%\repository\%entity%Repository.java /y
copy %srcpathcode%\repository\search\%entity%SearchRepository.java %tgtpathcode%\repository\search\%entity%SearchRepository.java /y
copy %srcpathcode%\service\%entity%Service.java %tgtpathcode%\service\%entity%Service.java /y
copy %srcpathcode%\service\dto\%entity%DTO.java %tgtpathcode%\service\dto\%entity%DTO.java /y
copy %srcpathcode%\service\mapper\%entity%Mapper.java %tgtpathcode%\service\mapper\%entity%Mapper.java /y
copy %srcpathcode%\web\rest\%entity%Resource.java %tgtpathcode%\web\rest\%entity%Resource.java /y

copy %src%\src\main\resources\config\liquibase\changelog\*_%entity%.xml %tgt%\src\main\resources\config\liquibase\changelog /y
copy %src%\src\main\resources\config\liquibase\%entity%.csv %tgt%\src\main\resources\config\liquibase\%entity%.csv /y

del %testpathcode%\java\id\atiila\web\rest\%entity%ResourceIntTest.java
rmdir %testpathcode%\javascript\spec\app\entities\%2 /s /q

copy %tss%\%entityts%-dialog.component.* %tst%\ /y
copy %tss%\%entityts%-detail.component.* %tst%\ /y
copy %tss%\%entityts%-edit.component.* %tst%\ /y
copy %tss%\%entityts%-delete-dialog.component.* %tst%\ /y
copy %tss%\%entityts%-popup.service.ts %tst%\ /y
copy %tss%\%entityts%.component.* %tst%\ /y
copy %tss%\%entityts%.service.ts %tst%\ /y
copy %tss%\%entityts%.model.ts %tst%\ /y
copy %tss%\index.ts %tst%\ /y
copy %tss%\%entityts%.module.ts %tst%\ /y
copy %tss%\%entityts%.route.ts %tst%\ /y

copy %tmp%\%entityts%.route.ts %tst%\%entityts%.route.ts /y
copy %tmp%\%entityts%.module.ts %tst%\%entityts%.module.ts /y

copy %ltss%\en\%entityts%.json %ltst%\en /y
copy %ltss%\id\%entityts%.json %ltst%\id /y
