# Use bun base image
FROM oven/bun:1

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lock* ./

# Install dependencies with bun
RUN bun install --frozen-lockfile

# Copy source code
# THIS IS INSANE SYNTAX
# ABSOLUTE NONSENSE
COPY . .

# No need to expose a port to HTTP requests, the bot works via web socket connections and doesn't accept TCP/UDP connections.

# Start the server
CMD ["bun", "start"]
