#
# $Id: Makefile.am 633 2017-04-15 13:51:07Z ziggi $
#
AUTOMAKE_OPTIONS = foreign no-dependencies no-installinfo

pre-build:
	$(NPM) install

NG = ./node_modules/.bin/ng
DEST = ../backend/public/index.html

all: $(DEST)

$(DEST): $(BUILD_SRC)
	$(NG) build --prod

$(NG): pre-build

BUILD_SRC = 

EXTRA_DIST = \
	$(BUILD_SRC) \
	angular.json \
	package-lock.json \
	package.json \
	src/tsconfig.app.json \
	src/tslint.json \
	tsconfig.json \
	src/assets/.gitkeep \
	src/assets/favicon.ico

clean-local:
	rm -f *~ */*~ */*/*~ */*/*/*~
#EOF
