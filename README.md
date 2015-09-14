# trustthevolpe
Trust the Volpe
##Back-end
Python 3 project.
###Installation (assuming on a Mac)
1. (If you've worked with postgres before skip to step 3) Install postgres from its website
* `export PATH=/Library/PostgreSQL/9.4/bin:"$PATH"` (adjust the path to yours, ie other version of postgre)
* Install all required packages: `sudo pip3 install -r requirements.txt`
* Clone `pxg.py` in settings and name it anything, edit it and set that as your settings `export DJANGO_SETTINGS_MODULE=trust_the_volpe.settings.doukasd`
* Migrate / create the db: `python3 manage.py migrate`
* Create an admin: `python3 manage.py createsuperuser`
* Run the test server: `python3 manage.py runserver`
* Check out the api at `http://localhost:8000/meme_api/`

Other shit you might have to do if you haven't worked with Postgre on the Mac before:

* `sudo ln -s /Library/PostgreSQL/9.4/lib/libssl.1.0.0.dylib /usr/local/lib/`
* `sudo ln -s /Library/PostgreSQL/9.4/lib/libcrypto.1.0.0.dylib /usr/local/lib/`
* `sudo mv /usr/lib/libpq.5.dylib /usr/lib/libpq.5.dylib.old`
* `sudo ln -s /Library/PostgreSQL/9.4/lib/libpq.5.dylib /usr/lib/`


##Front-end
Kanish can add some nice information here.