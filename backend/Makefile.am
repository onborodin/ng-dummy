#
# $Id: Makefile.am 633 2017-04-15 13:51:07Z ziggi $
#
AUTOMAKE_OPTIONS = foreign no-dependencies no-installinfo

sbin_SCRIPTS = wcm

pre-build:
	CFLAGS="$(CFLAGS)" $(NPM) install

KNEX= ./node_modules/.bin/knex

all: $(KNEX)

$(KNEX): pre-build

install-data-hook:
	$(INSTALL) -d -m 750 -o $(APP_USER) -g $(APP_GROUP) $(DESTDIR)$(APP_CONFDIR)
	$(INSTALL) -d -m 750 -o $(APP_USER) -g $(APP_GROUP) $(DESTDIR)$(APP_LOGDIR)
	$(INSTALL) -d -m 750 -o $(APP_USER) -g $(APP_GROUP) $(DESTDIR)$(APP_RUNDIR)
	$(INSTALL) -d -m 755 -o $(APP_USER) -g $(APP_GROUP) $(DESTDIR)$(APP_LIBDIR)
	$(CP) -R node_modules $(DESTDIR)$(APP_LIBDIR)
if FREEBSD_OS
	chmod a+x $(DESTDIR)/${etcdir}/rc.d/wcm
endif

if FREEBSD_OS
etcdir = @prefix@/etc
nobase_etc_SCRIPTS = rc.d/wcm
endif


confdir= $(DESTDIR)$(APP_CONFDIR)
conf_DATA = \
	knexfile.js \
	wcmconf.js

EXTRA_DIST = \
	package-lock.json \
	package.json \
	knexfile.js \
	node_modules \
        public

nobase_dist_pkgdata_DATA = \
	exserv.js \
	knexport.js \
	 \
	models/customers.js \
	models/login.js \
	models/users.js \
	 \
	plugins/excors.js \
	 \
	routers/customers.js \
	routers/exrouter.js \
	routers/login.js \
	routers/users.js \
	 \
	utils/exdaemon.js \
	utils/exlog.js \
	utils/exmkdir.js \
	utils/expid.js \
	utils/exsig.js \
	 \
	migrations/20181214085626_stable.js \
	 \
	seeds/20181214085527_customers.js \
	seeds/20181214085527_users.js \
	 \
	public/3rdpartylicenses.txt \
	public/favicon.ico \
	public/foundation-icons.css \
	public/foundation-icons.eot \
	public/foundation-icons.html \
	public/foundation-icons.svg \
	public/foundation-icons.ttf \
	public/foundation-icons.woff \
	public/index.html \
	 \
	public/main.js \
	public/polyfills.js \
	public/runtime.js \
	public/scripts.js \
	public/styles.css \
	public/vendor.js


clean-local:
	rm -f *~ */*~ logs/*.log run/pid

#EOF
