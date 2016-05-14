from tornado.options import define
import logging

# define('port', default=5000, type=int, help='Port to run on')
# define('host', default='127.0.0.1', help='Host to run on')

define('log_filename', default='sheldon.log', help='log filename')
define('log_level', default=logging.DEBUG, help='log level')
define('log_format', default='[%(process)s] %(asctime)s %(levelname)s %(name)s: %(message)s')

define('google_api_key', default='791129784228-uiaq4sl4km3q3b9buaj99q167sg4g16b.apps.googleusercontent.com',
       help='Google API Key')
define('google_api_secret', default='4SHyHJKRUqqt_mKQserI_2tk', help='Google API Secret')

define('static_host', default='')
