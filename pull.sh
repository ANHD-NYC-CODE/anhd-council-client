git checkout .
git pull origin master
npm ci --production --no-optional --legacy-peer-deps
npm run publish
cd /var/www/anhd-council-backend
sh deploy_nginx.sh
