FROM public.ecr.aws/bitnami/node:17-prod
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json","yarn.lock", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .

EXPOSE 3000
# RUN chown -R node /usr/src/app
# USER node
CMD ["npm", "start"]
