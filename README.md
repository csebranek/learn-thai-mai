[chadsebranek.com/thai](https://chadsebranek.com/thai)

## Analytics

This app uses Firebase Analytics (same config as the parent site `chadsebranek.com`). The tracking script is in `public/index.html`. If the Firebase project or measurement ID changes, update the `firebaseConfig` in that file to match the parent site.

## Build and Deploy

To build and deploy:

`npm install & npm run-script build && cp -r build/* /var/www/html/thai/ && cp -r public/assets/images/* /var/www/html/thai/public/assets/images/`

After adding new words for google to translate, run: 

`python3 tools/translate.py`

And re-run the build above.
