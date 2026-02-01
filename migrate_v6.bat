@echo off
echo Starting corrected migration sweep for screens + components...

REM === Auth migration: replace with two lines (userInfo) ===
for /R screens %%f in (*.ts *.tsx) do sd "const userInfo = await Auth\.currentAuthenticatedUser\(\);" "const userInfo = await getCurrentUser();\nconst attrs = await fetchUserAttributes();" "%%f"
for /R components %%f in (*.ts *.tsx) do sd "const userInfo = await Auth\.currentAuthenticatedUser\(\);" "const userInfo = await getCurrentUser();\nconst attrs = await fetchUserAttributes();" "%%f"

REM === Auth migration: replace with two lines (user) ===
for /R screens %%f in (*.ts *.tsx) do sd "const user = await Auth\.currentAuthenticatedUser\(\);" "const user = await getCurrentUser();\nconst attrs = await fetchUserAttributes();" "%%f"
for /R components %%f in (*.ts *.tsx) do sd "const user = await Auth\.currentAuthenticatedUser\(\);" "const user = await getCurrentUser();\nconst attrs = await fetchUserAttributes();" "%%f"

REM === Attributes migration: replace field-level calls (userInfo) ===
for /R screens %%f in (*.ts *.tsx) do sd "userInfo\.attributes\.email" "attrs.email" "%%f"
for /R screens %%f in (*.ts *.tsx) do sd "userInfo\.attributes\.phone_number" "attrs.phone_number" "%%f"
for /R screens %%f in (*.ts *.tsx) do sd "userInfo\.attributes\.sub" "userInfo.userId" "%%f"

for /R components %%f in (*.ts *.tsx) do sd "userInfo\.attributes\.email" "attrs.email" "%%f"
for /R components %%f in (*.ts *.tsx) do sd "userInfo\.attributes\.phone_number" "attrs.phone_number" "%%f"
for /R components %%f in (*.ts *.tsx) do sd "userInfo\.attributes\.sub" "userInfo.userId" "%%f"

REM === Attributes migration: replace field-level calls (user) ===
for /R screens %%f in (*.ts *.tsx) do sd "user\.attributes\.email" "attrs.email" "%%f"
for /R screens %%f in (*.ts *.tsx) do sd "user\.attributes\.phone_number" "attrs.phone_number" "%%f"
for /R screens %%f in (*.ts *.tsx) do sd "user\.attributes\.sub" "user.userId" "%%f"

for /R components %%f in (*.ts *.tsx) do sd "user\.attributes\.email" "attrs.email" "%%f"
for /R components %%f in (*.ts *.tsx) do sd "user\.attributes\.phone_number" "attrs.phone_number" "%%f"
for /R components %%f in (*.ts *.tsx) do sd "user\.attributes\.sub" "user.userId" "%%f"

echo Migration sweep complete for screens + components!
pause
