# Security Configuration

## CORS (Cross-Origin Resource Sharing)

The API implements strict CORS validation to prevent unauthorized access from unknown domains.

### Configuration

CORS is configured via the `ORIGIN` environment variable in `.env.{environment}.local` files:

```bash
# Development (.env.development.local)
ORIGIN = http://localhost:5173,http://127.0.0.1:5173

# Production (.env.production.local)
ORIGIN = https://yourdomain.com,https://www.yourdomain.com
```

### Features

1. **Whitelist-based validation**: Only domains listed in `ORIGIN` are allowed
2. **Comma-separated origins**: Supports multiple authorized domains
3. **Dynamic validation**: Each request's origin is checked against the whitelist
4. **Security logging**: Unauthorized requests are logged with warnings
5. **Strict methods**: Only allows GET, POST, PUT, DELETE, PATCH, OPTIONS
6. **Controlled headers**: Restricts allowed and exposed headers
7. **Preflight caching**: 10-minute cache for OPTIONS requests

### How It Works

```typescript
origin: (origin, callback) => {
  // Allow requests with no origin (mobile apps, server-to-server)
  if (!origin) return callback(null, true);

  // Check whitelist
  if (allowedOrigins.includes(origin)) return callback(null, true);

  // Reject and log unauthorized origins
  logger.warn(`Blocked CORS request from: ${origin}`);
  return callback(new Error("Not allowed by CORS"));
};
```

### Updating Production Origins

**IMPORTANT**: Before deploying to production:

1. Update `.env.production.local`:

   ```bash
   ORIGIN = https://yourdomain.com,https://www.yourdomain.com
   ```

2. Include all necessary variants:

   - Main domain: `https://yourdomain.com`
   - WWW variant: `https://www.yourdomain.com`
   - Staging: `https://staging.yourdomain.com` (if applicable)

3. **Never** use wildcards (`*`) in production

### Testing CORS

Test unauthorized access:

```bash
curl -H "Origin: https://evil.com" \
     -H "Access-Control-Request-Method: GET" \
     -X OPTIONS http://localhost:3001/api/users
```

Expected: Blocked with error

Test authorized access:

```bash
curl -H "Origin: http://localhost:5173" \
     -H "Access-Control-Request-Method: GET" \
     -X OPTIONS http://localhost:3001/api/users
```

Expected: Success with CORS headers

### Additional Security Measures

The server also implements:

- **Helmet.js**: Sets security HTTP headers
- **HPP**: HTTP Parameter Pollution protection
- **Credentials support**: Allows cookies/auth headers when needed
- **Method restrictions**: Only allows necessary HTTP methods
- **Header controls**: Limits exposed headers to prevent data leakage
