echo "이 프로젝트를 커밋/푸시 합니다."
echo "커밋 메시지: $1\n"

git add -A
git commit -m $1

if $1 == "v$2" :

git tag "v$2" -m "Version $2"
git push origin --tags; git push sojak --tags;

done

git push origin; git push sojak
git push origin --tags; git push sojak --tags