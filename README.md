To build and deploy:

`npm run-script build && cp -r build/* /var/www/html/ && cp -r public/assets/images/* /var/www/html/public/assets/images/`

After adding new words for google to translate, run: 

`python3 tools/translate.py`

And re-run the build above.
