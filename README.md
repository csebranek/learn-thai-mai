[chadsebranek.com/projects/thai](https://chadsebranek.com/projects/thai)

## Analytics

Analytics are injected automatically by the web server (Apache `mod_substitute`
adds the site-wide GA4 tag to every page under `/projects/`), so this app needs
no tracking code of its own.

## Build and Deploy

To build and deploy:

`npm install && npm run-script build && cp -r build/* /var/www/html/thai/ && cp -r public/assets/images/* /var/www/html/thai/public/assets/images/`

After adding new words for google to translate, run: 

`python3 tools/translate.py`

And re-run the build above.
