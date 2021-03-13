git checkout staging
git checkout .
git pull origin staging
npm install --production --no-optional
npm audit fix

rm -rf build/
rm -rf build_publish/
npm run build

mkdir -p ./build_publish
cp -r build/* build_publish

cd /var/www/anhd-council-backend
sh deploy_nginx.sh
