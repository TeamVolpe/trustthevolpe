import os

from trust_the_volpe.settings import *  # noqa

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": "trust_the_volpe",
        "USER": "trust_the_volpe",
        #"PASSWORD": "",
        #"HOST": "localhost",
        #"PORT": "",
    }
}

DEFAULT_FILE_STORAGE = 'storages.backends.s3boto.S3BotoStorage'
AWS_ACCESS_KEY_ID = os.environ['AWS_ACCESS_KEY_ID']
AWS_SECRET_ACCESS_KEY = os.environ['AWS_SECRET_ACCESS_KEY']
AWS_STORAGE_BUCKET_NAME = 'trust-the-volpe'
AWS_QUERYSTRING_AUTH = False
