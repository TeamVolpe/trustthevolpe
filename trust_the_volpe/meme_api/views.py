import json
import base64

from django.shortcuts import render
from django.http import HttpResponse
from django.core.files.base import ContentFile

from trust_the_volpe.meme_api.models import Meme


def list_and_create(request):
    if request.body:
        create_meme(request.body)

    # TODO: make dynamic hit the DB
    memes = [
        {
            'id': 1,
            'image': 'https://trust-the-volpe.s3.amazonaws.com/img/IMG_1294.PNG?Signature=dCZ4qfXfo7E4LLlcIc%2FURdUDlqI%3D&Expires=1445688716&AWSAccessKeyId=AKIAJ3NWBC5CALNUM5SA',
        },
        {
            'id': 2,
            'image': 'https://trust-the-volpe.s3.amazonaws.com/img/IMG_1294.PNG?Signature=dCZ4qfXfo7E4LLlcIc%2FURdUDlqI%3D&Expires=1445688716&AWSAccessKeyId=AKIAJ3NWBC5CALNUM5SA',
        }
    ]
    return HttpResponse(json.dumps(memes), content_type='application/json')


def create_meme(request_body):
    data_dict = json.loads(request_body.decode())
    image_data = get_image_data(data_dict['image'])
    content_file = ContentFile(image_data)
    meme = Meme()
    # TODO: use UUID for file name
    meme.image.save('placeholder_name.jpg', content_file)
    meme.save()


def get_image_data(image_data_base64_with_headers):
    """
    Image data is a string and base64 encoded. We return a string of encoded
    data without any headers
    """
    # Will we ever have headerless data? if so deal with this
    # Remove the "data:image/jpeg;base64," header
    image_data_base64 = image_data_base64_with_headers.split(',', 1)[1]
    image_bytes_base64 = str.encode(image_data_base64)
    return base64.b64decode(image_bytes_base64)
