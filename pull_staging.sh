git checkout staging
git checkout .
git pull origin staging
npm ci --production --no-optional
npm audit fix
npm run publish
cd /var/www/anhd-council-backend
sh deploy_nginx.sh
