tsc --target ES5 --out .\package.json --removeComments .\package.ts
$pkg = (Get-Content package.json)
$pkg[$pkg.Length - 1] = $pkg[$pkg.Length - 1].TrimEnd(";")
$pkg | Set-Content package.json
Write-Host -ForegroundColor DarkGreen "Complied 'package.ts' to 'package.json'"

tsc --target ES5 --module commonjs .\build.config.ts 
Write-Host -ForegroundColor DarkGreen "Complied 'build.config.ts' to 'build.config.js'"

tsc --target ES5 --module commonjs .\Gruntfile.ts 
Write-Host -ForegroundColor DarkGreen "Complied 'Gruntfile.ts' to 'Gruntfile.js'"

