version=$1

git tag "v$version" -m "Version $version"
git push origin --tags; git push sojak --tags