# Close GitHub Desktop / VS Code Source Control before running this

Set-Location $PSScriptRoot

if (Test-Path ".git\index.lock") {
    Remove-Item ".git\index.lock" -Force
}

git config user.email "harrymndz3@gmail.com"
git config user.name "Harry Mendez"

git add .gitignore package.json vite.config.js eslint.config.js index.html railway.toml src/main.jsx src/index.css public/
git commit -m "chore: init project with React, Vite, Tailwind and Railway config"

git add src/App.jsx src/components/Navbar.jsx src/components/Hero.jsx
git commit -m "feat: add animated navbar and hero section"

git add src/components/About.jsx
git commit -m "feat: add about section with timeline and bible verse"

git add src/components/Projects.jsx
git commit -m "feat: add projects section with 4 cards and scroll animations"

git add src/components/Skills.jsx
git commit -m "feat: add skills section with animated bars and certifications"

git add src/components/Contact.jsx src/components/Footer.jsx
git commit -m "feat: add contact section and footer"

Write-Host "Done! 6 commits created." -ForegroundColor Cyan
git log --oneline
Write-Host "Now run: git push origin main" -ForegroundColor Yellow
