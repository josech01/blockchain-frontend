# Pull code
export NVM_DIR="/root/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
export NODE_PATH="$(npm root -g)"
export YARN_HOME="/root/.nvm/versions/node/v16.14.2/bin"

cd /root/tyrh-frontend/
git checkout live
git pull origin live

# Build and deploy
node -v
yarn install --force
yarn run build
pm2 restart server