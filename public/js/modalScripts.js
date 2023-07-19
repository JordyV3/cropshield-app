/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modalScripts.js":
/*!********************************!*\
  !*** ./src/js/modalScripts.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nconst modal = document.getElementById('modal-control-biologico');\nconst openModal = document.getElementById('ver-tabla');\nconst closeModal = document.getElementById('cerrar-modal');\n\nopenModal.addEventListener('click', function(){\n    if(modal.style.display === \"none\") {\n        modal.style.display = \"block\"\n    }\n})\n\ncloseModal.addEventListener('click', function(){\n    if(modal.style.display === \"block\"){\n        modal.style.display = \"none\"\n    }\n})\n\nconst secctionControl = document.getElementById('section-control-plagas');\nconst prediccion = document.getElementById('prediccion');\n\nif(prediccion.textContent === \"Planta Enferma Trips\") {\n    secctionControl.style.display = 'block'\n} else{\n    secctionControl.style.display = 'none';\n}\n\n//# sourceURL=webpack://cropshield-app/./src/js/modalScripts.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/modalScripts.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;