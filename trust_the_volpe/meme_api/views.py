import base64
import json
import uuid

from django.core.files.base import ContentFile
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render

from trust_the_volpe.meme_api.models import Meme


def meme_list_and_create(request):
    if request.body:
        meme_create(request.body)
    memes = Meme.objects.all()
    # TODO: add detail url, use github style name
    meme_list = [api_meme_render(meme) for meme in memes]
    return HttpResponse(json.dumps(meme_list), content_type='application/json')


def meme_details(request, meme_id):
    meme = get_object_or_404(Meme, pk=meme_id)
    return HttpResponse(
        json.dumps(api_meme_render(meme)), content_type='application/json')


def api_meme_render(meme):
    return {'id': meme.id, 'image': meme.image.url}


def meme_create(request_body):
    data_dict = json.loads(request_body.decode())
    image_data = get_image_data(data_dict['image'])
    content_file = ContentFile(image_data)

    meme = Meme()
    filename = '{0}.jpg'.format(uuid.uuid4())
    meme.image.save(filename, content_file)
    meme.save()


def get_image_data(image_data_base64_with_headers):
    """
    Image data is a string and base64 encoded. Return a string of decoded
    data without any headers.
    """
    image_data_base64 = remove_headers(image_data_base64_with_headers)
    image_bytes_base64 = str.encode(image_data_base64)
    return base64.b64decode(image_bytes_base64)


def remove_headers(base64_data):
    """
    If header data such as "data:image/jpeg;base64," exists in the data
    remove it
    """
    if ',' in base64_data:
        return base64_data.split(',', 1)[1]
    return base64_data
