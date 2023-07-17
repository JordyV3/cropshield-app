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

/***/ "./src/js/uploadFile.js":
/*!******************************!*\
  !*** ./src/js/uploadFile.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nconst imagePreview = document.getElementById('img-preview');\nconst imageUploader = document.getElementById('img-uploader');\nconst form = document.getElementById('form');\nconst imgPreview = document.getElementById('img-preview');\nconst resultadoPrediccion = document.getElementById('prediccion');\nconst resultadoConfianza = document.getElementById('confianza');\nconst inputPrediccion = document.getElementById('inputPrediccion');\nconst inputConfianza = document.getElementById('inputConfianza');\n\n\nform.addEventListener(\"click\", () => {\n    imageUploader.click();\n});\n\nimageUploader.onchange = ({ target }) => {\n    let file = target.files[0];\n    if (file) {\n        let fileName = file.name;\n        if (fileName.length >= 12) {\n            let splitName = fileName.split('.');\n            fileName = splitName[0].substring(0, 13) + \"... .\" + splitName[1];\n        }\n    }\n}\n\nconst loading = document.getElementById('loading');\nconst loadingP = document.getElementById('loadingP');\nconst loadingC = document.getElementById('loadingC');\n\nimageUploader.addEventListener('change', function() {\n  loading.style.display = 'block';\n  loadingP.style.display = 'block';\n  loadingC.style.display = 'block';\n  setTimeout(function() {\n    loading.style.display = 'none';\n    loadingP.style.display = 'none';\n    loadingC.style.display = 'none';\n  }, 2000);\n\n});\n\n\n\n\nconst API_URL = `http://localhost:8080/predict`;\n// const API_URL = `http://165.232.139.195/predict`;\n\nimageUploader.addEventListener('change', async (e) => {\n    const file = e.target.files[0];\n    let objectURL = URL.createObjectURL(file);\n    imagePreview.src = objectURL;\n    const formData = new FormData();\n    formData.append('file', file);\n    const res = await axios.post(\n        API_URL,\n        formData,\n        {\n            headers: {\n                'Content-Type': 'multipart/form-data'\n            },\n        }\n    );\n    const data = res.data;\n    const prediccion = data.Predicción;\n    const confianza = data.Confianza;\n    const confianzaL = confianza * 100 + \"%\";\n    inputPrediccion.value = prediccion;\n    inputConfianza.value = confianzaL;\n    \n    setTimeout(function(){\n        resultadoPrediccion.innerHTML = prediccion;\n        resultadoConfianza.innerHTML = confianzaL;\n    }, 2000);\n});\n\n\n\n\n//# sourceURL=webpack://cropshield-app/./src/js/uploadFile.js?");

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
/******/ 	__webpack_modules__["./src/js/uploadFile.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;