import pycurl
from tortik.page import RequestHandler
import tornado.httpclient
from tornado.options import options
from tornado.web import HTTPError


class PageHandler(RequestHandler):
    preprocessors = []
    postprocessors = []

    def get_static_host(self, include_host=None):
        if options.static_host:
            return options.static_host
        elif include_host:
            return 'http://' + self.request.host

        return ''

    def static_url(self, path, include_host=None, **kwargs):
        return self.get_static_host(include_host=True) + \
               RequestHandler.static_url(self, path, None, **kwargs)


    def make_request(self, *args, **kwargs):
        def _curl_opt(curl):
            curl.setopt(pycurl.FRESH_CONNECT, 1)
            curl.setopt(pycurl.FORBID_REUSE, 1)

        kwargs['prepare_curl_callback'] = _curl_opt

        return RequestHandler.make_request(self, *args, **kwargs)
