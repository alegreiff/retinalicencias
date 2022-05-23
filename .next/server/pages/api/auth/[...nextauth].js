"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/auth/[...nextauth]";
exports.ids = ["pages/api/auth/[...nextauth]"];
exports.modules = {

/***/ "@next-auth/firebase-adapter":
/*!**********************************************!*\
  !*** external "@next-auth/firebase-adapter" ***!
  \**********************************************/
/***/ ((module) => {

module.exports = require("@next-auth/firebase-adapter");

/***/ }),

/***/ "next-auth":
/*!****************************!*\
  !*** external "next-auth" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("next-auth");

/***/ }),

/***/ "next-auth/providers/google":
/*!*********************************************!*\
  !*** external "next-auth/providers/google" ***!
  \*********************************************/
/***/ ((module) => {

module.exports = require("next-auth/providers/google");

/***/ }),

/***/ "firebase/app":
/*!*******************************!*\
  !*** external "firebase/app" ***!
  \*******************************/
/***/ ((module) => {

module.exports = import("firebase/app");;

/***/ }),

/***/ "firebase/firestore":
/*!*************************************!*\
  !*** external "firebase/firestore" ***!
  \*************************************/
/***/ ((module) => {

module.exports = import("firebase/firestore");;

/***/ }),

/***/ "firebase/storage":
/*!***********************************!*\
  !*** external "firebase/storage" ***!
  \***********************************/
/***/ ((module) => {

module.exports = import("firebase/storage");;

/***/ }),

/***/ "(api)/./lib/firebase.js":
/*!*************************!*\
  !*** ./lib/firebase.js ***!
  \*************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"app\": () => (/* binding */ app),\n/* harmony export */   \"db\": () => (/* binding */ db),\n/* harmony export */   \"storage\": () => (/* binding */ storage)\n/* harmony export */ });\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ \"firebase/app\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/firestore */ \"firebase/firestore\");\n/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/storage */ \"firebase/storage\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_firestore__WEBPACK_IMPORTED_MODULE_1__, firebase_storage__WEBPACK_IMPORTED_MODULE_2__]);\n([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_firestore__WEBPACK_IMPORTED_MODULE_1__, firebase_storage__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n// Import the functions you need from the SDKs you need\n\n\n\n// TODO: Add SDKs for Firebase products that you want to use\n// https://firebase.google.com/docs/web/setup#available-libraries\n// Your web app's Firebase configuration\nconst firebaseConfig = {\n    apiKey: \"AIzaSyDj9ZK1Ii9Oqewi_AVnW2LmFLRcWsBvtGk\",\n    authDomain: \"reactappscursos.firebaseapp.com\",\n    projectId: \"reactappscursos\",\n    storageBucket: \"reactappscursos.appspot.com\",\n    messagingSenderId: \"431154747627\",\n    appId: \"1:431154747627:web:a7c1a4650779de0de306ae\"\n};\nconst app = firebase_app__WEBPACK_IMPORTED_MODULE_0__.getApps.length > 0 ? (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.getApp)() : (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig);\nconst db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getFirestore)(app);\nconst storage = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_2__.getStorage)(app);\n\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9saWIvZmlyZWJhc2UuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsRUFBdUQ7QUFDTTtBQUNaO0FBQ0o7QUFFN0MsRUFBNEQ7QUFDNUQsRUFBaUU7QUFFakUsRUFBd0M7QUFDeEMsS0FBSyxDQUFDSyxjQUFjLEdBQUcsQ0FBQztJQUN0QkMsTUFBTSxFQUFFLENBQXlDO0lBQ2pEQyxVQUFVLEVBQUUsQ0FBaUM7SUFDN0NDLFNBQVMsRUFBRSxDQUFpQjtJQUM1QkMsYUFBYSxFQUFFLENBQTZCO0lBQzVDQyxpQkFBaUIsRUFBRSxDQUFjO0lBQ2pDQyxLQUFLLEVBQUUsQ0FBMkM7QUFDcEQsQ0FBQztBQUVELEtBQUssQ0FBQ0MsR0FBRyxHQUFHWCx3REFBYyxHQUFHLENBQUMsR0FBR0Msb0RBQU0sS0FBS0YsMkRBQWEsQ0FBQ0ssY0FBYztBQUV4RSxLQUFLLENBQUNTLEVBQUUsR0FBR1gsZ0VBQVksQ0FBQ1MsR0FBRztBQUMzQixLQUFLLENBQUNHLE9BQU8sR0FBR1gsNERBQVUsQ0FBQ1EsR0FBRztBQUVGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vMDQtZ3NoZWV0cy8uL2xpYi9maXJlYmFzZS5qcz9hYjQ0Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIEltcG9ydCB0aGUgZnVuY3Rpb25zIHlvdSBuZWVkIGZyb20gdGhlIFNES3MgeW91IG5lZWRcbmltcG9ydCB7IGluaXRpYWxpemVBcHAsIGdldEFwcHMsIGdldEFwcCB9IGZyb20gXCJmaXJlYmFzZS9hcHBcIjtcbmltcG9ydCB7IGdldEZpcmVzdG9yZSB9IGZyb20gXCJmaXJlYmFzZS9maXJlc3RvcmVcIjtcbmltcG9ydCB7IGdldFN0b3JhZ2UgfSBmcm9tIFwiZmlyZWJhc2Uvc3RvcmFnZVwiO1xuXG4vLyBUT0RPOiBBZGQgU0RLcyBmb3IgRmlyZWJhc2UgcHJvZHVjdHMgdGhhdCB5b3Ugd2FudCB0byB1c2Vcbi8vIGh0dHBzOi8vZmlyZWJhc2UuZ29vZ2xlLmNvbS9kb2NzL3dlYi9zZXR1cCNhdmFpbGFibGUtbGlicmFyaWVzXG5cbi8vIFlvdXIgd2ViIGFwcCdzIEZpcmViYXNlIGNvbmZpZ3VyYXRpb25cbmNvbnN0IGZpcmViYXNlQ29uZmlnID0ge1xuICBhcGlLZXk6IFwiQUl6YVN5RGo5WksxSWk5T3Fld2lfQVZuVzJMbUZMUmNXc0J2dEdrXCIsXG4gIGF1dGhEb21haW46IFwicmVhY3RhcHBzY3Vyc29zLmZpcmViYXNlYXBwLmNvbVwiLFxuICBwcm9qZWN0SWQ6IFwicmVhY3RhcHBzY3Vyc29zXCIsXG4gIHN0b3JhZ2VCdWNrZXQ6IFwicmVhY3RhcHBzY3Vyc29zLmFwcHNwb3QuY29tXCIsXG4gIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjQzMTE1NDc0NzYyN1wiLFxuICBhcHBJZDogXCIxOjQzMTE1NDc0NzYyNzp3ZWI6YTdjMWE0NjUwNzc5ZGUwZGUzMDZhZVwiLFxufTtcblxuY29uc3QgYXBwID0gZ2V0QXBwcy5sZW5ndGggPiAwID8gZ2V0QXBwKCkgOiBpbml0aWFsaXplQXBwKGZpcmViYXNlQ29uZmlnKTtcblxuY29uc3QgZGIgPSBnZXRGaXJlc3RvcmUoYXBwKTtcbmNvbnN0IHN0b3JhZ2UgPSBnZXRTdG9yYWdlKGFwcCk7XG5cbmV4cG9ydCB7IGFwcCwgZGIsIHN0b3JhZ2UgfTtcbiJdLCJuYW1lcyI6WyJpbml0aWFsaXplQXBwIiwiZ2V0QXBwcyIsImdldEFwcCIsImdldEZpcmVzdG9yZSIsImdldFN0b3JhZ2UiLCJmaXJlYmFzZUNvbmZpZyIsImFwaUtleSIsImF1dGhEb21haW4iLCJwcm9qZWN0SWQiLCJzdG9yYWdlQnVja2V0IiwibWVzc2FnaW5nU2VuZGVySWQiLCJhcHBJZCIsImFwcCIsImxlbmd0aCIsImRiIiwic3RvcmFnZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./lib/firebase.js\n");

/***/ }),

/***/ "(api)/./pages/api/auth/[...nextauth].js":
/*!*****************************************!*\
  !*** ./pages/api/auth/[...nextauth].js ***!
  \*****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"next-auth\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/google */ \"next-auth/providers/google\");\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _next_auth_firebase_adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @next-auth/firebase-adapter */ \"@next-auth/firebase-adapter\");\n/* harmony import */ var _next_auth_firebase_adapter__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_next_auth_firebase_adapter__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _lib_firebase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../lib/firebase */ \"(api)/./lib/firebase.js\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! firebase/firestore */ \"firebase/firestore\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_firebase__WEBPACK_IMPORTED_MODULE_3__, firebase_firestore__WEBPACK_IMPORTED_MODULE_4__]);\n([_lib_firebase__WEBPACK_IMPORTED_MODULE_3__, firebase_firestore__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_0___default()({\n    providers: [\n        next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1___default()({\n            clientId: process.env.GOOGLE_ID,\n            clientSecret: process.env.GOOGLE_SECRET\n        }), \n    ],\n    /* adapter: FirebaseAdapter({\n    db,\n    ...firestoreFunctions,\n  }), */ //secret: process.env.SECRET,\n    /* session: {\n    strategy: 'jwt',\n  }, */ callbacks: {\n        async signIn ({ account , profile , user  }) {\n            if (account.provider === 'google') {\n                //return profile.email_verified && profile.email.endsWith(\"ff@gmail.com\");\n                return autorizados(profile.email);\n            }\n        }\n    }\n}));\nconst autorizados = (correo)=>{\n    const correos = [\n        'retinalatinacine@gmail.com',\n        'alegreiff@gmail.com',\n        'cinebid.jaime@gmail.com', \n    ];\n    return correos.includes(correo);\n};\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFnQztBQUN1QjtBQUNNO0FBQ25CO0FBQ2M7QUFDeEQsaUVBQWVBLGdEQUFRLENBQUMsQ0FBQztJQUN2QkssU0FBUyxFQUFFLENBQUM7UUFDVkosaUVBQWMsQ0FBQyxDQUFDO1lBQ2RLLFFBQVEsRUFBRUMsT0FBTyxDQUFDQyxHQUFHLENBQUNDLFNBQVM7WUFDL0JDLFlBQVksRUFBRUgsT0FBTyxDQUFDQyxHQUFHLENBQUNHLGFBQWE7UUFDekMsQ0FBQztJQUNILENBQUM7SUFDRCxFQUdNOzs7TUFBQSxHQUNOLEVBQTZCO0lBQzdCLEVBRUs7O0tBQUEsR0FDTEMsU0FBUyxFQUFFLENBQUM7Y0FDSkMsTUFBTSxFQUFDLENBQUMsQ0FBQ0MsT0FBTyxHQUFFQyxPQUFPLEdBQUVDLElBQUksRUFBQyxDQUFDLEVBQUUsQ0FBQztZQUN4QyxFQUFFLEVBQUVGLE9BQU8sQ0FBQ0csUUFBUSxLQUFLLENBQVEsU0FBRSxDQUFDO2dCQUNsQyxFQUEwRTtnQkFDMUUsTUFBTSxDQUFDQyxXQUFXLENBQUNILE9BQU8sQ0FBQ0ksS0FBSztZQUNsQyxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDLENBQUMsRUFBQztBQUVILEtBQUssQ0FBQ0QsV0FBVyxJQUFJRSxNQUFNLEdBQUssQ0FBQztJQUMvQixLQUFLLENBQUNDLE9BQU8sR0FBRyxDQUFDO1FBQ2YsQ0FBNEI7UUFDNUIsQ0FBcUI7UUFDckIsQ0FBeUI7SUFDM0IsQ0FBQztJQUNELE1BQU0sQ0FBQ0EsT0FBTyxDQUFDQyxRQUFRLENBQUNGLE1BQU07QUFDaEMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLzA0LWdzaGVldHMvLi9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLmpzPzUyN2YiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5leHRBdXRoIGZyb20gJ25leHQtYXV0aCc7XG5pbXBvcnQgR29vZ2xlUHJvdmlkZXIgZnJvbSAnbmV4dC1hdXRoL3Byb3ZpZGVycy9nb29nbGUnO1xuaW1wb3J0IHsgRmlyZWJhc2VBZGFwdGVyIH0gZnJvbSAnQG5leHQtYXV0aC9maXJlYmFzZS1hZGFwdGVyJztcbmltcG9ydCB7IGRiIH0gZnJvbSAnLi4vLi4vLi4vbGliL2ZpcmViYXNlJztcbmltcG9ydCAqIGFzIGZpcmVzdG9yZUZ1bmN0aW9ucyBmcm9tICdmaXJlYmFzZS9maXJlc3RvcmUnO1xuZXhwb3J0IGRlZmF1bHQgTmV4dEF1dGgoe1xuICBwcm92aWRlcnM6IFtcbiAgICBHb29nbGVQcm92aWRlcih7XG4gICAgICBjbGllbnRJZDogcHJvY2Vzcy5lbnYuR09PR0xFX0lELFxuICAgICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5HT09HTEVfU0VDUkVULFxuICAgIH0pLFxuICBdLFxuICAvKiBhZGFwdGVyOiBGaXJlYmFzZUFkYXB0ZXIoe1xuICAgIGRiLFxuICAgIC4uLmZpcmVzdG9yZUZ1bmN0aW9ucyxcbiAgfSksICovXG4gIC8vc2VjcmV0OiBwcm9jZXNzLmVudi5TRUNSRVQsXG4gIC8qIHNlc3Npb246IHtcbiAgICBzdHJhdGVneTogJ2p3dCcsXG4gIH0sICovXG4gIGNhbGxiYWNrczoge1xuICAgIGFzeW5jIHNpZ25Jbih7IGFjY291bnQsIHByb2ZpbGUsIHVzZXIgfSkge1xuICAgICAgaWYgKGFjY291bnQucHJvdmlkZXIgPT09ICdnb29nbGUnKSB7XG4gICAgICAgIC8vcmV0dXJuIHByb2ZpbGUuZW1haWxfdmVyaWZpZWQgJiYgcHJvZmlsZS5lbWFpbC5lbmRzV2l0aChcImZmQGdtYWlsLmNvbVwiKTtcbiAgICAgICAgcmV0dXJuIGF1dG9yaXphZG9zKHByb2ZpbGUuZW1haWwpO1xuICAgICAgfVxuICAgIH0sXG4gIH0sXG59KTtcblxuY29uc3QgYXV0b3JpemFkb3MgPSAoY29ycmVvKSA9PiB7XG4gIGNvbnN0IGNvcnJlb3MgPSBbXG4gICAgJ3JldGluYWxhdGluYWNpbmVAZ21haWwuY29tJyxcbiAgICAnYWxlZ3JlaWZmQGdtYWlsLmNvbScsXG4gICAgJ2NpbmViaWQuamFpbWVAZ21haWwuY29tJyxcbiAgXTtcbiAgcmV0dXJuIGNvcnJlb3MuaW5jbHVkZXMoY29ycmVvKTtcbn07XG4iXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJHb29nbGVQcm92aWRlciIsIkZpcmViYXNlQWRhcHRlciIsImRiIiwiZmlyZXN0b3JlRnVuY3Rpb25zIiwicHJvdmlkZXJzIiwiY2xpZW50SWQiLCJwcm9jZXNzIiwiZW52IiwiR09PR0xFX0lEIiwiY2xpZW50U2VjcmV0IiwiR09PR0xFX1NFQ1JFVCIsImNhbGxiYWNrcyIsInNpZ25JbiIsImFjY291bnQiLCJwcm9maWxlIiwidXNlciIsInByb3ZpZGVyIiwiYXV0b3JpemFkb3MiLCJlbWFpbCIsImNvcnJlbyIsImNvcnJlb3MiLCJpbmNsdWRlcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/auth/[...nextauth].js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/auth/[...nextauth].js"));
module.exports = __webpack_exports__;

})();