from django.shortcuts import render
from rest_framework import viewsets

from trust_the_volpe.meme_api.models import Meme
from trust_the_volpe.meme_api.serializers import MemeSerializer


class MemeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows memes to be viewed, created or edited.
    """
    queryset = Meme.objects.all()
    serializer_class = MemeSerializer
