#!/bin/bash
# Version bump script
# Usage: ./scripts/version.sh [major|minor|patch]

set -e

# Get current version from package.json
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "Current version: v$CURRENT_VERSION"

# Parse version parts
IFS='.' read -r MAJOR MINOR PATCH <<< "$CURRENT_VERSION"

# Bump version based on argument
case $1 in
  major)
    MAJOR=$((MAJOR + 1))
    MINOR=0
    PATCH=0
    ;;
  minor)
    MINOR=$((MINOR + 1))
    PATCH=0
    ;;
  patch)
    PATCH=$((PATCH + 1))
    ;;
  *)
    echo "Usage: ./scripts/version.sh [major|minor|patch]"
    exit 1
    ;;
esac

NEW_VERSION="$MAJOR.$MINOR.$PATCH"
echo "New version: v$NEW_VERSION"

# Update package.json
node -e "
const pkg = require('./package.json');
pkg.version = '$NEW_VERSION';
require('fs').writeFileSync('./package.json', JSON.stringify(pkg, null, 2) + '\n');
"

# Update version.ts
cat > src/lib/version.ts << EOF
export const APP_VERSION = '$NEW_VERSION'
export const BUILD_DATE = '$(date -u +%Y-%m-%d)'
EOF

# Commit and tag
git add package.json src/lib/version.ts
git commit -m "chore: bump version to v$NEW_VERSION"
git tag -a "v$NEW_VERSION" -m "Release v$NEW_VERSION"

echo "Version bumped to v$NEW_VERSION"
echo "Run 'git push origin main --tags' to deploy"
