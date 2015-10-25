from django.conf.urls import url, include
from trust_the_volpe.meme_api.views import meme_list_and_create, meme_details


urlpatterns = [
    url(r'^memes/$', meme_list_and_create),
    url(r'^memes/(?P<meme_id>[-\d]+)$', meme_details),
]
