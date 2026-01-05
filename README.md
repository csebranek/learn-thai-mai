[chadsebranek.com/thai](https://chadsebranek.com/thai)

To build and deploy:

`npm install & npm run-script build && cp -r build/* /var/www/html/thai/ && cp -r public/assets/images/* /var/www/html/thai/public/assets/images/`

After adding new words for google to translate, run: 

`python3 tools/translate.py`

And re-run the build above.
