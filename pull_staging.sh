git checkout staging
git checkout .
git pull origin staging
npm install --production --no-optional
npm run build
cd /var/www/anhd-council-backend
sh deploy_nginx.sh