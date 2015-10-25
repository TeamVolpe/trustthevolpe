from django.conf.urls import url, include
from trust_the_volpe.meme_api.views import list_and_create


urlpatterns = [
    url(r'^memes/', list_and_create),
    # TODO: add deep link
]
