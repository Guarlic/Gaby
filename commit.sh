echo "이 프로젝트를 커밋/푸시 합니다."
echo "커밋 메시지: $1\n"

commit_message=$1

git add -A
git commit -m $commit_message
git push origin; git push sojak