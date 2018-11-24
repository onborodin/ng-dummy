#
# $Id: Makefile.am 633 2017-04-15 13:51:07Z ziggi $
#
AUTOMAKE_OPTIONS = foreign no-dependencies no-installinfo

sbin_SCRIPTS = expresso

prebuild:
	CFLAGS="$(CFLAGS)" $(NPM) install

install-data-hook:
	$(INSTALL) -d -m 750 -o $(APP_USER) -g $(APP_GROUP) $(DESTDIR)$(APP_LOGDIR)
	$(INSTALL) -d -m 750 -o $(APP_USER) -g $(APP_GROUP) $(DESTDIR)$(APP_RUNDIR)
	$(INSTALL) -d -m 755 -o $(APP_USER) -g $(APP_GROUP) $(DESTDIR)$(APP_LIBDIR)

nobase_dist_pkgdata_DATA = \
	expid.js \
	exdir.js \
	exdaemon.js \
	exserv.js \
	public/favicon.ico \
	public/css/datatables.min.css \
	public/css/foundation-float.css \
	public/css/datatables.css \
	public/css/foundation-float.min.css \
	public/js/jquery.js \
	public/js/front.js \
	public/js/datatables.js \
	public/js/lodash.js \
	public/js/lodash.min.js \
	public/js/foundation.js \
	public/js/marked.js \
	public/js/foundation.min.js \
	public/js/marked.min.js \
	public/js/datatables.min.js \
	public/js/jquery.min.js \
	public/icons/foundation-icons.ttf \
	public/icons/foundation-icons.woff \
	public/icons/foundation-icons.eot \
	public/icons/foundation-icons.svg \
	public/icons/foundation-icons.css \
	public/icons/preview.html

clean-local:
	rm -f *~ logs/*.log run/pid

#EOF
