from django.db import models


class Meme(models.Model):
    image = models.ImageField(upload_to='img/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
