from django.conf.urls import url, include
from rest_framework import routers

from trust_the_volpe.meme_api import views


router = routers.DefaultRouter()
router.register(r'memes', views.MemeViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]
