#!/bin/bash
set -e

echo "Building ADIX MEDIA..."
npm run build

echo "Uploading to Vercel via API..."
# Compress dist folder
cd /c/Users/DELL/projects/adixmedia-new
tar -czf dist.tar.gz dist/

echo "Deployment package ready: $(ls -lh dist.tar.gz | awk '{print $5}')"

# Create deployment via API (requires VERCEL_TOKEN)
if [ -n "$VERCEL_TOKEN" ]; then
    echo "Deploying with token..."
    curl -X POST \
      "https://api.vercel.com/v23/integrations/deploy/prj_ZzIBRIOX85t3vdbiOCaTvkAmmmVs?forceNew=1" \
      -H "Authorization: Bearer $VERCEL_TOKEN" \
      -H "Content-Type: application/json" \
      -d '{"force":true,"git":"{}"}' \
      | jq '.url, .readyState'
else
    echo "VERCEL_TOKEN not set. Please set it manually or use vercel login."
    echo "Alternative: deploy via GitHub integration at https://vercel.com/ahmed-hasno/adixmedia-new"
fi