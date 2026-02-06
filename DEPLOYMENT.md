# TouchType Web - DigitalOcean Deployment Guide

This guide will help you deploy the TouchType Web application on a DigitalOcean droplet with Docker.

## Prerequisites

- A domain name pointing to your droplet's IP
- DigitalOcean account
- SSH access configured

## Step 1: Create DigitalOcean Droplet

1. **Create a new droplet:**

   - Ubuntu 24.04 LTS
   - Basic plan: $6/month (1GB RAM, 1 vCPU, 25GB SSD)
   - Choose a datacenter region close to your users
   - Add your SSH key for secure access

2. **Note your droplet's IP address**

## Step 2: Initial Server Setup

SSH into your server:

```bash
ssh root@your_droplet_ip
```

Update system packages:

```bash
apt update && apt upgrade -y
```

Set up firewall:

```bash
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

Install Docker and Docker Compose:

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
apt install docker-compose-plugin -y

# Verify installation
docker --version
docker compose version
```

Create a non-root user (optional but recommended):

```bash
adduser deployer
usermod -aG sudo deployer
usermod -aG docker deployer
```

## Step 3: Deploy Your Application

Clone your repository:

```bash
cd /opt
git clone https://github.com/woolsey2316/keyflow.git
cd keyflow
```

Set up environment variables:

```bash
cp .env.production .env
nano .env
```

Edit the `.env` file with your actual values:

- Set a strong `MONGO_PASSWORD`
- Set a strong `JWT_SECRET` (use: `openssl rand -base64 32`)
- Add your `FIREBASE_CREDENTIALS` if needed
- Configure any other environment variables

## Step 4: Start the Application (HTTP First)

Build and start containers:

```bash
docker compose up -d --build
```

Check if containers are running:

```bash
docker compose ps
```

View logs:

```bash
docker compose logs -f
```

Test the application:

```bash
curl http://your_droplet_ip
```

## Step 5: Configure Domain and SSL

### Update DNS Records

Point your domain to your droplet's IP:

```
Type: A
Name: @ (or your subdomain)
Value: your_droplet_ip
TTL: 3600
```

Wait for DNS propagation (5-30 minutes). Check with:

```bash
nslookup your-domain.com
```

### Obtain SSL Certificate

Stop nginx temporarily:

```bash
docker compose stop nginx
```

Get the SSL certificate:

```bash
docker compose run --rm certbot certonly --standalone \
  --preferred-challenges http \
  -d your-domain.com \
  -d www.your-domain.com \
  --email your-email@example.com \
  --agree-tos \
  --non-interactive
```

Update `nginx.conf`:

```bash
nano nginx.conf
```

Make these changes:

1. Replace `your-domain.com` with your actual domain (2 places in the HTTPS server block)
2. Uncomment the HTTPS server block (lines starting with #)
3. Uncomment the redirect in the HTTP server block
4. Comment out the temporary HTTP content serving

Restart nginx:

```bash
docker compose up -d nginx
```

### Test SSL

Visit `https://your-domain.com` to verify SSL is working.

## Step 6: Automatic SSL Renewal

The certbot container automatically renews certificates. To test renewal:

```bash
docker compose run --rm certbot renew --dry-run
```

## Management Commands

### View logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f nginx
docker compose logs -f mongodb
```

### Restart services

```bash
# All services
docker compose restart

# Specific service
docker compose restart backend
```

### Update application

```bash
cd /opt/keyflow
git pull
docker compose up -d --build
```

### Backup MongoDB

```bash
docker compose exec mongodb mongodump \
  --username admin \
  --password your_mongo_password \
  --authenticationDatabase admin \
  --out /data/backup

# Copy backup from container
docker cp touchtype-mongodb:/data/backup ./mongodb-backup-$(date +%Y%m%d)
```

### Stop all services

```bash
docker compose down
```

### Stop and remove everything (including volumes)

```bash
docker compose down -v
```

## Monitoring

Check resource usage:

```bash
# Docker stats
docker stats

# System resources
htop
df -h
```

## Troubleshooting

### Container won't start

```bash
docker compose logs <service-name>
```

### MongoDB connection issues

```bash
docker compose exec backend sh
# Inside container:
ping mongodb
```

### Nginx configuration errors

```bash
docker compose exec nginx nginx -t
```

### Reset everything and start fresh

```bash
docker compose down -v
docker compose up -d --build
```

## Security Recommendations

1. **Change default passwords** in `.env`
2. **Enable automatic security updates:**
   ```bash
   apt install unattended-upgrades
   dpkg-reconfigure -plow unattended-upgrades
   ```
3. **Set up fail2ban** to prevent brute force attacks:
   ```bash
   apt install fail2ban
   systemctl enable fail2ban
   ```
4. **Regular backups** of MongoDB data
5. **Monitor logs** for suspicious activity
6. **Keep Docker images updated:**
   ```bash
   docker compose pull
   docker compose up -d
   ```

## Cost Optimization

- Start with the $6/month droplet
- Monitor resource usage with `htop` and `docker stats`
- Upgrade to $8 or $12 plan if needed
- MongoDB data persists in a volume, so safe to restart/resize droplet

## Support

For issues:

1. Check application logs: `docker compose logs`
2. Check container status: `docker compose ps`
3. Verify environment variables in `.env`
4. Review nginx configuration: `docker compose exec nginx nginx -t`
