git pull origin master
npm install --only=prod
npm run build
cd /var/www/anhd-council-backend
sh deploy_nginx.sh
