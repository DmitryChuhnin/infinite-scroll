# Git Ignore Configuration

## Overview
This document explains the Git ignore patterns used in the project to exclude files and directories from version control.

## Categories

### Dependencies
```bash
node_modules
.pnp
.pnp.js
```
- Excludes all installed node modules
- Ignores Plug'n'Play (PnP) related files
- These are recreated from package.json during installation

### Build Output
```bash
dist
build
```
- Excludes compiled and bundled files
- These directories are generated during build process
- Should be built fresh for each deployment

### Log Files
```bash
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
```
- Excludes all types of log files
- Includes package manager specific debug logs
- Log files should never be committed to version control

### IDE and Editor Files
```bash
.vscode/*
!.vscode/extensions.json
.idea
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```
- Excludes editor-specific configuration files
- Keeps VSCode extensions recommendations
- Ignores JetBrains IDE files
- Excludes Visual Studio solution files
- Ignores Vim swap files

### Environment Files
```bash
.env
.env.*
!.env.example
```
- Excludes all environment files
- Keeps example environment file as template
- Protects sensitive configuration data

## Maintenance Guidelines

1. **Dependencies**
    - Always ignore package manager specific files
    - Keep lock files in version control

2. **Build Files**
    - Never commit compiled output
    - Ensure build process is reproducible

3. **IDE Files**
    - Only commit shared configuration files
    - Keep personal IDE settings local

4. **Environment**
    - Always provide .env.example
    - Document required environment variables

5. **Security**
    - Regularly review for sensitive data
    - Update patterns when adding new tools

## Adding New Patterns

When adding new ignore patterns:
1. Add clear comments explaining what is being ignored
2. Group related patterns together
3. Consider both Windows and Unix paths
4. Update this documentation
```