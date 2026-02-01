@echo off
echo Starting import + client initialization sweep for screens + components...

REM === Remove old Amplify imports safely ===
for /R screens %%f in (*.ts *.tsx) do (
  type "%%f" | findstr /V "import { Auth, API, graphqlOperation } from 'aws-amplify';" > tmpfile
  move /Y tmpfile "%%f" >nul
)

for /R components %%f in (*.ts *.tsx) do (
  type "%%f" | findstr /V "import { Auth, API, graphqlOperation } from 'aws-amplify';" > tmpfile
  move /Y tmpfile "%%f" >nul
)

REM === Prepend new imports + client initialization ===
for /R screens %%f in (*.ts *.tsx) do (
  echo import { generateClient } from 'aws-amplify';>tmpfile
  echo import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';>>tmpfile
  echo import { uploadData, getUrl } from 'aws-amplify/storage';>>tmpfile
  echo.>>tmpfile
  echo const client = generateClient();>>tmpfile
  echo.>>tmpfile
  type "%%f" >>tmpfile
  move /Y tmpfile "%%f" >nul
)

for /R components %%f in (*.ts *.tsx) do (
  echo import { generateClient } from 'aws-amplify';>tmpfile
  echo import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';>>tmpfile
  echo import { uploadData, getUrl } from 'aws-amplify/storage';>>tmpfile
  echo.>>tmpfile
  echo const client = generateClient();>>tmpfile
  echo.>>tmpfile
  type "%%f" >>tmpfile
  move /Y tmpfile "%%f" >nul
)

echo Import + client initialization sweep complete!
pause
