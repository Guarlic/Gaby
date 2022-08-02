version=$1

echo "이 프로젝트에 v$version 태그를 추가합니다.\n"

git tag "v$version" -m "Version $version"
git push origin --tags; git push sojak --tags