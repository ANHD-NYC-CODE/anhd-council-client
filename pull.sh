git checkout .
git pull origin master
npm install --production --no-optional
npm audit fix
npm run publish
cd /var/www/anhd-council-backend
sh deploy_nginx.sh
