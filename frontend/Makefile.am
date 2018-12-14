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

BUILD_SRC = \
	src/app/app-footer/app-footer.component.html \
	src/app/app-footer/app-footer.component.scss \
	src/app/app-footer/app-footer.component.ts \
	 \
	src/app/app-header/app-header.component.html \
	src/app/app-header/app-header.component.scss \
	src/app/app-header/app-header.component.ts \
	 \
	src/app/app.component.html \
	src/app/app.component.scss \
	src/app/app.component.ts \
	 \
	src/app/app.module.ts \
	 \
	src/app/customers/customers.component.html \
	src/app/customers/customers.component.scss \
	src/app/customers/customers.component.ts \
	 \
	 \
	src/app/home/home.component.html \
	src/app/home/home.component.scss \
	src/app/home/home.component.ts \
	 \
	src/app/login/login.component.html \
	src/app/login/login.component.scss \
	src/app/login/login.component.ts \
	 \
	src/app/models/customer.model.ts \
	src/app/models/user.model.ts \
	 \
	src/app/not-found/not-found.component.html \
	src/app/not-found/not-found.component.scss \
	src/app/not-found/not-found.component.ts \
	 \
	 \
	src/app/user-create/user-create.component.html \
	src/app/user-create/user-create.component.scss \
	src/app/user-create/user-create.component.ts \
	 \
	src/app/user-drop/user-drop.component.html \
	src/app/user-drop/user-drop.component.scss \
	src/app/user-drop/user-drop.component.ts \
	 \
	src/app/user-update/user-update.component.html \
	src/app/user-update/user-update.component.scss \
	src/app/user-update/user-update.component.ts \
	 \
	src/app/users/users.component.html \
	src/app/users/users.component.scss \
	src/app/users/users.component.ts \
	 \
	src/app/login.service.ts \
	src/app/users.service.ts \
	src/app/customers.service.ts \
	 \
	src/app/routing.module.ts \
	src/app/rpc.service.ts \
	 \
	src/app/guards/login.guard.ts \
	src/app/guards/superlogin.guard.ts \
	 \
	src/environments/environment.prod.ts \
	src/environments/environment.ts \
	 \
	src/index.html \
	src/main.ts \
	src/polyfills.ts \
	src/scss/_fs.scss \
	src/scss/_my.scss \
	src/styles.scss \
	src/typings.d.ts

EXTRA_DIST = \
	$(BUILD_SRC) \
	angular.json \
	package-lock.json \
	package.json \
	src/tsconfig.app.json \
	src/tslint.json \
	tsconfig.json \
	src/assets/.gitkeep \
	src/assets/favicon.ico \
	src/assets/foundation-icons.css \
	src/assets/foundation-icons.eot \
	src/assets/foundation-icons.html \
	src/assets/foundation-icons.svg \
	src/assets/foundation-icons.ttf \
	src/assets/foundation-icons.woff

clean-local:
	rm -f *~ */*~ */*/*~ */*/*/*~
#EOF
