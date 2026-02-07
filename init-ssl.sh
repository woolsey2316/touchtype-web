#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== TouchType Web - SSL Certificate Setup ===${NC}\n"

# Check if domain is provided
if [ -z "$1" ]; then
    echo -e "${RED}Error: Domain name required${NC}"
    echo "Usage: ./init-ssl.sh your-domain.com your-email@example.com"
    exit 1
fi

if [ -z "$2" ]; then
    echo -e "${RED}Error: Email address required${NC}"
    echo "Usage: ./init-ssl.sh your-domain.com your-email@example.com"
    exit 1
fi

DOMAIN=$1
EMAIL=$2

echo -e "${YELLOW}Domain:${NC} $DOMAIN"
echo -e "${YELLOW}Email:${NC} $EMAIL\n"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}Error: Docker is not running${NC}"
    exit 1
fi

# Create certbot directories
echo -e "${GREEN}Creating certbot directories...${NC}"
mkdir -p ./certbot/conf
mkdir -p ./certbot/www

# Stop nginx if running
echo -e "${GREEN}Stopping nginx...${NC}"
docker compose stop nginx 2>/dev/null || true

# Get SSL certificate
echo -e "${GREEN}Obtaining SSL certificate for $DOMAIN...${NC}"
docker compose run --rm certbot certonly --standalone \
  --preferred-challenges http \
  -d $DOMAIN \
  -d www.$DOMAIN \
  --email $EMAIL \
  --agree-tos \
  --non-interactive \
  --staging

if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}✓ SSL certificate obtained successfully!${NC}\n"

    echo -e "${YELLOW}Next steps:${NC}"
    echo "1. If this was a test (staging), run again without --staging flag"
    echo "2. Update nginx.conf:"
    echo "   - Replace 'your-domain.com' with '$DOMAIN'"
    echo "   - Uncomment the HTTPS server block"
    echo "   - Uncomment the HTTP to HTTPS redirect"
    echo "3. Run: docker compose up -d nginx"
    echo "4. Test: https://$DOMAIN"
else
    echo -e "\n${RED}✗ Failed to obtain SSL certificate${NC}"
    echo -e "${YELLOW}Troubleshooting:${NC}"
    echo "- Make sure $DOMAIN points to this server's IP"
    echo "- Check if ports 80 and 443 are open in firewall"
    echo "- Verify DNS with: nslookup $DOMAIN"
    exit 1
fi
