# Base node image for all stages
FROM node:20-bullseye-slim AS base

# Set environment to production for base and inheriting layers
ENV NODE_ENV=production

# Install openssl for Prisma's usage during runtime
RUN apt-get update && apt-get install -y openssl \
    && apt-get clean && rm -rf /var/lib/apt/lists/*  # Clean up to reduce image size

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies including devDependencies in a separate stage
FROM base AS deps

# Set working directory inside the container
WORKDIR /myapp

# Copy only manifest and lockfile to leverage Docker cache
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (including devDependencies) without modifying lockfile
RUN pnpm install --frozen-lockfile

# Build the application
FROM base AS build

# work directory
WORKDIR /myapp

# Copy full dependencies from deps stage
COPY --from=deps /myapp/node_modules ./node_modules

# Copy Prisma files and run any required Prisma commands (like generate or migrate)
COPY prisma ./prisma
RUN npx prisma generate

# Copy application source code
COPY . .

# Build the app (assumes a build script exists in package.json)
RUN pnpm run build

# Final minimal production image
FROM base

WORKDIR /myapp

# Copy Prisma engine files used in production
COPY --from=build /myapp/node_modules ./node_modules

# Copy the built output and static files
COPY --from=build /myapp/build ./build
COPY --from=build /myapp/public ./public

# Copy essential app files
COPY --from=build /myapp/package.json ./package.json
COPY --from=build /myapp/start.sh ./start.sh
COPY --from=build /myapp/prisma ./prisma

# Make the start script executable
RUN chmod +x ./start.sh

# Use non-root user for security
USER node

# Expose the required port
EXPOSE 3000

# Start the application
ENTRYPOINT ["./start.sh"]
