[chadsebranek.com/thai](https://chadsebranek.com/thai)

## Analytics

This app uses Google Analytics 4 (GA4) for visitor tracking. GA4 natively provides:

- **Geographic location tracking** – automatically tracks visitor country, city, and region via IP-based geolocation
- **Bot detection/filtering** – automatically excludes known bots and spiders using the IAB/ABC International Spiders & Bots List
- **Referral URL tracking** – tracks traffic acquisition sources including referring URLs, organic search, direct traffic, and social media

To enable analytics, copy `.env.example` to `.env` and set your GA4 Measurement ID:

```
REACT_APP_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

You can find your Measurement ID in Google Analytics under Admin > Data Streams > Web.

## Build and Deploy

To build and deploy:

`npm install & npm run-script build && cp -r build/* /var/www/html/thai/ && cp -r public/assets/images/* /var/www/html/thai/public/assets/images/`

After adding new words for google to translate, run: 

`python3 tools/translate.py`

And re-run the build above.
