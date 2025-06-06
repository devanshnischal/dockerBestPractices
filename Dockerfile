
FROM node:18-alpine AS builder

WORKDIR /home/app

COPY package*.json ./
RUN npm install

COPY . .

# -------- Stage 2: Runtime Stage --------
FROM node:18-alpine

# Set working directory
WORKDIR /home/app

# Create user and group
RUN addgroup -g 1001 -S docker-admins \
    && adduser -S devu -u 1001 -G docker-admins

# Copy only the necessary files from builder stage
# 🧾 What it means in plain English:
# "Take all the files from the folder /home/app in the first image we built (called builder), and copy them into the same folder in this new image. Also, make sure those files belong to the user devu and group docker-admins."
# ✅ Why we do this:
# So we only copy the final app code (and not extra stuff used during build).
# So the app runs safely as a non-root user (devu), who actually owns the files.

COPY --chown=devu:docker-admins --from=builder /home/app /home/app

# Switch to non-root user
USER devu

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "app.js"]


