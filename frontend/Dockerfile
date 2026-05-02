# 1. Use the official Node.js image
FROM node:22-alpine AS build

# 2. Create and set the working directory
WORKDIR /app

# 3. Copy package files first to leverage Docker caching
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of your frontend source code
COPY . .

# 6. Build the app (only if you're using React, Vue, or Angular)
# RUN npm run build

# 7. Expose the port your frontend runs on (usually 3000 or 5173)
EXPOSE 3000

# 8. Start the application
CMD ["npm", "start"]