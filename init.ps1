tsc .\package.ts --out .\package.json --removeComments 
$pkg = (Get-Content package.json)
$pkg[$pkg.Length - 1] = $pkg[$pkg.Length - 1].TrimEnd(";")
$pkg | Set-Content package.json
Write-Host -ForegroundColor DarkGreen "Complied 'package.ts' to 'package.json'"

tsc --module commonjs .\build.config.ts 
Write-Host -ForegroundColor DarkGreen "Complied 'build.config.ts' to 'build.config.js'"

tsc --module commonjs .\Gruntfile.ts 
Write-Host -ForegroundColor DarkGreen "Complied 'Gruntfile.ts' to 'Gruntfile.js'"
