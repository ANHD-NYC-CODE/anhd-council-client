git checkout .
git pull origin master
npm install --production --no-optional
npm run build
cd /var/www/anhd-council-backend
sh deploy_nginx.sh
