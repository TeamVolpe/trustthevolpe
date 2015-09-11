from django.conf.urls import include, url
from django.contrib import admin

from trust_the_volpe.meme_api import urls as meme_api_urls


urlpatterns = [
    url(r'^meme_api/', include(meme_api_urls)),
    url(r'^admin/', include(admin.site.urls)),
]
