# Version Control Strategy

## Branch Strategy

```
main (production)     ←── Tagged releases only (v1.x.x)
  ↑
beta (staging)        ←── Pre-release testing
  ↑
dev (development)     ←── Daily development
  ↑
feature/*             ←── Feature branches
```

## Branches

| Branch | Environment | URL | Auto-Deploy |
|--------|-------------|-----|-------------|
| `main` | Production | borehub.co.za | On tag push |
| `beta` | Staging | beta.borehub.co.za | On push |
| `dev` | Development | dev.borehub.co.za | On push |
| `feature/*` | Preview | PR preview URL | On PR |

## Workflow

### Feature Development
```bash
# Create feature branch from dev
git checkout dev
git pull origin dev
git checkout -b feature/my-feature

# Work on feature
git add .
git commit -m "feat: add my feature"

# Push and create PR to dev
git push origin feature/my-feature
# Create PR: feature/my-feature → dev
```

### Release to Beta
```bash
# Merge dev into beta for testing
git checkout beta
git merge dev
git push origin beta
# Auto-deploys to beta.borehub.co.za
```

### Release to Production
```bash
# Merge beta into main
git checkout main
git merge beta

# Tag the release
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin main --tags
# Auto-deploys to borehub.co.za
```

## Commit Convention

```
feat:     New feature
fix:      Bug fix
docs:     Documentation
style:    Formatting
refactor: Code refactoring
test:     Tests
chore:    Maintenance
perf:     Performance
ci:       CI/CD changes
```

## Version Numbering (SemVer)

- **Major (X.0.0)** - Breaking changes
- **Minor (0.X.0)** - New features, backwards compatible
- **Patch (0.0.X)** - Bug fixes

## Current Version

`v0.1.0` - Initial MVP
