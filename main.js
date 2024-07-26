/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");


class ThreeJSContainer {
    scene;
    light;
    hourHand;
    minuteHand;
    secondHand;
    renderer; // レンダラーをプロパティに追加
    camera; // カメラをプロパティに追加
    constructor() { }
    // 画面部分の作成(表示する枠ごとに)
    createRendererDOM = (cameraPos) => {
        this.renderer = new three__WEBPACK_IMPORTED_MODULE_1__.WebGLRenderer(); // レンダラーをプロパティに設定
        this.renderer.setSize(window.innerWidth, window.innerHeight); // 初期サイズをウィンドウサイズに設定
        this.renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_1__.Color(0x495ed));
        this.renderer.shadowMap.enabled = true; // シャドウマップを有効にする
        // カメラの設定
        this.camera = new three__WEBPACK_IMPORTED_MODULE_1__.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.copy(cameraPos);
        this.camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 0));
        let orbitControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__.OrbitControls(this.camera, this.renderer.domElement);
        this.createScene();
        this.createClock();
        // 毎フレームのupdateを呼んで，render
        // requestAnimationFrame により次フレームを呼ぶ
        let render = (time) => {
            orbitControls.update();
            this.updateClock();
            this.renderer.render(this.scene, this.camera);
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
        // ウィンドウのリサイズイベントを処理
        window.addEventListener('resize', this.onWindowResize);
        this.renderer.domElement.style.cssFloat = "left";
        this.renderer.domElement.style.margin = "10px";
        return this.renderer.domElement;
    };
    // ウィンドウのリサイズイベントハンドラ
    onWindowResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight; // カメラのアスペクト比を更新
        this.camera.updateProjectionMatrix(); // カメラのプロジェクションマトリックスを更新
        this.renderer.setSize(window.innerWidth, window.innerHeight); // レンダラーのサイズを更新
    };
    // シーンの作成(全体で1回)
    createScene = () => {
        this.scene = new three__WEBPACK_IMPORTED_MODULE_1__.Scene();
        // グリッド表示
        const gridHelper = new three__WEBPACK_IMPORTED_MODULE_1__.GridHelper(10);
        this.scene.add(gridHelper);
        // 軸表示
        const axesHelper = new three__WEBPACK_IMPORTED_MODULE_1__.AxesHelper(5);
        this.scene.add(axesHelper);
        // ライトの設定
        this.light = new three__WEBPACK_IMPORTED_MODULE_1__.DirectionalLight(0xffffff);
        let lvec = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(1, 1, 1).clone().normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);
        //環境マッピングテスト
        const urls = [
            "05_r.png",
            "05_l.png",
            "05_u.png",
            "05_d.png",
            "05_f.png",
            "05_b.png"
        ];
        // テクスチャのロード
        const cubeTextureLoader = new three__WEBPACK_IMPORTED_MODULE_1__.CubeTextureLoader();
        const textureMapping = cubeTextureLoader.load(urls);
        this.scene.background = textureMapping;
        // 環境マッピングの正10角形を表示
        const mappingGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.DodecahedronBufferGeometry(0.3, 0);
        const mappingMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshPhysicalMaterial({
            envMap: textureMapping,
            opacity: 0.5,
            roughness: 1,
            reflectivity: 1
        });
        const mapping = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(mappingGeometry, mappingMaterial);
        this.scene.add(mapping);
        mapping.position.x = 2;
        // メッシュ
        const geometry = new three__WEBPACK_IMPORTED_MODULE_1__.TorusGeometry(2, 0.15, 24, 130);
        const params = {
            color: 0xffffff,
            transmission: 1.6,
            opacity: 1,
            metalness: 0,
            roughness: 0,
            ior: 1.5,
            thickness: 5,
            specularIntensity: 1,
            specularColor: 0xffffff,
            dispersion: 5,
        };
        const material = new three__WEBPACK_IMPORTED_MODULE_1__.MeshPhysicalMaterial({
            color: params.color,
            transmission: params.transmission,
            opacity: params.opacity,
            metalness: params.metalness,
            roughness: params.roughness,
            ior: params.ior,
            envMapIntensity: 0.9,
            transparent: true,
            specularIntensity: params.specularIntensity,
            side: three__WEBPACK_IMPORTED_MODULE_1__.DoubleSide,
        });
        const torus = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(geometry, material);
        // torus.rotateY(0.6);
        this.scene.add(torus);
        // 集団制御用のグループを作成
        const group = new three__WEBPACK_IMPORTED_MODULE_1__.Group();
        this.scene.add(group);
        // // 60個の小さな球体を作成
        for (let i = 0; i < 60; i++) {
            // 球体作成
            const material = new three__WEBPACK_IMPORTED_MODULE_1__.MeshPhysicalMaterial({
                color: 0xffffff,
                transmission: 1.6,
                opacity: 1,
                metalness: 0,
                roughness: 0.4,
                ior: 1.5,
                // thickness: 5,
                specularIntensity: 1,
                // specularColor: 0xffffff,
                // dispersion: 5,
            });
            const geometry = new three__WEBPACK_IMPORTED_MODULE_1__.SphereGeometry(0.05, 16, 16);
            const mesh = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(geometry, material);
            //配置座標計算
            const radian = i / 60 * Math.PI * 2;
            mesh.position.set(Math.cos(radian), Math.sin(radian), 0);
            // グループに追加
            group.add(mesh);
        }
        // 毎フレームのupdateを呼んで，更新
        // reqestAnimationFrame により次フレームを呼ぶ
        let update = (time) => {
            requestAnimationFrame(update);
            // torus.rotation.x += 0.01;
            // torus.rotation.y += 0.02;
            // group.rotation.z += 0.01;
        };
        requestAnimationFrame(update);
    };
    // 時計の作成
    createClock = () => {
        // 時計の盤面を作成
        let clockFaceGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.CircleGeometry(1, 12);
        let clockFaceMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.5,
            side: three__WEBPACK_IMPORTED_MODULE_1__.DoubleSide,
            wireframe: true
        });
        let clockFace = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(clockFaceGeometry, clockFaceMaterial);
        this.scene.add(clockFace);
        // 時計の針の作成d
        let handGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(0.02, 0.5, 0.02);
        handGeometry.translate(0, 0.25, 0); // 回転の中心を移動
        let hourHandMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({ color: 0x0000ff });
        this.hourHand = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(handGeometry, hourHandMaterial);
        this.scene.add(this.hourHand);
        let minuteHandMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({ color: 0x00ff00 });
        this.minuteHand = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(handGeometry, minuteHandMaterial);
        this.minuteHand.scale.set(1, 1.5, 1);
        this.scene.add(this.minuteHand);
        let secondHandMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({ color: 0xff0000 });
        this.secondHand = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(handGeometry, secondHandMaterial);
        this.secondHand.scale.set(1, 2, 1);
        this.scene.add(this.secondHand);
    };
    // TODO:位置秒ごとに何かを動作させる関数 Done
    // シーン例:ノイズの背景が動く,パーティクルがイージングで動いていく
    // 1s毎にパーティクルが100個増える？みたいなやつ
    // tween でいい感じにイージングかけて回転する
    // とりあえず見た目をかっこよくしたい
    previousSeconds = -1; // 前回の秒数を保存するプロパティ
    // 時計の更新
    updateClock = () => {
        let now = new Date();
        let seconds = now.getSeconds(); // 現在の秒数
        let minutes = now.getMinutes();
        let hours = now.getHours() % 12;
        // 秒数が5の倍数かつ前回の秒数と異なる場合にメッセージを表示
        if (seconds % 5 === 0 && seconds !== this.previousSeconds) {
            // console.log("秒数が5の倍数になりました:", seconds);
            // this.testfunc();
        }
        // 時計の針の回転を更新
        this.secondHand.rotation.z = -seconds * (Math.PI / 30); // 1秒に6°回転 (PI/30)
        this.minuteHand.rotation.z = -minutes * (Math.PI / 30) - seconds * (Math.PI / 1800);
        // わずかに動く分を補正する
        this.hourHand.rotation.z = -hours * (Math.PI / 6) - minutes * (Math.PI / 360);
        // 前回の秒数を更新
        this.previousSeconds = seconds;
        // // 時計の秒数に応じて作成される円の描画
        // const timeTorusGeo = new THREE.TorusBufferGeometry(1,0.2,12,100,Math.PI);
        // const timeTorusMat = new THREE.MeshBasicMaterial();
        // const timeTorus = new THREE.Mesh(timeTorusGeo,timeTorusMat);
        // this.scene.add(timeTorus)
        // 毎秒ジオメトリを作成するのは負荷がかかる
    };
    testfunc = () => {
        // console.log("動くぞ!")
    };
}
window.addEventListener("DOMContentLoaded", init);
function init() {
    let container = new ThreeJSContainer();
    let viewport = container.createRendererDOM(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 3));
    document.body.appendChild(viewport);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcgprendering"] = self["webpackChunkcgprendering"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_examples_jsm_controls_OrbitControls_js"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gXCJ0aHJlZS9leGFtcGxlcy9qc20vY29udHJvbHMvT3JiaXRDb250cm9sc1wiO1xuaW1wb3J0IHsgU2hhZGVyTWF0ZXJpYWwgfSBmcm9tIFwidGhyZWUvc3JjL21hdGVyaWFscy9TaGFkZXJNYXRlcmlhbFwiO1xuaW1wb3J0IHsgVGV4dEdlb21ldHJ5IH0gZnJvbSBcIi4vVGV4dEdlb21ldHJ5LmpzXCI7XG5pbXBvcnQgeyBFZmZlY3RDb21wb3NlciB9IGZyb20gXCJ0aHJlZS9leGFtcGxlcy9qc20vcG9zdHByb2Nlc3NpbmcvRWZmZWN0Q29tcG9zZXJcIjtcbmltcG9ydCB7IFJlbmRlclBhc3MgfSBmcm9tIFwidGhyZWUvZXhhbXBsZXMvanNtL3Bvc3Rwcm9jZXNzaW5nL1JlbmRlclBhc3NcIjtcbmltcG9ydCB7IFVucmVhbEJsb29tUGFzcyB9IGZyb20gXCJ0aHJlZS9leGFtcGxlcy9qc20vcG9zdHByb2Nlc3NpbmcvVW5yZWFsQmxvb21QYXNzXCI7XG5cblxuY2xhc3MgVGhyZWVKU0NvbnRhaW5lciB7XG4gICAgcHJpdmF0ZSBzY2VuZTogVEhSRUUuU2NlbmU7XG4gICAgcHJpdmF0ZSBsaWdodDogVEhSRUUuTGlnaHQ7XG4gICAgcHJpdmF0ZSBob3VySGFuZDogVEhSRUUuTWVzaDtcbiAgICBwcml2YXRlIG1pbnV0ZUhhbmQ6IFRIUkVFLk1lc2g7XG4gICAgcHJpdmF0ZSBzZWNvbmRIYW5kOiBUSFJFRS5NZXNoO1xuICAgIHByaXZhdGUgcmVuZGVyZXI6IFRIUkVFLldlYkdMUmVuZGVyZXI7IC8vIOODrOODs+ODgOODqeODvOOCkuODl+ODreODkeODhuOCo+OBq+i/veWKoFxuICAgIHByaXZhdGUgY2FtZXJhOiBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYTsgLy8g44Kr44Oh44Op44KS44OX44Ot44OR44OG44Kj44Gr6L+95YqgXG5cbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICAvLyDnlLvpnaLpg6jliIbjga7kvZzmiJAo6KGo56S644GZ44KL5p6g44GU44Go44GrKVxuICAgIHB1YmxpYyBjcmVhdGVSZW5kZXJlckRPTSA9IChjYW1lcmFQb3M6IFRIUkVFLlZlY3RvcjMpID0+IHtcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKCk7IC8vIOODrOODs+ODgOODqeODvOOCkuODl+ODreODkeODhuOCo+OBq+ioreWumlxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7IC8vIOWIneacn+OCteOCpOOCuuOCkuOCpuOCo+ODs+ODieOCpuOCteOCpOOCuuOBq+ioreWumlxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldENsZWFyQ29sb3IobmV3IFRIUkVFLkNvbG9yKDB4NDk1ZWQpKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHRydWU7IC8vIOOCt+ODo+ODieOCpuODnuODg+ODl+OCkuacieWKueOBq+OBmeOCi1xuXG4gICAgICAgIC8vIOOCq+ODoeODqeOBruioreWumlxuICAgICAgICB0aGlzLmNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg3NSwgd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsIDAuMSwgMTAwMCk7XG4gICAgICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLmNvcHkoY2FtZXJhUG9zKTtcbiAgICAgICAgdGhpcy5jYW1lcmEubG9va0F0KG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApKTtcblxuICAgICAgICBsZXQgb3JiaXRDb250cm9scyA9IG5ldyBPcmJpdENvbnRyb2xzKHRoaXMuY2FtZXJhLCB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuICAgICAgICB0aGlzLmNyZWF0ZVNjZW5lKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlQ2xvY2soKTtcblxuICAgICAgICAvLyDmr47jg5Xjg6zjg7zjg6Djga51cGRhdGXjgpLlkbzjgpPjgafvvIxyZW5kZXJcbiAgICAgICAgLy8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lIOOBq+OCiOOCiuasoeODleODrOODvOODoOOCkuWRvOOBtlxuICAgICAgICBsZXQgcmVuZGVyOiBGcmFtZVJlcXVlc3RDYWxsYmFjayA9ICh0aW1lKSA9PiB7XG4gICAgICAgICAgICBvcmJpdENvbnRyb2xzLnVwZGF0ZSgpO1xuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNsb2NrKCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSk7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcblxuICAgICAgICAvLyDjgqbjgqPjg7Pjg4njgqbjga7jg6rjgrXjgqTjgrrjgqTjg5njg7Pjg4jjgpLlh6bnkIZcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMub25XaW5kb3dSZXNpemUpO1xuXG4gICAgICAgIHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudC5zdHlsZS5jc3NGbG9hdCA9IFwibGVmdFwiO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQuc3R5bGUubWFyZ2luID0gXCIxMHB4XCI7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLy8g44Km44Kj44Oz44OJ44Km44Gu44Oq44K144Kk44K644Kk44OZ44Oz44OI44OP44Oz44OJ44OpXG4gICAgcHJpdmF0ZSBvbldpbmRvd1Jlc2l6ZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5jYW1lcmEuYXNwZWN0ID0gd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQ7IC8vIOOCq+ODoeODqeOBruOCouOCueODmuOCr+ODiOavlOOCkuabtOaWsFxuICAgICAgICB0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7IC8vIOOCq+ODoeODqeOBruODl+ODreOCuOOCp+OCr+OCt+ODp+ODs+ODnuODiOODquODg+OCr+OCueOCkuabtOaWsFxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7IC8vIOODrOODs+ODgOODqeODvOOBruOCteOCpOOCuuOCkuabtOaWsFxuICAgIH1cblxuICAgIC8vIOOCt+ODvOODs+OBruS9nOaIkCjlhajkvZPjgacx5ZueKVxuICAgIHByaXZhdGUgY3JlYXRlU2NlbmUgPSAoKSA9PiB7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG4gICAgICAgIFxuICAgICAgICAvLyDjgrDjg6rjg4Pjg4nooajnpLpcbiAgICAgICAgY29uc3QgZ3JpZEhlbHBlciA9IG5ldyBUSFJFRS5HcmlkSGVscGVyKCAxMCwpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZCggZ3JpZEhlbHBlciApOyAgXG5cbiAgICAgICAgLy8g6Lu46KGo56S6XG4gICAgICAgIGNvbnN0IGF4ZXNIZWxwZXIgPSBuZXcgVEhSRUUuQXhlc0hlbHBlciggNSApO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZCggYXhlc0hlbHBlciApO1xuICAgICAgICAvLyDjg6njgqTjg4jjga7oqK3lrppcbiAgICAgICAgdGhpcy5saWdodCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZmZmZmKTtcbiAgICAgICAgbGV0IGx2ZWMgPSBuZXcgVEhSRUUuVmVjdG9yMygxLCAxLCAxKS5ub3JtYWxpemUoKTtcbiAgICAgICAgdGhpcy5saWdodC5wb3NpdGlvbi5zZXQobHZlYy54LCBsdmVjLnksIGx2ZWMueik7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMubGlnaHQpO1xuICAgICAgICAvL+eSsOWig+ODnuODg+ODlOODs+OCsOODhuOCueODiFxuICAgICAgICBjb25zdCB1cmxzID0gW1xuICAgICAgICAgICAgXCIwNV9yLnBuZ1wiLFxuICAgICAgICAgICAgXCIwNV9sLnBuZ1wiLFxuICAgICAgICAgICAgXCIwNV91LnBuZ1wiLFxuICAgICAgICAgICAgXCIwNV9kLnBuZ1wiLFxuICAgICAgICAgICAgXCIwNV9mLnBuZ1wiLFxuICAgICAgICAgICAgXCIwNV9iLnBuZ1wiXG4gICAgICAgIF1cbiAgICAgICAgLy8g44OG44Kv44K544OB44Oj44Gu44Ot44O844OJXG4gICAgICAgIGNvbnN0IGN1YmVUZXh0dXJlTG9hZGVyID0gbmV3IFRIUkVFLkN1YmVUZXh0dXJlTG9hZGVyKCk7XG4gICAgICAgIGNvbnN0IHRleHR1cmVNYXBwaW5nID0gY3ViZVRleHR1cmVMb2FkZXIubG9hZCh1cmxzKTtcbiAgICAgICAgdGhpcy5zY2VuZS5iYWNrZ3JvdW5kID0gdGV4dHVyZU1hcHBpbmc7XG4gICAgICAgIC8vIOeSsOWig+ODnuODg+ODlOODs+OCsOOBruatozEw6KeS5b2i44KS6KGo56S6XG4gICAgICAgIGNvbnN0IG1hcHBpbmdHZW9tZXRyeSA9IG5ldyBUSFJFRS5Eb2RlY2FoZWRyb25CdWZmZXJHZW9tZXRyeSgwLjMsMCk7XG4gICAgICAgIGNvbnN0IG1hcHBpbmdNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoUGh5c2ljYWxNYXRlcmlhbCh7XG4gICAgICAgICAgICBlbnZNYXA6IHRleHR1cmVNYXBwaW5nLFxuICAgICAgICAgICAgb3BhY2l0eTogMC41LFxuICAgICAgICAgICAgcm91Z2huZXNzOiAxLFxuICAgICAgICAgICAgcmVmbGVjdGl2aXR5OiAxIFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgbWFwcGluZyA9IG5ldyBUSFJFRS5NZXNoKG1hcHBpbmdHZW9tZXRyeSxtYXBwaW5nTWF0ZXJpYWwpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZChtYXBwaW5nKVxuICAgICAgICBtYXBwaW5nLnBvc2l0aW9uLnggPSAyXG5cblxuICAgICAgICAvLyDjg6Hjg4Pjgrfjg6VcbiAgICAgICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuVG9ydXNHZW9tZXRyeSgyLCAwLjE1LCAyNCwgMTMwKTtcblxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgICAgICBjb2xvcjogMHhmZmZmZmYsXG4gICAgICAgICAgICB0cmFuc21pc3Npb246IDEuNixcbiAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICBtZXRhbG5lc3M6IDAsXG4gICAgICAgICAgICByb3VnaG5lc3M6IDAsXG4gICAgICAgICAgICBpb3I6IDEuNSxcbiAgICAgICAgICAgIHRoaWNrbmVzczogNSxcbiAgICAgICAgICAgIHNwZWN1bGFySW50ZW5zaXR5OiAxLFxuICAgICAgICAgICAgc3BlY3VsYXJDb2xvcjogMHhmZmZmZmYsXG4gICAgICAgICAgICBkaXNwZXJzaW9uOiA1LFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hQaHlzaWNhbE1hdGVyaWFsKHtcbiAgICAgICAgICAgIGNvbG9yOiBwYXJhbXMuY29sb3IsXG4gICAgICAgICAgICB0cmFuc21pc3Npb246IHBhcmFtcy50cmFuc21pc3Npb24sXG4gICAgICAgICAgICBvcGFjaXR5OiBwYXJhbXMub3BhY2l0eSxcbiAgICAgICAgICAgIG1ldGFsbmVzczogcGFyYW1zLm1ldGFsbmVzcyxcbiAgICAgICAgICAgIHJvdWdobmVzczogcGFyYW1zLnJvdWdobmVzcyxcbiAgICAgICAgICAgIGlvcjogcGFyYW1zLmlvcixcbiAgICAgICAgICAgIGVudk1hcEludGVuc2l0eTogMC45LFxuICAgICAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgICAgICBzcGVjdWxhckludGVuc2l0eTogcGFyYW1zLnNwZWN1bGFySW50ZW5zaXR5LFxuICAgICAgICAgICAgc2lkZTogVEhSRUUuRG91YmxlU2lkZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgdG9ydXMgPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgICAgICAvLyB0b3J1cy5yb3RhdGVZKDAuNik7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRvcnVzKTtcblxuICAgICAgICAvLyDpm4blm6PliLblvqHnlKjjga7jgrDjg6vjg7zjg5fjgpLkvZzmiJBcbiAgICAgICAgY29uc3QgZ3JvdXAgPSBuZXcgVEhSRUUuR3JvdXAoKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoZ3JvdXApO1xuXG4gICAgICAgIC8vIC8vIDYw5YCL44Gu5bCP44GV44Gq55CD5L2T44KS5L2c5oiQXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpPCA2MDsgaSsrKXtcbiAgICAgICAgICAgIC8vIOeQg+S9k+S9nOaIkFxuICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFBoeXNpY2FsTWF0ZXJpYWwoe1xuICAgICAgICAgICAgICAgIGNvbG9yOiAweGZmZmZmZixcbiAgICAgICAgICAgICAgICB0cmFuc21pc3Npb246IDEuNixcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgICAgIG1ldGFsbmVzczogMCxcbiAgICAgICAgICAgICAgICByb3VnaG5lc3M6IDAuNCxcbiAgICAgICAgICAgICAgICBpb3I6IDEuNSxcbiAgICAgICAgICAgICAgICAvLyB0aGlja25lc3M6IDUsXG4gICAgICAgICAgICAgICAgc3BlY3VsYXJJbnRlbnNpdHk6IDEsXG4gICAgICAgICAgICAgICAgLy8gc3BlY3VsYXJDb2xvcjogMHhmZmZmZmYsXG4gICAgICAgICAgICAgICAgLy8gZGlzcGVyc2lvbjogNSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoMC4wNSwxNiwxNik7XG4gICAgICAgICAgICBjb25zdCBtZXNoID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksbWF0ZXJpYWwpO1xuXG4gICAgICAgICAgICAvL+mFjee9ruW6p+aomeioiOeul1xuICAgICAgICAgICAgY29uc3QgcmFkaWFuID0gaSAvIDYwICogTWF0aC5QSSAqIDI7XG4gICAgICAgICAgICBtZXNoLnBvc2l0aW9uLnNldChcbiAgICAgICAgICAgICAgICBNYXRoLmNvcyhyYWRpYW4pLFxuICAgICAgICAgICAgICAgIE1hdGguc2luKHJhZGlhbiksXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLy8g44Kw44Or44O844OX44Gr6L+95YqgXG4gICAgICAgICAgICBncm91cC5hZGQobWVzaCk7XG4gICAgICAgIH1cblxuICAgICAgICBcblxuXG5cblxuICAgICAgICAvLyDmr47jg5Xjg6zjg7zjg6Djga51cGRhdGXjgpLlkbzjgpPjgafvvIzmm7TmlrBcbiAgICAgICAgLy8gcmVxZXN0QW5pbWF0aW9uRnJhbWUg44Gr44KI44KK5qyh44OV44Os44O844Og44KS5ZG844G2XG4gICAgICAgIGxldCB1cGRhdGU6IEZyYW1lUmVxdWVzdENhbGxiYWNrID0gKHRpbWUpID0+IHtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xuICAgICAgICAgICAgLy8gdG9ydXMucm90YXRpb24ueCArPSAwLjAxO1xuICAgICAgICAgICAgLy8gdG9ydXMucm90YXRpb24ueSArPSAwLjAyO1xuICAgICAgICAgICAgLy8gZ3JvdXAucm90YXRpb24ueiArPSAwLjAxO1xuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xuICAgIH1cblxuICAgIC8vIOaZguioiOOBruS9nOaIkFxuICAgIHByaXZhdGUgY3JlYXRlQ2xvY2sgPSAoKSA9PiB7XG4gICAgICAgIC8vIOaZguioiOOBruebpOmdouOCkuS9nOaIkFxuICAgICAgICBsZXQgY2xvY2tGYWNlR2VvbWV0cnkgPSBuZXcgVEhSRUUuQ2lyY2xlR2VvbWV0cnkoMSwgMTIpO1xuICAgICAgICBsZXQgY2xvY2tGYWNlTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe1xuICAgICAgICAgICAgY29sb3I6IDB4ZmZmZmZmLCBcbiAgICAgICAgICAgIHJvdWdobmVzczogMC41LFxuICAgICAgICAgICAgc2lkZTpUSFJFRS5Eb3VibGVTaWRlLFxuICAgICAgICAgICAgd2lyZWZyYW1lOiB0cnVlIFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGxldCBjbG9ja0ZhY2UgPSBuZXcgVEhSRUUuTWVzaChjbG9ja0ZhY2VHZW9tZXRyeSwgY2xvY2tGYWNlTWF0ZXJpYWwpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZChjbG9ja0ZhY2UpO1xuXG4gICAgICAgIC8vIOaZguioiOOBrumHneOBruS9nOaIkGRcbiAgICAgICAgbGV0IGhhbmRHZW9tZXRyeSA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgwLjAyLCAwLjUsIDAuMDIpO1xuICAgICAgICBoYW5kR2VvbWV0cnkudHJhbnNsYXRlKDAsIDAuMjUsIDApOyAvLyDlm57ou6Ljga7kuK3lv4PjgpLnp7vli5VcblxuICAgICAgICBsZXQgaG91ckhhbmRNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IGNvbG9yOiAweDAwMDBmZiB9KTtcbiAgICAgICAgdGhpcy5ob3VySGFuZCA9IG5ldyBUSFJFRS5NZXNoKGhhbmRHZW9tZXRyeSwgaG91ckhhbmRNYXRlcmlhbCk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMuaG91ckhhbmQpO1xuXG4gICAgICAgIGxldCBtaW51dGVIYW5kTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBjb2xvcjogMHgwMGZmMDAgfSk7XG4gICAgICAgIHRoaXMubWludXRlSGFuZCA9IG5ldyBUSFJFRS5NZXNoKGhhbmRHZW9tZXRyeSwgbWludXRlSGFuZE1hdGVyaWFsKTtcbiAgICAgICAgdGhpcy5taW51dGVIYW5kLnNjYWxlLnNldCgxLCAxLjUsIDEpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLm1pbnV0ZUhhbmQpO1xuXG4gICAgICAgIGxldCBzZWNvbmRIYW5kTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBjb2xvcjogMHhmZjAwMDAgfSk7XG4gICAgICAgIHRoaXMuc2Vjb25kSGFuZCA9IG5ldyBUSFJFRS5NZXNoKGhhbmRHZW9tZXRyeSwgc2Vjb25kSGFuZE1hdGVyaWFsKTtcbiAgICAgICAgdGhpcy5zZWNvbmRIYW5kLnNjYWxlLnNldCgxLCAyLCAxKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5zZWNvbmRIYW5kKTtcblxuICAgICAgICBcbiAgICB9XG4gICAgLy8gVE9ETzrkvY3nva7np5LjgZTjgajjgavkvZXjgYvjgpLli5XkvZzjgZXjgZvjgovplqLmlbAgRG9uZVxuICAgIC8vIOOCt+ODvOODs+S+izrjg47jgqTjgrrjga7og4zmma/jgYzli5XjgY8s44OR44O844OG44Kj44Kv44Or44GM44Kk44O844K444Oz44Kw44Gn5YuV44GE44Gm44GE44GPXG4gICAgLy8gMXPmr47jgavjg5Hjg7zjg4bjgqPjgq/jg6vjgYwxMDDlgIvlopfjgYjjgovvvJ/jgb/jgZ/jgYTjgarjgoTjgaRcbiAgICAgICAgLy8gdHdlZW4g44Gn44GE44GE5oSf44GY44Gr44Kk44O844K444Oz44Kw44GL44GR44Gm5Zue6Lui44GZ44KLXG4gICAgXG4gICAgLy8g44Go44KK44GC44GI44Ga6KaL44Gf55uu44KS44GL44Gj44GT44KI44GP44GX44Gf44GEXG5cbiAgICBwcml2YXRlIHByZXZpb3VzU2Vjb25kczogbnVtYmVyID0gLTE7IC8vIOWJjeWbnuOBruenkuaVsOOCkuS/neWtmOOBmeOCi+ODl+ODreODkeODhuOCo1xuICAgIC8vIOaZguioiOOBruabtOaWsFxuICAgIHByaXZhdGUgdXBkYXRlQ2xvY2sgPSAoKSA9PiB7XG4gICAgICAgIGxldCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBsZXQgc2Vjb25kcyA9IG5vdy5nZXRTZWNvbmRzKCk7IC8vIOePvuWcqOOBruenkuaVsFxuICAgICAgICBsZXQgbWludXRlcyA9IG5vdy5nZXRNaW51dGVzKCk7XG4gICAgICAgIGxldCBob3VycyA9IG5vdy5nZXRIb3VycygpICUgMTI7XG5cbiAgICAgICAgLy8g56eS5pWw44GMNeOBruWAjeaVsOOBi+OBpOWJjeWbnuOBruenkuaVsOOBqOeVsOOBquOCi+WgtOWQiOOBq+ODoeODg+OCu+ODvOOCuOOCkuihqOekulxuICAgICAgICBpZiAoc2Vjb25kcyAlIDUgPT09IDAgJiYgc2Vjb25kcyAhPT0gdGhpcy5wcmV2aW91c1NlY29uZHMpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi56eS5pWw44GMNeOBruWAjeaVsOOBq+OBquOCiuOBvuOBl+OBnzpcIiwgc2Vjb25kcyk7XG4gICAgICAgICAgICAvLyB0aGlzLnRlc3RmdW5jKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDmmYLoqIjjga7ph53jga7lm57ou6LjgpLmm7TmlrBcbiAgICAgICAgdGhpcy5zZWNvbmRIYW5kLnJvdGF0aW9uLnogPSAtc2Vjb25kcyAqIChNYXRoLlBJIC8gMzApOyAvLyAx56eS44GrNsKw5Zue6LuiIChQSS8zMClcbiAgICAgICAgdGhpcy5taW51dGVIYW5kLnJvdGF0aW9uLnogPSAtbWludXRlcyAqIChNYXRoLlBJIC8gMzApIC0gc2Vjb25kcyAqIChNYXRoLlBJIC8gMTgwMCk7XG4gICAgICAgIC8vIOOCj+OBmuOBi+OBq+WLleOBj+WIhuOCkuijnOato+OBmeOCi1xuICAgICAgICB0aGlzLmhvdXJIYW5kLnJvdGF0aW9uLnogPSAtaG91cnMgKiAoTWF0aC5QSSAvIDYpIC0gbWludXRlcyAqIChNYXRoLlBJIC8gMzYwKTtcblxuICAgICAgICAvLyDliY3lm57jga7np5LmlbDjgpLmm7TmlrBcbiAgICAgICAgdGhpcy5wcmV2aW91c1NlY29uZHMgPSBzZWNvbmRzO1xuXG4gICAgICAgIC8vIC8vIOaZguioiOOBruenkuaVsOOBq+W/nOOBmOOBpuS9nOaIkOOBleOCjOOCi+WGhuOBruaPj+eUu1xuICAgICAgICAvLyBjb25zdCB0aW1lVG9ydXNHZW8gPSBuZXcgVEhSRUUuVG9ydXNCdWZmZXJHZW9tZXRyeSgxLDAuMiwxMiwxMDAsTWF0aC5QSSk7XG4gICAgICAgIC8vIGNvbnN0IHRpbWVUb3J1c01hdCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCgpO1xuICAgICAgICAvLyBjb25zdCB0aW1lVG9ydXMgPSBuZXcgVEhSRUUuTWVzaCh0aW1lVG9ydXNHZW8sdGltZVRvcnVzTWF0KTtcbiAgICAgICAgLy8gdGhpcy5zY2VuZS5hZGQodGltZVRvcnVzKVxuICAgICAgICAvLyDmr47np5Ljgrjjgqrjg6Hjg4jjg6rjgpLkvZzmiJDjgZnjgovjga7jga/osqDojbfjgYzjgYvjgYvjgotcbiAgICB9XG5cbiAgICBwcml2YXRlIHRlc3RmdW5jID0gKCkgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuWLleOBj+OBniFcIilcbiAgICB9XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBpbml0KTtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBsZXQgY29udGFpbmVyID0gbmV3IFRocmVlSlNDb250YWluZXIoKTtcblxuICAgIGxldCB2aWV3cG9ydCA9IGNvbnRhaW5lci5jcmVhdGVSZW5kZXJlckRPTShuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAzKSk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh2aWV3cG9ydCk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2NncHJlbmRlcmluZ1wiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjZ3ByZW5kZXJpbmdcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9jb250cm9sc19PcmJpdENvbnRyb2xzX2pzXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2FwcC50c1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9