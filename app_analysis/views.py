from django.shortcuts import render


def pageSpeedView(request):
    response = sendRequest()
    res_json = json.dumps(response, sort_keys=True, indent=4)
    return HttpResponse(res_json)
