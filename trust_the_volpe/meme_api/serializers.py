from django.contrib.auth.models import User, Group
from rest_framework import serializers

from trust_the_volpe.meme_api.models import Meme


class MemeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Meme
        fields = ['image']
