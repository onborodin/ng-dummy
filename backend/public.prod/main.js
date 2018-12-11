(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-footer/app-footer.component.ts":
/*!****************************************************!*\
  !*** ./src/app/app-footer/app-footer.component.ts ***!
  \****************************************************/
/*! exports provided: AppFooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppFooterComponent", function() { return AppFooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


var _c0 = ["id", "app-footer"];
var _c1 = ["grid-container", 1, "grid-container", true];
var _c2 = ["grid-x", "grid-margin-x", "align-center", 1, "grid-x", true, "grid-margin-x", true, "align-center", true];
var _c3 = ["cell", "medium-8", 1, "cell", true, "medium-8", true];
class AppFooterComponent {
    constructor() { }
    ngOnInit() {
    }
}
AppFooterComponent.ngComponentDef = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdefineComponent"]({ type: AppFooterComponent, selectors: [["app-footer"]], factory: function AppFooterComponent_Factory(t) { return new (t || AppFooterComponent)(); }, consts: 5, vars: 0, template: function AppFooterComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](0, "div", _c0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](1, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStyling"](_c1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](2, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStyling"](_c2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](3, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStyling"](_c3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelement"](4, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
    } }, encapsulation: 2 });


/***/ }),

/***/ "./src/app/app-header/app-header.component.ts":
/*!****************************************************!*\
  !*** ./src/app/app-header/app-header.component.ts ***!
  \****************************************************/
/*! exports provided: AppHeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppHeaderComponent", function() { return AppHeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _login_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../login.service */ "./src/app/login.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");





var _c0 = ["id", "app-header"];
var _c1 = ["margin-bottom-2", 1, "margin-bottom-2", true];
var _c2 = ["id", "top-bar"];
var _c3 = ["top-bar", 1, "top-bar", true];
var _c4 = ["top-bar-left", 1, "top-bar-left", true];
var _c5 = ["data-dropdown-menu", ""];
var _c6 = ["dropdown", "menu", 1, "dropdown", true, "menu", true];
var _c7 = ["href", "#"];
var _c8 = ["my-menu-icon", 1, "my-menu-icon", true];
var _c9 = ["menu-text", 1, "menu-text", true];
var _c10 = ["menu", "hover", 1, "menu", true, "hover", true];
var _c11 = ["routerLink", "/domains", "routerLinkActive", "active"];
var _c12 = ["routerLink", "/login", "routerLinkActive", "active"];
var _c13 = [1, "click"];
var _c14 = ["fi-power", 1, "fi-power", true];
var _c15 = ["font-size", 1, "font-size", "1.3em"];
class AppHeaderComponent {
    constructor(loginService) {
        this.loginService = loginService;
    }
    ngOnInit() {
        $('#app-header').foundation();
    }
}
AppHeaderComponent.ngComponentDef = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdefineComponent"]({ type: AppHeaderComponent, selectors: [["app-header"]], factory: function AppHeaderComponent_Factory(t) { return new (t || AppHeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdirectiveInject"](_login_service__WEBPACK_IMPORTED_MODULE_1__["LoginService"])); }, consts: 22, vars: 0, template: function AppHeaderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](0, "div", _c0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStyling"](_c1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](1, "div", _c2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStyling"](_c3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](2, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStyling"](_c4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](3, "ul", _c5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStyling"](_c6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](4, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](5, "a", _c7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](6, "i");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStyling"](_c8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](7, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStyling"](_c9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵtext"](8, "NgII");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](9, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](10, "a", _c7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵtext"](11, "Units");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](12, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStyling"](_c10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](13, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](14, "a", _c11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵtext"](15, "Domains");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](16, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](17, "a", _c12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵtext"](18, "Login");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](19, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](20, "a", _c13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵlistener"]("click", function AppHeaderComponent_Template_a_click_listener($event) { return ctx.loginService.logout(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](21, "i");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStyling"](_c14, _c15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkActive"]], encapsulation: 2 });


/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule, ɵ0, ɵ1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵ0", function() { return ɵ0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵ1", function() { return ɵ1; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm2015/animations.js");
/* harmony import */ var _routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./routing.module */ "./src/app/routing.module.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _login_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./login.service */ "./src/app/login.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");








const ɵ0 = [
    _angular_forms__WEBPACK_IMPORTED_MODULE_0__["ReactiveFormsModule"],
    _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormsModule"],
    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
    _routing_module__WEBPACK_IMPORTED_MODULE_3__["RoutingModule"],
    _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"]
], ɵ1 = [_login_service__WEBPACK_IMPORTED_MODULE_5__["LoginService"]];
class AppModule {
}
AppModule.ngInjectorDef = _angular_core__WEBPACK_IMPORTED_MODULE_6__["defineInjector"]({ factory: function AppModule_Factory() { return new AppModule(); }, providers: ɵ1, imports: [ɵ0] });



/***/ }),

/***/ "./src/app/domains/domains.component.ts":
/*!**********************************************!*\
  !*** ./src/app/domains/domains.component.ts ***!
  \**********************************************/
/*! exports provided: DomainsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DomainsComponent", function() { return DomainsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _login_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../login.service */ "./src/app/login.service.ts");
/* harmony import */ var _app_header_app_header_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../app-header/app-header.component */ "./src/app/app-header/app-header.component.ts");
/* harmony import */ var _app_footer_app_footer_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../app-footer/app-footer.component */ "./src/app/app-footer/app-footer.component.ts");








var _c0 = ["id", "domains"];
var _c1 = ["margin-left-2", "margin-right-2", 1, "margin-left-2", true, "margin-right-2", true];
var _c2 = ["id", "lorem"];
var _c3 = ["grid-container", 1, "grid-container", true];
var _c4 = ["grid-x", "grid-margin-x", "align-center", 1, "grid-x", true, "grid-margin-x", true, "align-center", true];
var _c5 = ["cell", "medium-4", 1, "cell", true, "medium-4", true];
class DomainsComponent {
    constructor(router, loginService) {
        this.router = router;
        this.loginService = loginService;
    }
    ngOnInit() {
        console.log({ login: this.loginService.loginState });
        this.loginService.check();
    }
}
DomainsComponent.ngComponentDef = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdefineComponent"]({ type: DomainsComponent, selectors: [["domain"]], factory: function DomainsComponent_Factory(t) { return new (t || DomainsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdirectiveInject"](_login_service__WEBPACK_IMPORTED_MODULE_2__["LoginService"])); }, consts: 9, vars: 0, template: function DomainsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](0, "div", _c0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelement"](1, "app-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](2, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStyling"](_c1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](3, "h5");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵtext"](4, "Domains");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](5, "div", _c2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStyling"](_c3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](6, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStyling"](_c4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](7, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStyling"](_c5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelement"](8, "app-footer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
    } }, directives: [_app_header_app_header_component__WEBPACK_IMPORTED_MODULE_3__["AppHeaderComponent"], _app_footer_app_footer_component__WEBPACK_IMPORTED_MODULE_4__["AppFooterComponent"]], encapsulation: 2 });


/***/ }),

/***/ "./src/app/login.service.ts":
/*!**********************************!*\
  !*** ./src/app/login.service.ts ***!
  \**********************************/
/*! exports provided: LoginService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginService", function() { return LoginService; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _rpc_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rpc.service */ "./src/app/rpc.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");





class LoginService {
    constructor(router, rpc) {
        this.router = router;
        this.rpc = rpc;
        this.loginState = false;
        this.user = {
            id: 0,
            name: ''
        };
    }
    login(name, password) {
        console.log('login-service#login');
        let params = {
            name: name,
            password: password,
            id: 0
        };
        this.rpc.request('/api/login', 'login', params)
            .subscribe((res) => {
            console.log(res.result[0].id);
            if (res.result[0].id >= 0) {
                this.loginState = true;
                this.user.id = res.result[0].id;
                this.router.navigate(['/domains']);
            }
        });
    }
    logout() {
        console.log('login-service#logout');
        this.loginState = false;
        this.router.navigate(['/login']);
    }
    check() {
        if (!this.loginState) {
            this.router.navigate(['/login']);
        }
    }
}
LoginService.ngInjectableDef = _angular_core__WEBPACK_IMPORTED_MODULE_2__["defineInjectable"]({ factory: function LoginService_Factory() { return new LoginService(_angular_core__WEBPACK_IMPORTED_MODULE_2__["inject"](_angular_router__WEBPACK_IMPORTED_MODULE_0__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["inject"](_rpc_service__WEBPACK_IMPORTED_MODULE_1__["RPCService"])); }, token: LoginService, providedIn: null });


/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _login_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../login.service */ "./src/app/login.service.ts");






var _c0 = ["id", "login"];
var _c1 = ["top-bar", 1, "top-bar", true];
var _c2 = ["top-bar-left", "padding-left-2", 1, "top-bar-left", true, "padding-left-2", true];
var _c3 = ["menu", 1, "menu", true];
var _c4 = ["menu-text", 1, "menu-text", true];
var _c5 = ["fi-shield", 1, "fi-shield", true];
var _c6 = ["font-size", 1, "font-size", "1.3em"];
var _c7 = ["grid-container", 1, "grid-container", true];
var _c8 = ["grid-x", "grid-padding-x", "align-center", 1, "grid-x", true, "grid-padding-x", true, "align-center", true];
var _c9 = ["cell", "small-8", "medium-4", "large-3", 1, "cell", true, "small-8", true, "medium-4", true, "large-3", true];
var _c10 = ["card", "padding-2", "margin-top-3", 1, "card", true, "padding-2", true, "margin-top-3", true];
var _c11 = ["accept-charset", "UTF-8", 1, "formGroup", "ngSubmit"];
var _c12 = ["type", "text", "formControlName", "name"];
var _c13 = ["type", "password", "formControlName", "password"];
var _c14 = ["text-center", 1, "text-center", true];
var _c15 = ["type", "submit"];
var _c16 = ["button", "small", 1, "button", true, "small", true];
var _c17 = ["margin-2", 1, "margin-2", true];
class LoginComponent {
    constructor(formBuilder, loginService) {
        this.formBuilder = formBuilder;
        this.loginService = loginService;
        this.message = '';
        this.attemptCount = 0;
    }
    login(event) {
        this.loginService.login(event.value.name, event.value.password);
        this.attemptCount++;
        this.message = `Login incorrect. Attemtp ${this.attemptCount}`;
    }
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            name: [''],
            password: ['']
        });
    }
}
LoginComponent.ngComponentDef = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdefineComponent"]({ type: LoginComponent, selectors: [["login"]], factory: function LoginComponent_Factory(t) { return new (t || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdirectiveInject"](_login_service__WEBPACK_IMPORTED_MODULE_2__["LoginService"])); }, consts: 25, vars: 2, template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](0, "div", _c0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](1, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStyling"](_c1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](2, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStyling"](_c2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](3, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStyling"](_c3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](4, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStyling"](_c4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](5, "i");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStyling"](_c5, _c6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](6, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStyling"](_c4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵtext"](7, "Login");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](8, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStyling"](_c7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](9, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStyling"](_c8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](10, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStyling"](_c9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](11, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStyling"](_c10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](12, "form", _c11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵlistener"]("ngSubmit", function LoginComponent_Template_form_ngSubmit_listener($event) { return ctx.login(ctx.loginForm); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](13, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵtext"](14, "Login name ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelement"](15, "input", _c12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](16, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵtext"](17, "Password ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelement"](18, "input", _c13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](19, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStyling"](_c14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](20, "button", _c15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStyling"](_c16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵtext"](21, "Submit");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](22, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStyling"](_c17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](23, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStyling"](_c14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵtext"](24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementProperty"](12, "formGroup", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵbind"](ctx.loginForm));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵtextBinding"](24, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵinterpolation1"](" ", ctx.message, " "));
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵangular_packages_forms_forms_bh"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlName"]], encapsulation: 2 });


/***/ }),

/***/ "./src/app/not-found/not-found.component.ts":
/*!**************************************************!*\
  !*** ./src/app/not-found/not-found.component.ts ***!
  \**************************************************/
/*! exports provided: NotFoundComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotFoundComponent", function() { return NotFoundComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


class NotFoundComponent {
    constructor() { }
    ngOnInit() {
    }
}
NotFoundComponent.ngComponentDef = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdefineComponent"]({ type: NotFoundComponent, selectors: [["not-found"]], factory: function NotFoundComponent_Factory(t) { return new (t || NotFoundComponent)(); }, consts: 2, vars: 0, template: function NotFoundComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵtext"](1, " Not Found\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵelementEnd"]();
    } }, encapsulation: 2 });


/***/ }),

/***/ "./src/app/routing.module.ts":
/*!***********************************!*\
  !*** ./src/app/routing.module.ts ***!
  \***********************************/
/*! exports provided: RoutingModule, ɵ0, ɵ1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoutingModule", function() { return RoutingModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵ0", function() { return ɵ0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵ1", function() { return ɵ1; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _domains_domains_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./domains/domains.component */ "./src/app/domains/domains.component.ts");
/* harmony import */ var _not_found_not_found_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./not-found/not-found.component */ "./src/app/not-found/not-found.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");





const routes = [
    {
        path: 'login',
        component: _login_login_component__WEBPACK_IMPORTED_MODULE_1__["LoginComponent"]
    },
    {
        path: 'domains',
        component: _domains_domains_component__WEBPACK_IMPORTED_MODULE_2__["DomainsComponent"]
    },
    {
        path: '',
        redirectTo: '/domains',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: _not_found_not_found_component__WEBPACK_IMPORTED_MODULE_3__["NotFoundComponent"]
    }
];
const ɵ0 = [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes)], ɵ1 = [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]];
class RoutingModule {
}
RoutingModule.ngInjectorDef = _angular_core__WEBPACK_IMPORTED_MODULE_4__["defineInjector"]({ factory: function RoutingModule_Factory() { return new RoutingModule(); }, providers: undefined, imports: [ɵ0, ɵ1] });



/***/ }),

/***/ "./src/app/rpc.service.ts":
/*!********************************!*\
  !*** ./src/app/rpc.service.ts ***!
  \********************************/
/*! exports provided: RPCService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RPCService", function() { return RPCService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");



class RPCService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    request(url, method, params) {
        let rpcRequest = {
            jsonrpc: '2.0',
            method: method,
            params: params,
            id: '0x123'
        };
        return this.httpClient.post(url, rpcRequest);
    }
}
RPCService.ngInjectableDef = _angular_core__WEBPACK_IMPORTED_MODULE_1__["defineInjectable"]({ factory: function RPCService_Factory() { return new RPCService(_angular_core__WEBPACK_IMPORTED_MODULE_1__["inject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"])); }, token: RPCService, providedIn: null });


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");


//import { environment } from './environments/environment'
//if (environment.production) {
//  enableProdMode()
//}
//enableProdMode()
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_0__["platformBrowserDynamic"])()
    .bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_1__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/ziggi/expresso/frontendv3/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);