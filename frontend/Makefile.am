#
# $Id: Makefile.am 633 2017-04-15 13:51:07Z ziggi $
#
AUTOMAKE_OPTIONS = foreign no-dependencies no-installinfo

SUBDIRS= src

prebuild:
	$(NPM) install

nobase_dist_pkgdata_DATA = \
	babel.config.js \
	package-lock.json \
	package.json \
	postcss.config.js \
	tsconfig.json \
	tslint.json \
	webpack.config.js


clean-local:
	rm -f *~

distclean-local:
	rm -rf node_modules

#EOF
