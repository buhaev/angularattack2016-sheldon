import os
import logging
import logging.handlers

import tornado.httpclient
import tornado.netutil
import tornado.options
import tornado.locale
import tornado.ioloop
import tornado.httpserver
import tornado.web
from tornado.options import options
from tortik.logger import tortik_log, RequestIdFilter

import config
from handler import PageHandler


class StatusHandler(PageHandler):
    def get(self):
        self.complete({
            'status': True
        })


class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
            (r'/status', StatusHandler),
        ]

        settings = dict(
            cookie_secret='Angular-Sheldon-Attack-2016',
            login_url='/login',
            template_path=os.path.join(os.path.dirname(__file__), 'templates'),
            static_path=os.path.join(os.path.dirname(__file__), 'static'),

            xsrf_cookies=True,
            debug=options.debug,
            autoescape=None,
        )

        tornado.web.Application.__init__(self, handlers, **settings)

        configure_logging()


def configure_logging(logfile=None):
    if logfile:
        handler = logging.handlers.WatchedFileHandler(logfile)
        handler.setFormatter(logging.Formatter(options.log_format))
        tortik_log.addHandler(handler)

    tortik_log.addFilter(RequestIdFilter())
    tortik_log.setLevel(logging.DEBUG)

if __name__ == '__main__':
    tornado.httpclient.AsyncHTTPClient.configure('tornado.curl_httpclient.CurlAsyncHTTPClient', max_clients=30)
    tornado.netutil.Resolver.configure('tornado.platform.caresresolver.CaresResolver')

    tornado.options.parse_command_line()

    logger = logging.getLogger()
    logger.setLevel(options.log_level)

    app = Application()
    http_server = tornado.httpserver.HTTPServer(app)
    port = int(os.environ.get('PORT', 5000))
    http_server.listen(port)

    tornado.ioloop.IOLoop.instance().start()
