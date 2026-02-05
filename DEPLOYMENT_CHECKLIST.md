# Pre-Deployment Checklist

Use this checklist before deploying to production.

## ☑️ Before You Start

- [x] Have a DigitalOcean account (or similar VPS provider)
- [ ] Have a domain name ready
- [ ] Have access to domain DNS settings
- [x] Have SSH key generated (`ssh-keygen` if not)
- [ ] Have all required API keys/credentials

## ☑️ Local Preparation

- [ ] Code is tested and working locally
- [ ] All tests pass
- [ ] No security vulnerabilities in dependencies
- [ ] Environment variables documented

## ☑️ Server Setup (First Time Only)

- [x] Created DigitalOcean droplet (Ubuntu 24.04)
- [x] Added SSH key to droplet
- [ ] Can SSH into server successfully
- [ ] Updated system packages (`apt update && apt upgrade`)
- [ ] Configured UFW firewall (ports 22, 80, 443)
- [ ] Installed Docker
- [ ] Installed Docker Compose plugin
- [ ] (Optional) Created non-root user with sudo access

## ☑️ DNS Configuration

- [ ] Created A record pointing to droplet IP
- [ ] Created A record for www subdomain (if needed)
- [ ] DNS propagation completed (use `nslookup your-domain.com`)
- [ ] Can ping domain successfully

## ☑️ Application Configuration

- [ ] Cloned repository to server
- [ ] Created `.env` file from `.env.production` template
- [ ] Set strong MongoDB password in `.env`
- [ ] Generated JWT secret (`openssl rand -base64 32`)
- [ ] Added Firebase credentials (if using)
- [ ] Updated APP_ORIGIN to your domain
- [ ] Updated GOOGLE_CLOUD_PROJECT (if using)
- [ ] Verified all required env vars are set

## ☑️ Security

- [ ] Changed all default passwords
- [ ] JWT_SECRET is strong and unique
- [ ] MONGO_PASSWORD is strong and unique
- [ ] `.env` file is in `.gitignore`
- [ ] No secrets committed to git
- [ ] Firewall is active and configured
- [ ] SSH password login disabled (key-only)

## ☑️ Docker Build Test

On server, verify containers build successfully:

```bash
docker compose build
```

- [ ] All containers built without errors
- [ ] No missing dependencies
- [ ] Build time is reasonable

## ☑️ Initial Deployment

```bash
docker compose up -d
```

- [ ] All containers started successfully
- [ ] No error messages in logs (`docker compose logs`)
- [ ] MongoDB is healthy (`docker compose ps`)
- [ ] Backend is healthy
- [ ] Frontend is accessible via HTTP

## ☑️ SSL Certificate

```bash
./init-ssl.sh your-domain.com your@email.com
```

- [ ] Script ran successfully (test/staging certificate)
- [ ] Re-ran script for production certificate
- [ ] Certificate files exist in `./certbot/conf/`
- [ ] Updated `nginx.conf` with your domain name
- [ ] Uncommented HTTPS server block in `nginx.conf`
- [ ] Uncommented HTTP→HTTPS redirect
- [ ] Restarted nginx (`docker compose up -d nginx`)
- [ ] HTTPS works (visit https://your-domain.com)
- [ ] HTTP redirects to HTTPS
- [ ] SSL certificate is valid (check browser)

## ☑️ Functionality Testing

- [ ] Homepage loads correctly
- [ ] Can register/login
- [ ] API endpoints working (`/api/...`)
- [ ] Static assets loading
- [ ] No console errors in browser
- [ ] Mobile responsive
- [ ] All major features working

## ☑️ Monitoring & Maintenance

- [ ] Logs are accessible (`docker compose logs -f`)
- [ ] Container health checks working
- [ ] Resource usage is acceptable (`docker stats`)
- [ ] Disk space is adequate (`df -h`)
- [ ] Backup strategy documented
- [ ] Know how to perform MongoDB backup
- [ ] SSL auto-renewal is configured (certbot container)

## ☑️ Documentation

- [ ] Deployment process documented
- [ ] Environment variables documented
- [ ] Backup/restore process documented
- [ ] Troubleshooting steps documented
- [ ] Team members have access to:
  - [ ] Server SSH access
  - [ ] Git repository
  - [ ] Domain DNS settings
  - [ ] Environment variables

## ☑️ Optional Enhancements

- [ ] Set up automated backups (cron job)
- [ ] Configure log rotation
- [ ] Install fail2ban for brute force protection
- [ ] Set up monitoring/alerts (UptimeRobot, etc.)
- [ ] Configure CDN (Cloudflare, etc.)
- [ ] Add Redis for caching (if needed)
- [ ] Set up CI/CD pipeline

## ☑️ Post-Deployment

- [ ] Verify uptime after 24 hours
- [ ] Check logs for errors
- [ ] Test all critical user flows
- [ ] Verify backup system working
- [ ] Update README with production URL
- [ ] Notify team deployment is complete

## 🚨 Emergency Rollback Plan

If deployment fails:

```bash
# View errors
docker compose logs

# Stop all services
docker compose down

# Fix issues in code/config
# ...

# Rebuild and redeploy
docker compose up -d --build
```

If data is corrupted:

```bash
# Stop services
docker compose down

# Restore MongoDB backup
# (see DEPLOYMENT.md for backup/restore instructions)

# Restart services
docker compose up -d
```

## 📞 Support Contacts

- **Domain Registrar Support**: **\*\***\_**\*\***
- **DigitalOcean Support**: **\*\***\_**\*\***
- **Team Lead**: **\*\***\_**\*\***
- **DevOps Contact**: **\*\***\_**\*\***

## 📝 Notes

Additional notes or environment-specific considerations:

---

---

---

---

**Date Completed**: **\*\***\_\_\_**\*\***
**Deployed By**: **\*\***\_\_\_**\*\***
**Production URL**: https://**\*\***\_\_\_**\*\***
**Server IP**: **\*\***\_\_\_**\*\***
