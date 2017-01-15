 # -*- encoding: utf-8 -*-
from optparse import make_option
from django.core.validators  import URLValidator
from django.conf import settings
from django.utils.translation import ugettext as _
from apiclient.discovery import build
from apiclient.errors import HttpError
from .models import PageInsight, RuleResult, Screenshot
from django.core.exceptions import ValidationError


api_key = settings.GOOGLE_API_KEY

from oauth2client.django_orm import FlowField
from oauth2client.django_orm import CredentialsField



def procesRuleMainResourceServerResponseTime(data, key, ruleResult):

    return ruleResult

def processRules(data, pageInsight):
    for key in data:
        ruleResult = RuleResult()
        ruleResult.title = data[key]['localizedRuleName']
        ruleResult.impact = data[key]['ruleImpact']
        ruleResult.pageInsight = pageInsight
        if key == 'MainResourceServerResponseTime':
            server_response_description= data[key]['urlBlocks'][0]['header']['format']
            server_response_time = data[key]['urlBlocks'][0]['header']['args'][0]['value']
            print(server_response_time)
            print(server_response_description)
            server_response_description = server_response_description.replace('RESPONSE_TIME', server_response_time)
            server_response_description = server_response_description.replace('{{', '')
            server_response_description = server_response_description.replace('}}', '')
            ruleResult.description = server_response_description
        else:
            ruleResult.description = data[key]['summary']['format']
        ruleResult.save()


def processPageInsight(data, website):
    pageInsight = PageInsight()
    pageInsight.website = website
    pageInsight.json = data
    pageInsight.responseCode = data["responseCode"]
    pageInsight.title = data["title"]
    pageInsight.score = data["ruleGroups"]["SPEED"]["score"]
    pageInsight.url = data['id']
    pageInsight.numberResources = data['pageStats']["numberResources"]
    pageInsight.numberHosts = data['pageStats']["numberHosts"]
    pageInsight.totalRequestBytes = int(data['pageStats']["totalRequestBytes"])
    pageInsight.numberStaticResources = data['pageStats']["numberStaticResources"]
    pageInsight.htmlResponseBytes = int(data['pageStats']["htmlResponseBytes"])
    pageInsight.cssResponseBytes = int(data['pageStats'].get("cssResponseBytes", 0))
    pageInsight.imageResponseBytes = int(data['pageStats'].get("imageResponseBytes", 0))
    pageInsight.javascriptResponseBytes = int(data['pageStats'].get("javascriptResponseBytes", 0))
    pageInsight.otherResponseBytes = int(data['pageStats'].get("otherResponseBytes", 0))
    pageInsight.numberJsResources = int(data['pageStats'].get("numberJsResources", 0))
    pageInsight.numberCssResources = int(data['pageStats'].get("numberCssResources", 0))
    pageInsight.screenshot = data.get('screenshot', None)
    pageInsight.save()
    return pageInsight


def processPageSpeedAnalysisResults(data, website):
    pageInsight = processPageInsight(data, website)
    processRules(data['formattedResults']['ruleResults'], pageInsight)


def runPageSpeedAnalysis(customer):
    website = customer.customerwebsite
    service = build(serviceName='pagespeedonline', version='v2', developerKey=api_key)
    request = service.pagespeedapi().runpagespeed(url=website.url, locale='ES')
    result = request.execute()
    processPageSpeedAnalysisResults(result, website)
    return result
