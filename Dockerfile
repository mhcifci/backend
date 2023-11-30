FROM node
WORKDIR /opt/api
COPY . .
RUN npm install
CMD ["node", "app.js"]