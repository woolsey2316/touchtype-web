# Docker Setup - Summary of Changes

## Files Created/Modified

### New Files

1. **`app/Dockerfile`** - Production-ready frontend container
2. **`docker-compose.yml`** - Multi-container orchestration (root level)
3. **`nginx.conf`** - Reverse proxy configuration (root level)
4. **`.env.production`** - Environment variables template
5. **`.dockerignore`** - Root level Docker ignore rules
6. **`app/.dockerignore`** - Frontend Docker ignore rules
7. **`init-ssl.sh`** - Automated SSL certificate setup script
8. **`DEPLOYMENT.md`** - Complete deployment guide
9. **`DOCKER_QUICKREF.md`** - Quick reference for Docker commands

### Modified Files

1. **`server/Dockerfile`** - Updated to use Node 20, multi-stage build, and security best practices
2. **`.gitignore`** - Added Docker-related directories (certbot/, mongodb_data/)

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                   DigitalOcean Droplet              │
│                                                     │
│  ┌───────────────────────────────────────────────┐ │
│  │              NGINX (Port 80/443)              │ │
│  │         SSL Termination & Routing             │ │
│  └─────────┬─────────────────────┬────────────────┘ │
│            │                     │                   │
│            │                     │                   │
│  ┌─────────▼────────┐  ┌────────▼────────┐         │
│  │    Frontend      │  │    Backend      │         │
│  │   (React/Vite)   │  │  (Express.js)   │         │
│  │   Port: 80       │  │   Port: 3000    │         │
│  └──────────────────┘  └────────┬────────┘         │
│                                 │                   │
│                        ┌────────▼────────┐         │
│                        │    MongoDB      │         │
│                        │   Port: 27017   │         │
│                        └─────────────────┘         │
│                                                     │
└─────────────────────────────────────────────────────┘

         Volume: mongodb_data (persistent storage)
```

## Container Details

### 1. MongoDB Container

- **Image**: `mongo:7-jammy` (official MongoDB 7 on Ubuntu Jammy)
- **Persistent Storage**: Docker volume `mongodb_data`
- **Authentication**: Admin user with credentials from `.env`
- **Health Check**: Automatic ping test every 10 seconds
- **Port**: 27017 (internal only, not exposed externally)

### 2. Backend Container

- **Base Image**: `node:20-alpine` (lightweight Linux)
- **Build Process**:
  - Multi-stage build (builder + production)
  - Production dependencies only in final image
  - Non-root user for security
- **Port**: 3000 (internal only)
- **Health Check**: HTTP GET to `/health` endpoint
- **Dependencies**: Waits for MongoDB to be healthy before starting

### 3. Frontend Container

- **Build Stage**: `node:20-alpine` for building React app
- **Production Stage**: `nginx:alpine` serving static files
- **SPA Routing**: Configured to handle React Router
- **Port**: 80 (internal only)
- **Build Args**: API_ORIGIN, APP_ENV, APP_NAME, etc.

### 4. Nginx Reverse Proxy

- **Image**: `nginx:alpine`
- **Ports**: 80 (HTTP), 443 (HTTPS)
- **Routing**:
  - `/api/*` → Backend container (port 3000)
  - `/*` → Frontend container (port 80)
- **SSL**: Let's Encrypt certificates via Certbot
- **Features**: Gzip compression, HTTP/2, security headers

### 5. Certbot Container

- **Image**: `certbot/certbot`
- **Purpose**: Automatic SSL certificate renewal
- **Schedule**: Checks for renewal every 12 hours
- **Volumes**: Shares certificates with Nginx

## Key Features

### Security

- ✅ Non-root users in containers
- ✅ Production dependencies only
- ✅ SSL/TLS encryption (HTTPS)
- ✅ MongoDB authentication required
- ✅ Secrets managed via environment variables
- ✅ Health checks for all services

### Performance

- ✅ Multi-stage builds (smaller images)
- ✅ Gzip compression
- ✅ HTTP/2 support
- ✅ Nginx keepalive connections
- ✅ Static file caching

### Reliability

- ✅ Automatic container restart on failure
- ✅ Health checks with auto-recovery
- ✅ Service dependencies properly configured
- ✅ Persistent MongoDB data
- ✅ Automatic SSL renewal

## Environment Variables

Required variables in `.env`:

```bash
# MongoDB
MONGO_USERNAME=admin
MONGO_PASSWORD=<strong-password>
MONGO_DATABASE=touchtype

# Backend
JWT_SECRET=<generate-with-openssl>
NODE_ENV=production
FIREBASE_CREDENTIALS=<firebase-json>

# Frontend
APP_ORIGIN=https://your-domain.com
GOOGLE_CLOUD_PROJECT=<project-id>
```

## Deployment Workflow

### Initial Setup (One-time)

1. Create DigitalOcean droplet (Ubuntu 24.04)
2. Install Docker and Docker Compose
3. Clone repository
4. Configure `.env` file
5. Start containers: `docker compose up -d --build`
6. Set up SSL with `./init-ssl.sh`
7. Update `nginx.conf` with domain
8. Restart nginx

### Updates (Ongoing)

1. Pull latest code: `git pull`
2. Rebuild containers: `docker compose up -d --build`
3. Check logs: `docker compose logs -f`

## Estimated Costs

**DigitalOcean Droplet**: $6-8/month

- 1 vCPU, 1GB RAM, 25GB SSD
- Sufficient for small to medium traffic
- Can scale up if needed

**Domain**: ~$12/year (varies)

**SSL Certificate**: Free (Let's Encrypt)

**Total**: ~$7-9/month

## Resource Requirements

### Minimum (Development/Small Traffic)

- 1GB RAM
- 1 vCPU
- 25GB SSD

### Recommended (Production/Medium Traffic)

- 2GB RAM
- 1-2 vCPU
- 50GB SSD

### Monitoring Thresholds

- CPU: Alert if >80% sustained
- RAM: Alert if >85% usage
- Disk: Alert if >80% full
- MongoDB connections: Monitor via logs

## Next Steps

1. **Test Locally** (Optional):

   ```bash
   docker compose up -d --build
   curl http://localhost
   ```

2. **Deploy to DigitalOcean**:

   - Follow [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed steps

3. **Monitor**:

   - Set up alerts for resource usage
   - Monitor logs regularly
   - Schedule MongoDB backups

4. **Optimize** (After Deployment):
   - Add Redis for session management (optional)
   - Set up CDN for static assets (optional)
   - Configure log rotation
   - Set up automated backups

## Troubleshooting Resources

- **Deployment Guide**: `DEPLOYMENT.md`
- **Quick Reference**: `DOCKER_QUICKREF.md`
- **Container Logs**: `docker compose logs -f <service>`
- **Health Status**: `docker compose ps`

## Important Notes

⚠️ **Before Going Live**:

- [ ] Change all default passwords
- [ ] Generate strong JWT_SECRET
- [ ] Configure Firebase credentials
- [ ] Update APP_ORIGIN to your domain
- [ ] Test SSL certificate
- [ ] Set up backups
- [ ] Configure monitoring

⚠️ **Security**:

- Never commit `.env` file to git
- Use strong, unique passwords
- Rotate secrets periodically
- Keep Docker images updated
- Monitor security advisories

⚠️ **Data Persistence**:

- MongoDB data is stored in Docker volume `mongodb_data`
- This persists even when containers are stopped/removed
- To completely reset, use `docker compose down -v` (WARNING: deletes data)

## Support

For issues or questions:

1. Check the logs: `docker compose logs -f`
2. Review DEPLOYMENT.md for detailed instructions
3. Verify environment variables in `.env`
4. Check Docker container status: `docker compose ps`
