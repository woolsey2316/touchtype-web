# TouchType Web - Docker Quick Reference

## Local Development

### Start all services

```bash
docker compose up -d
```

### View logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f mongodb
```

### Rebuild after code changes

```bash
# Rebuild specific service
docker compose up -d --build backend

# Rebuild all
docker compose up -d --build
```

### Stop all services

```bash
docker compose down
```

### Reset everything (WARNING: Deletes data)

```bash
docker compose down -v
```

## Production Deployment

### Initial Setup

```bash
# 1. Clone repository
git clone https://github.com/yourusername/touchtype-web.git
cd touchtype-web

# 2. Configure environment
cp .env.production .env
nano .env  # Edit with your values

# 3. Start services
docker compose up -d --build
```

### SSL Certificate Setup

```bash
# Run the helper script
./init-ssl.sh your-domain.com your-email@example.com

# After successful test certificate, get production cert:
# Edit init-ssl.sh and remove the --staging flag, then run again
./init-ssl.sh your-domain.com your-email@example.com

# Update nginx.conf with your domain and uncomment HTTPS block
nano nginx.conf

# Restart nginx
docker compose up -d nginx
```

### Updates

```bash
# Pull latest code
git pull

# Rebuild and restart
docker compose up -d --build
```

## Useful Commands

### Check container status

```bash
docker compose ps
```

### Execute command in container

```bash
# Backend shell
docker compose exec backend sh

# MongoDB shell
docker compose exec mongodb mongosh -u admin -p your_password
```

### Backup MongoDB

```bash
docker compose exec mongodb mongodump \
  --username admin \
  --password your_password \
  --authenticationDatabase admin \
  --out /data/backup

docker cp touchtype-mongodb:/data/backup ./backup-$(date +%Y%m%d)
```

### Restore MongoDB

```bash
docker cp ./backup touchtype-mongodb:/data/restore
docker compose exec mongodb mongorestore \
  --username admin \
  --password your_password \
  --authenticationDatabase admin \
  /data/restore
```

### Monitor resource usage

```bash
docker stats
```

### Clean up unused Docker resources

```bash
docker system prune -a
```

## Troubleshooting

### Container won't start

```bash
# Check logs
docker compose logs <service-name>

# Check service health
docker compose ps
```

### Can't connect to MongoDB

```bash
# Verify MongoDB is running
docker compose exec mongodb mongosh --eval "db.adminCommand('ping')"

# Check connection string in .env
cat .env | grep MONGO_URI
```

### Nginx errors

```bash
# Test nginx configuration
docker compose exec nginx nginx -t

# Reload nginx
docker compose exec nginx nginx -s reload
```

### Permission issues

```bash
# Check file permissions
ls -la

# Fix ownership if needed
sudo chown -R $USER:$USER .
```

## Environment Variables

Required in `.env`:

- `MONGO_USERNAME` - MongoDB admin username
- `MONGO_PASSWORD` - MongoDB admin password (use strong password!)
- `MONGO_DATABASE` - Database name
- `JWT_SECRET` - Secret for JWT tokens (generate with `openssl rand -base64 32`)
- `FIREBASE_CREDENTIALS` - Firebase admin credentials (if using Firebase auth)

## File Structure

```
touchtype-web/
├── app/                    # Frontend React app
│   ├── Dockerfile         # Frontend container config
│   └── .dockerignore      # Files to exclude from build
├── server/                 # Backend Express API
│   ├── Dockerfile         # Backend container config
│   └── .dockerignore      # Files to exclude from build
├── docker-compose.yml      # Multi-container orchestration
├── nginx.conf             # Reverse proxy configuration
├── .env                   # Environment variables (DO NOT COMMIT)
├── .env.production        # Template for production env vars
├── init-ssl.sh            # SSL certificate setup script
└── DEPLOYMENT.md          # Full deployment guide
```

## Security Checklist

- [ ] Strong MongoDB password set
- [ ] Strong JWT_SECRET generated
- [ ] .env file not committed to git
- [ ] Firewall configured (ports 22, 80, 443 only)
- [ ] SSL certificate installed
- [ ] Regular backups scheduled
- [ ] Automatic security updates enabled
- [ ] Fail2ban installed (optional but recommended)

## Support

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)
