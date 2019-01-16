#
# $Id: Makefile.am 633 2017-04-15 13:51:07Z ziggi $
#
AUTOMAKE_OPTIONS = foreign no-dependencies no-installinfo

sbin_SCRIPTS = lorem

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
	chmod a+x $(DESTDIR)/${etcdir}/rc.d/lorem
endif

if FREEBSD_OS
etcdir = @prefix@/etc
nobase_etc_SCRIPTS = rc.d/lorem
endif


confdir= $(DESTDIR)$(APP_CONFDIR)
conf_DATA = \
	knexfile.js \
	config.js

EXTRA_DIST = \
	package-lock.json \
	package.json \
	knexfile.js \
	node_modules \
        public

nobase_dist_pkgdata_DATA = 


clean-local:
	rm -f *~ */*~ logs/*.log run/pid

#EOF
