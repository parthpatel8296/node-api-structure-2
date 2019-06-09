// Internal Api Import
const path = require('path');

// External Api Import
const convict = require('convict');

const config = convict({
    env: {
        doc: 'The applicaton environment.',
        format: ['production', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV',
        arg: 'env'
    },
    server: {
        http: {
            port: {
                doc: 'HTTP port to bind',
                format: 'port',
                default: 8000,
                env: 'PORT'
            },
            ip: {
                doc: 'The IP address to bind.',
                format: 'ipaddress',
                default: 'localhost',
                env: 'IP_ADDRESS'
            }
        },
        enableRequestLog: {
            doc: 'To enable request log on server',
            format: Boolean,
            default: true
        },
        enableSessionMongoDB: {
            doc: 'To Check Whether we need to enable Session Or not',
            format: Boolean,
            default: false
        },
        enableSeedDB: {
            doc: 'Populate DB with sample data on server',
            format: Boolean,
            default: false
        },
        enablePassport: {
            doc: 'To Check Whether we need to enable Passport Or not',
            format: Boolean,
            default: false
        },
        enableWebSockets: {
            doc: 'To enable websockets in app',
            format: Boolean,
            default: false
        },
        https: {
            enableHttpsServer: {
                doc: 'Enable https server',
                format: Boolean,
                default: false
            },
            port: {
                doc: 'HTTPS port to bind',
                format: 'port',
                default: 3001,
                env: 'HTTPSPORT'
            },
            privateKey: {
                doc: 'Private key file name',
                format: String,
                default: ''
            },
            certificate: {
                doc: 'Certificate file name',
                format: String,
                default: ''
            }
        },
        enableHttpLogging: {
            doc: 'Enable HTTP Logging',
            format: Boolean,
            default: true
        },
        enableCompression: {
            doc: 'Enable HTTP compression',
            format: Boolean,
            default: false
        },
        enableStatic: {
            doc: 'Enable Express static server',
            format: Boolean,
            default: true
        },
        static: {
            directory: {
                doc: 'Express static server content directory',
                format: String,
                default: '../../public'
            },
            options: {
                doc: 'Express static server options',
                format: Object,
                default: { maxAge: 0 }
            }
        },
        security: {
            enableCORS: {
                doc: 'Enable CORS',
                format: Boolean,
                default: true
            },
            emailSalt: {
                doc: 'salt',
                format: String,
                default: "$2a$10$e.oPc.dyrwRoQCpDvO9Rhe"
            }
        },
        JWT: {
            enableTokenVerification: {
                doc: 'Token Expiration time',
                format: Boolean,
                default: true // 1 month
            },
            expireTime: {
                doc: 'Token Expiration time',
                format: Number,
                default: 60 * 43800 // 1 month
            },
            tokenSecret: {
                doc: 'Token Secret',
                format: String,
                default: "fakdoo-secret"
            }
        },
        CORS: {
            allowedHosts: {
                doc: 'Allowed Host for CORS',
                format: Array,
                default: []
            },
            allowedMethods: {
                doc: 'Allowed HTTP Methods for CORS',
                format: String,
                default: 'GET,POST,OPTIONS'
            },
            allowedHeaders: {
                doc: 'Allowed HTTP Headers for CORS',
                format: String,
                default: 'accept, x-xsrf-token,content-type, x-location, certificate'
            },
            exposedHeaders: {
                doc: 'Exposed HTTP Headers for CORS',
                format: String,
                default: 'XSRF-TOKEN'
            }
        },
        session: {
            sidname: {
                doc: 'Name of a session',
                format: String,
                default: 'connect.sid'
            },
            path: {
                doc: 'Path of a session',
                format: String,
                default: '/'
            },
            httpOnly: {
                doc: 'httpOnly cookie',
                format: Boolean,
                default: true
            },
            secure: {// should be set to true when using https
                doc: 'Http security of a session',
                format: Boolean,
                default: false
            },
            maxAge: {
                doc: 'Maximum age of a session',
                format: Number,
                default: 30 * 24 * 60 * 60 * 1000 // 30 days

            },
            proxy: {// should set to true when using https and reverse proxy
                // like HAproxy
                doc: 'Http proxy',
                format: Boolean,
                default: false
            },
            rolling: {// should set to true when want to have sliding window
                // session
                doc: 'For sliding window of a session',
                format: Boolean,
                default: true
            },
            cookieSecret: {
                doc: 'For sliding window of a session',
                format: String,
                default: true
            }
        },
        bodyParser: {
            limit: {
                doc: 'maximum request body size',
                format: String,
                default: '100mb'
            }
        }
    },
    mongodb: {
        host: {
            doc: 'Database Hostname',
            format: String,
            default: "mongodb://localhost:27017/"
            //default: `mongodb+srv://fakdoo:vMAlaBVcwgpsvzZz@fakdoo-cluster-gvb5m.mongodb.net/test?retryWrites=true`,
        },
        database: {
            doc: 'Database Name',
            format: String,
            default: 'baki_rakhje'
        }
    },
    logger: {
        httpLogFormat: {
            doc: 'HTTP log format',
            format: String,
            default: ':remote-addr - :remote-user [:date] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms ":referrer" ":user-agent"'
        },
        httpLogFileName: {
            doc: 'HTTP log File name',
            format: String,
            default: './logs/http.log'
        },
        logFileName: {
            doc: 'Log File name',
            format: String,
            default: './logs/logs.log'
        },
        exceptionLogFileName: {
            doc: 'Exception log File name',
            format: String,
            default: './logs/exceptions.log'
        },
        logFileSize: {
            doc: 'logs File Max File size',
            format: Number,
            default: 5242880
        }
    },
    whitelistAPIs: {
        doc: 'white list APIs array - please always write api name in small',
        format: Array,
        default: ['']
    },
    sendGrid: {
        apiKey: {
            doc: 'sendgrid Email Api Key',
            format: String,
            default: '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'
        },
        fromSupport: {
            doc: 'sendgrid Email From',
            format: String,
            default: 'support@fakdoo.com'
        }
    },
    mailer: {
        host: {
            doc: 'Host address',
            format: String,
            default: ''
        },
        port: {
            doc: 'port number',
            format: Number,
            default: ''
        },
        secure: {
            doc: 'secure port',
            format: Boolean,
            default: true
        },
        user: {  
            doc: 'User name',
            format: String,
            default: ''
        },
        pass: {  
            doc: 'Password',
            format: String,
            default: ''
        },
        email: {
            doc: 'Host address',
            format: String,
            default: ''
        },
        
        fromSupport: {
            doc: 'nodemailer Email From',
            format: String,
            default: 'support@fakdoo.com'
        }
    },
    s3Bucket: {
        bucketName: {
            doc: 's3bucket bucket name',
            format: String,
            default: 'fakdoo-images'
        },
        userKey: {
            doc: 's3bucket user key',
            format: String,
            default: 'AKIAIYNF2NMVPQSYWLWA'
        },
        userSecret: {
            doc: 's3bucket user secret',
            format: String,
            default: 'OnqebP/PPKhvrwCavd2QC9ZRtetSIkOib/6BiqOc'
        },
        bucketImagePath: {
            doc: 's3bucket bucket path',
            format: String,
            default: 'fakdoo-images'
        },
        bucketVideoPath: {
            doc: 's3bucket bucket path',
            format: String,
            default: 'fakdoo-videos'
        }
    },
    sms: {
        smsApiUrl: {
            doc: 'SMS api url',
            format: String,
            default: 'https://2factor.in/API/V1/'
        },
        smsApiUser: {
            doc: 'SMS api user',
            format: String,
            default: 'SACHIN'
        },
        smsApiKey: {
            doc: 'SMS api key',
            format: String,
            default: '5f1ee6b2-4643-11e9-8806-0200cd936042'
        },
        smsApiSenderID: {
            doc: 'SMS api sender id',
            format: String,
            default: 'INFOSM'
        },
        smsApiAccusage: {
            doc: 'SMS api accusage',
            format: String,
            default: '1'
        }
    }
});

// Get Environment
let environment = config.get('env');

// Environment directory path
let environmentDirectoryPath = `./environment/${environment}.json`

// Environment wise configuration path
const pathToResolve = path.resolve(__dirname, environmentDirectoryPath);

// Load environment dependent configuration
config.loadFile(pathToResolve);

// Perform validation
config.validate({ allowed: 'strict' });

module.exports = config;
