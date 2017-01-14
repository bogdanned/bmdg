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


def processPageStats(data, pageInsight):
    pageStat = PageStats()
    pageStat.numberResources = data["numberResources"]
    pageStat.numberHosts = data["numberHosts"]
    pageStat.totalRequestBytes = int(data["totalRequestBytes"])
    pageStat.numberStaticResources = data["numberStaticResources"]
    pageStat.htmlResponseBytes = int(data["htmlResponseBytes"])
    pageStat.cssResponseBytes = int(data["cssResponseBytes"])
    pageStat.imageResponseBytes = int(data["imageResponseBytes"])
    pageStat.javascriptResponseBytes = int(data["javascriptResponseBytes"])
    pageStat.otherResponseBytes = int(data["otherResponseBytes"])
    pageStat.numberJsResources = int(data["numberJsResources"])
    pageStat.numberCssResources = int(data["numberCssResources"])
    pageStat.pageInsight = pageInsight
    pageStat.save()
    return pageStat


def processRules(data, pageInsight):
    for key in data:
        ruleResult = RuleResult()
        ruleResult.title = data[key]['localizedRuleName']
        ruleResult.impact = data[key]['ruleImpact']
        ruleResult.description = data[key]['urlBlocks'][0]['header']['format']
        ruleResult.pageInsight = pageInsight
        ruleResult.save()


def processPageInsight(data):
    pageInsight = PageInsight()
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


def processPageSpeedAnalysisResults(data):
    pageInsight = processPageInsight(data)
    processRules(data['formattedResults']['ruleResults'], pageInsight)
    pageStats = processPageStats(data)


def runPageSpeedAnalysis(url):
    service = build(serviceName='pagespeedonline', version='v2', developerKey=api_key)
    request = service.pagespeedapi().runpagespeed(url=url)
    result = request.execute()
    processPageSpeedAnalysisResults(result)
    return result
