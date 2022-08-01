echo "이 프로젝트를 커밋/푸시 합니다."
echo "커밋 메시지: $1"

git add -A
git commit -m "$1"
git push origin
git push sojak