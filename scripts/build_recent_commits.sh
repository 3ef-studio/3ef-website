#!/usr/bin/env bash
set -euo pipefail

# Edit these paths for your machine
declare -A REPOS=(
  ["3EF Website"]="$HOME/dev/3ef/3ef-website"
  ["VeilMark"]="$HOME/dev/3ef/veilmark"
  ["DDE"]="$HOME/dev/3ef/domain-discovery-engine"
)

MAX_PER_REPO=${1:-5}
OUT_FILE="${2:-$(git rev-parse --show-toplevel)/data/recent_commits.json}"

tmp=$(mktemp)
echo '{ "generated_at": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'", "items": [' > "$tmp"
first=1

for project in "${!REPOS[@]}"; do
  repo_path="${REPOS[$project]}"
  pushd "$repo_path" >/dev/null

  # Ensure we’re on latest; comment out if you prefer purely local
  # git fetch --quiet

  while IFS= read -r line; do
    sha=$(echo "$line" | cut -d'|' -f1)
    ts=$(echo "$line"  | cut -d'|' -f2)
    msg=$(echo "$line" | cut -d'|' -f3- | sed 's/"/\\"/g')
    url=""
    # If this repo is on GitHub and has an origin URL, we can craft a link:
    remote=$(git config --get remote.origin.url || true)
    if [[ "$remote" == *github.com* ]]; then
      # normalize git@github.com:org/repo.git or https URLs
      path=$(echo "$remote" | sed -E 's#git@github.com:|https?://github.com/##' | sed 's/\.git$//')
      url="https://github.com/${path}/commit/${sha}"
    fi

    # Guess branch (best-effort)
    branch=$(git branch --show-current 2>/dev/null || echo "main")

    [[ $first -eq 1 ]] && first=0 || echo ',' >> "$tmp"
    printf '  { "project": "%s", "repo": "%s", "sha": "%s", "message": "%s", "timestamp": "%s", "branch": "%s", "url": "%s" }' \
      "$project" "$(basename "$repo_path")" "${sha:0:7}" "$msg" "$ts" "$branch" "$url" >> "$tmp"
  done < <(git log -n "$MAX_PER_REPO" --pretty=format:'%H|%cI|%s')

  popd >/dev/null
done

echo '] }' >> "$tmp"
mv "$tmp" "$OUT_FILE"
echo "Wrote $OUT_FILE"
