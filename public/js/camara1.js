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

/***/ "./src/js/camara.js":
/*!**************************!*\
  !*** ./src/js/camara1.js ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//capturar video ó imagen\nconst video = document.querySelector(\".video\");\nconst canvas = document.querySelector(\".canvas\");\n\n//tomar foto\nconst button = document.querySelector(\".start-btn\");\n\n//mostrar foto\nconst photo = document.querySelector(\".photo\");\n\n//constrains\n/*\nAquí enviamos las caracteristicas del video y\naudio que solicitamos\n*/\n\nconst constraints = {\n    video: { width: 420, height: 340 },\n    audio: false,\n};\n\n\n//acceso a la webcam\n/*\nAquí recibimos la respuesta del navegador, es una promesa\n */\nconst getVideo = async () => {\n    try {\n        const stream = await navigator.mediaDevices.getUserMedia(constraints);\n        handleSucces(stream);\n        console.log(stream);\n    } catch (error) {\n        console.log(error);\n    }\n};\n\n//3. -----------> si la promesa tiene exito\nconst handleSucces = (stream) => {\n    video.srcObject = stream;\n    video.play();\n};\n\n//4.------------>Llamada a la función get\ngetVideo();\n\n//4. ----------> Button y foto\nbutton.addEventListener(\"click\", () => {\n    let context = canvas.getContext(\"2d\");\n    context.drawImage(video, 0, 0, 420, 340);\n    let data = canvas.toDataURL(\"image/png\");\n    photo.setAttribute(\"src\", data);\n});\n\n//# sourceURL=webpack://cropshield-app/./src/js/camara1.js?");

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
/******/ 	__webpack_modules__["./src/js/camara.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;