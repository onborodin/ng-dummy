#
# $Id: Makefile.am 633 2017-04-15 13:51:07Z ziggi $
#
AUTOMAKE_OPTIONS = foreign no-dependencies no-installinfo

sbin_SCRIPTS = expresso

prebuild:
	CFLAGS="$(CFLAGS)" $(NPM) install

install-data-hook:
	$(INSTALL) -d -m 750 -o $(APP_USER) -g $(APP_GROUP) $(DESTDIR)$(APP_CONFDIR)
	$(INSTALL) -d -m 750 -o $(APP_USER) -g $(APP_GROUP) $(DESTDIR)$(APP_LOGDIR)
	$(INSTALL) -d -m 750 -o $(APP_USER) -g $(APP_GROUP) $(DESTDIR)$(APP_RUNDIR)
	$(INSTALL) -d -m 755 -o $(APP_USER) -g $(APP_GROUP) $(DESTDIR)$(APP_LIBDIR)
	$(CP) -R node_modules $(DESTDIR)$(APP_LIBDIR)


confdir= $(DESTDIR)$(APP_CONFDIR)
conf_DATA = \
	knexfile.js \
	exconfig.js


EXTRA_DIST = \
	package-lock.json \
	package.json \
	knexfile.js \
	node_modules

nobase_dist_pkgdata_DATA = \
	exserv.js \
	migrations/20181020094820.js \
	models/users.js \
	routers/users.js \
	seeds/users.js \
	utils/exdaemon.js \
	utils/exlog.js \
	utils/exmkdir.js \
	utils/expid.js \
	utils/exsig.js \
	plugins/excors.js \
	\
	public/app.css \
	public/app.css.map \
	public/app.js \
	public/app.js.map \
	public/favicon.ico \
	public/foundation-icons.css \
	public/foundation-icons.eot \
	public/foundation-icons.html \
	public/foundation-icons.svg \
	public/foundation-icons.ttf \
	public/foundation-icons.woff \
	public/index.html


clean-local:
	rm -f *~ logs/*.log run/pid

#EOF
