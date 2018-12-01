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

BUILD_DEST = $(PWD)/../../backend/public/app.js

BUILD_SRC = \
	app.css \
	app.html \
	app.vue \
	assets/favicon.ico \
	assets/foundation-icons.css \
	assets/foundation-icons.eot \
	assets/foundation-icons.html \
	assets/foundation-icons.svg \
	assets/foundation-icons.ttf \
	assets/foundation-icons.woff \
	components/login.html \
	components/login.vue \
	components/not-found.vue \
	components/users.css \
	components/users.html \
	components/users.vue \
	index.html \
	main.scss \
	main.ts \
	modules/login.ts \
	plugins/client.ts \
	plugins/lodash.ts \
	router.ts \
	scss/_fs.scss \
	scss/_my.scss \
	store.ts \
	vue.d.ts


#	foundation.d.ts
#	foundation.js


EXTRA_DIST = \
	$(BUILD_SRC)

clean-local:
	rm -f *~
#EOF
