#
# $Id: Makefile.am 633 2017-04-15 13:51:07Z ziggi $
#
AUTOMAKE_OPTIONS = foreign no-dependencies no-installinfo

PWD = $(shell pwd)

all: $(BUILD_DEST)

$(BUILD_DEST): ${BUILD_SRC}
	cd .. && $(WEBPACK)

build:
	cd .. && $(WEBPACK)

WEBPACK = $(PWD)/../node_modules/.bin/webpack

BUILD_DEST = $(PWD)/../../backend/public/js/expresso.js

BUILD_SRC = \
	App.vue \
	components/NotFound.vue \
	main.ts \
	router.ts \
	store.ts

nobase_dist_pkgdata_DATA = \
	$(BUILD_SRC)

clean-local:
	rm -f *~
#EOF
