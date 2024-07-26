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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQStCO0FBQzJDO0FBUTFFLE1BQU0sZ0JBQWdCO0lBQ1YsS0FBSyxDQUFjO0lBQ25CLEtBQUssQ0FBYztJQUNuQixRQUFRLENBQWE7SUFDckIsVUFBVSxDQUFhO0lBQ3ZCLFVBQVUsQ0FBYTtJQUN2QixRQUFRLENBQXNCLENBQUMsaUJBQWlCO0lBQ2hELE1BQU0sQ0FBMEIsQ0FBQyxlQUFlO0lBRXhELGdCQUFlLENBQUM7SUFFaEIsb0JBQW9CO0lBQ2IsaUJBQWlCLEdBQUcsQ0FBQyxTQUF3QixFQUFFLEVBQUU7UUFDcEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGdEQUFtQixFQUFFLENBQUMsQ0FBQyxpQkFBaUI7UUFDNUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxvQkFBb0I7UUFDbEYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSx3Q0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDLGdCQUFnQjtRQUV4RCxTQUFTO1FBQ1QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLG9EQUF1QixDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2pHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLDBDQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRS9DLElBQUksYUFBYSxHQUFHLElBQUksb0ZBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVuQiwwQkFBMEI7UUFDMUIsb0NBQW9DO1FBQ3BDLElBQUksTUFBTSxHQUF5QixDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3hDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUV2QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEMsQ0FBQztRQUNELHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTlCLG9CQUFvQjtRQUNwQixNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUV2RCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUNqRCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUMvQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxxQkFBcUI7SUFDYixjQUFjLEdBQUcsR0FBRyxFQUFFO1FBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLGdCQUFnQjtRQUM3RSxJQUFJLENBQUMsTUFBTSxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQyx3QkFBd0I7UUFDOUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxlQUFlO0lBQ2pGLENBQUM7SUFFRCxnQkFBZ0I7SUFDUixXQUFXLEdBQUcsR0FBRyxFQUFFO1FBRXZCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSx3Q0FBVyxFQUFFLENBQUM7UUFFL0IsU0FBUztRQUNULE1BQU0sVUFBVSxHQUFHLElBQUksNkNBQWdCLENBQUUsRUFBRSxDQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUUsVUFBVSxDQUFFLENBQUM7UUFFN0IsTUFBTTtRQUNOLE1BQU0sVUFBVSxHQUFHLElBQUksNkNBQWdCLENBQUUsQ0FBQyxDQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUUsVUFBVSxDQUFFLENBQUM7UUFDN0IsU0FBUztRQUNULElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxtREFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRCxJQUFJLElBQUksR0FBRyxJQUFJLDBDQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNsRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsWUFBWTtRQUNaLE1BQU0sSUFBSSxHQUFHO1lBQ1QsVUFBVTtZQUNWLFVBQVU7WUFDVixVQUFVO1lBQ1YsVUFBVTtZQUNWLFVBQVU7WUFDVixVQUFVO1NBQ2I7UUFDRCxZQUFZO1FBQ1osTUFBTSxpQkFBaUIsR0FBRyxJQUFJLG9EQUF1QixFQUFFLENBQUM7UUFDeEQsTUFBTSxjQUFjLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLGNBQWMsQ0FBQztRQUN2QyxtQkFBbUI7UUFDbkIsTUFBTSxlQUFlLEdBQUcsSUFBSSw2REFBZ0MsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEUsTUFBTSxlQUFlLEdBQUcsSUFBSSx1REFBMEIsQ0FBQztZQUNuRCxNQUFNLEVBQUUsY0FBYztZQUN0QixPQUFPLEVBQUUsR0FBRztZQUNaLFNBQVMsRUFBRSxDQUFDO1lBQ1osWUFBWSxFQUFFLENBQUM7U0FDbEIsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxPQUFPLEdBQUcsSUFBSSx1Q0FBVSxDQUFDLGVBQWUsRUFBQyxlQUFlLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7UUFDdkIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUd0QixPQUFPO1FBQ1AsTUFBTSxRQUFRLEdBQUcsSUFBSSxnREFBbUIsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUUzRCxNQUFNLE1BQU0sR0FBRztZQUNYLEtBQUssRUFBRSxRQUFRO1lBQ2YsWUFBWSxFQUFFLEdBQUc7WUFDakIsT0FBTyxFQUFFLENBQUM7WUFDVixTQUFTLEVBQUUsQ0FBQztZQUNaLFNBQVMsRUFBRSxDQUFDO1lBQ1osR0FBRyxFQUFFLEdBQUc7WUFDUixTQUFTLEVBQUUsQ0FBQztZQUNaLGlCQUFpQixFQUFFLENBQUM7WUFDcEIsYUFBYSxFQUFFLFFBQVE7WUFDdkIsVUFBVSxFQUFFLENBQUM7U0FDaEIsQ0FBQztRQUVGLE1BQU0sUUFBUSxHQUFHLElBQUksdURBQTBCLENBQUM7WUFDNUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO1lBQ25CLFlBQVksRUFBRSxNQUFNLENBQUMsWUFBWTtZQUNqQyxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU87WUFDdkIsU0FBUyxFQUFFLE1BQU0sQ0FBQyxTQUFTO1lBQzNCLFNBQVMsRUFBRSxNQUFNLENBQUMsU0FBUztZQUMzQixHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUc7WUFDZixlQUFlLEVBQUUsR0FBRztZQUNwQixXQUFXLEVBQUUsSUFBSTtZQUNqQixpQkFBaUIsRUFBRSxNQUFNLENBQUMsaUJBQWlCO1lBQzNDLElBQUksRUFBRSw2Q0FBZ0I7U0FDekIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxLQUFLLEdBQUcsSUFBSSx1Q0FBVSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNqRCxzQkFBc0I7UUFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFdEIsZ0JBQWdCO1FBQ2hCLE1BQU0sS0FBSyxHQUFHLElBQUksd0NBQVcsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXRCLGtCQUFrQjtRQUNsQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFDO1lBQ3ZCLE9BQU87WUFDUCxNQUFNLFFBQVEsR0FBRyxJQUFJLHVEQUEwQixDQUFDO2dCQUM1QyxLQUFLLEVBQUUsUUFBUTtnQkFDZixZQUFZLEVBQUUsR0FBRztnQkFDakIsT0FBTyxFQUFFLENBQUM7Z0JBQ1YsU0FBUyxFQUFFLENBQUM7Z0JBQ1osU0FBUyxFQUFFLEdBQUc7Z0JBQ2QsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsZ0JBQWdCO2dCQUNoQixpQkFBaUIsRUFBRSxDQUFDO2dCQUNwQiwyQkFBMkI7Z0JBQzNCLGlCQUFpQjthQUNwQixDQUFDLENBQUM7WUFDSCxNQUFNLFFBQVEsR0FBRyxJQUFJLGlEQUFvQixDQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEQsTUFBTSxJQUFJLEdBQUcsSUFBSSx1Q0FBVSxDQUFDLFFBQVEsRUFBQyxRQUFRLENBQUMsQ0FBQztZQUUvQyxRQUFRO1lBQ1IsTUFBTSxNQUFNLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FDYixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUNoQixDQUFDLENBQ0osQ0FBQztZQUVGLFVBQVU7WUFDVixLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ25CO1FBSUQsc0JBQXNCO1FBQ3RCLG1DQUFtQztRQUNuQyxJQUFJLE1BQU0sR0FBeUIsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN4QyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM5Qiw0QkFBNEI7WUFDNUIsNEJBQTRCO1lBQzVCLDRCQUE0QjtRQUNoQyxDQUFDO1FBQ0QscUJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELFFBQVE7SUFDQSxXQUFXLEdBQUcsR0FBRyxFQUFFO1FBQ3ZCLFdBQVc7UUFDWCxJQUFJLGlCQUFpQixHQUFHLElBQUksaURBQW9CLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3hELElBQUksaUJBQWlCLEdBQUcsSUFBSSx1REFBMEIsQ0FBQztZQUNuRCxLQUFLLEVBQUUsUUFBUTtZQUNmLFNBQVMsRUFBRSxHQUFHO1lBQ2QsSUFBSSxFQUFDLDZDQUFnQjtZQUNyQixTQUFTLEVBQUUsSUFBSTtTQUNkLENBQUMsQ0FBQztRQUNQLElBQUksU0FBUyxHQUFHLElBQUksdUNBQVUsQ0FBQyxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTFCLFdBQVc7UUFDWCxJQUFJLFlBQVksR0FBRyxJQUFJLDhDQUFpQixDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUQsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVztRQUUvQyxJQUFJLGdCQUFnQixHQUFHLElBQUksb0RBQXVCLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksdUNBQVUsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFOUIsSUFBSSxrQkFBa0IsR0FBRyxJQUFJLG9EQUF1QixDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLHVDQUFVLENBQUMsWUFBWSxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRWhDLElBQUksa0JBQWtCLEdBQUcsSUFBSSxvREFBdUIsQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSx1Q0FBVSxDQUFDLFlBQVksRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUdwQyxDQUFDO0lBQ0QsNkJBQTZCO0lBQzdCLG9DQUFvQztJQUNwQyw0QkFBNEI7SUFDeEIsMkJBQTJCO0lBRS9CLG9CQUFvQjtJQUVaLGVBQWUsR0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQjtJQUN4RCxRQUFRO0lBQ0EsV0FBVyxHQUFHLEdBQUcsRUFBRTtRQUN2QixJQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3JCLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLFFBQVE7UUFDeEMsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQy9CLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFFaEMsZ0NBQWdDO1FBQ2hDLElBQUksT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksT0FBTyxLQUFLLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDdkQsMENBQTBDO1lBQzFDLG1CQUFtQjtTQUN0QjtRQUVELGFBQWE7UUFDYixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsa0JBQWtCO1FBQzFFLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUNwRixlQUFlO1FBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBRTlFLFdBQVc7UUFDWCxJQUFJLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQztRQUUvQix3QkFBd0I7UUFDeEIsNEVBQTRFO1FBQzVFLHNEQUFzRDtRQUN0RCwrREFBK0Q7UUFDL0QsNEJBQTRCO1FBQzVCLHVCQUF1QjtJQUMzQixDQUFDO0lBRU8sUUFBUSxHQUFHLEdBQUcsRUFBRTtRQUNwQixzQkFBc0I7SUFDMUIsQ0FBQztDQUNKO0FBRUQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDO0FBRWxELFNBQVMsSUFBSTtJQUNULElBQUksU0FBUyxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztJQUV2QyxJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsaUJBQWlCLENBQUMsSUFBSSwwQ0FBYSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2RSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN4QyxDQUFDOzs7Ozs7O1VDNVFEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7Ozs7V0N6QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSwrQkFBK0Isd0NBQXdDO1dBQ3ZFO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUJBQWlCLHFCQUFxQjtXQUN0QztXQUNBO1dBQ0Esa0JBQWtCLHFCQUFxQjtXQUN2QztXQUNBO1dBQ0EsS0FBSztXQUNMO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gXCJ0aHJlZS9leGFtcGxlcy9qc20vY29udHJvbHMvT3JiaXRDb250cm9sc1wiO1xuaW1wb3J0IHsgU2hhZGVyTWF0ZXJpYWwgfSBmcm9tIFwidGhyZWUvc3JjL21hdGVyaWFscy9TaGFkZXJNYXRlcmlhbFwiO1xuaW1wb3J0IHsgVGV4dEdlb21ldHJ5IH0gZnJvbSBcIi4vVGV4dEdlb21ldHJ5LmpzXCI7XG5pbXBvcnQgeyBFZmZlY3RDb21wb3NlciB9IGZyb20gXCJ0aHJlZS9leGFtcGxlcy9qc20vcG9zdHByb2Nlc3NpbmcvRWZmZWN0Q29tcG9zZXJcIjtcbmltcG9ydCB7IFJlbmRlclBhc3MgfSBmcm9tIFwidGhyZWUvZXhhbXBsZXMvanNtL3Bvc3Rwcm9jZXNzaW5nL1JlbmRlclBhc3NcIjtcbmltcG9ydCB7IFVucmVhbEJsb29tUGFzcyB9IGZyb20gXCJ0aHJlZS9leGFtcGxlcy9qc20vcG9zdHByb2Nlc3NpbmcvVW5yZWFsQmxvb21QYXNzXCI7XG5cblxuY2xhc3MgVGhyZWVKU0NvbnRhaW5lciB7XG4gICAgcHJpdmF0ZSBzY2VuZTogVEhSRUUuU2NlbmU7XG4gICAgcHJpdmF0ZSBsaWdodDogVEhSRUUuTGlnaHQ7XG4gICAgcHJpdmF0ZSBob3VySGFuZDogVEhSRUUuTWVzaDtcbiAgICBwcml2YXRlIG1pbnV0ZUhhbmQ6IFRIUkVFLk1lc2g7XG4gICAgcHJpdmF0ZSBzZWNvbmRIYW5kOiBUSFJFRS5NZXNoO1xuICAgIHByaXZhdGUgcmVuZGVyZXI6IFRIUkVFLldlYkdMUmVuZGVyZXI7IC8vIOODrOODs+ODgOODqeODvOOCkuODl+ODreODkeODhuOCo+OBq+i/veWKoFxuICAgIHByaXZhdGUgY2FtZXJhOiBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYTsgLy8g44Kr44Oh44Op44KS44OX44Ot44OR44OG44Kj44Gr6L+95YqgXG5cbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICAvLyDnlLvpnaLpg6jliIbjga7kvZzmiJAo6KGo56S644GZ44KL5p6g44GU44Go44GrKVxuICAgIHB1YmxpYyBjcmVhdGVSZW5kZXJlckRPTSA9IChjYW1lcmFQb3M6IFRIUkVFLlZlY3RvcjMpID0+IHtcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKCk7IC8vIOODrOODs+ODgOODqeODvOOCkuODl+ODreODkeODhuOCo+OBq+ioreWumlxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7IC8vIOWIneacn+OCteOCpOOCuuOCkuOCpuOCo+ODs+ODieOCpuOCteOCpOOCuuOBq+ioreWumlxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldENsZWFyQ29sb3IobmV3IFRIUkVFLkNvbG9yKDB4NDk1ZWQpKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHRydWU7IC8vIOOCt+ODo+ODieOCpuODnuODg+ODl+OCkuacieWKueOBq+OBmeOCi1xuXG4gICAgICAgIC8vIOOCq+ODoeODqeOBruioreWumlxuICAgICAgICB0aGlzLmNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg3NSwgd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsIDAuMSwgMTAwMCk7XG4gICAgICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLmNvcHkoY2FtZXJhUG9zKTtcbiAgICAgICAgdGhpcy5jYW1lcmEubG9va0F0KG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApKTtcblxuICAgICAgICBsZXQgb3JiaXRDb250cm9scyA9IG5ldyBPcmJpdENvbnRyb2xzKHRoaXMuY2FtZXJhLCB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuICAgICAgICB0aGlzLmNyZWF0ZVNjZW5lKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlQ2xvY2soKTtcblxuICAgICAgICAvLyDmr47jg5Xjg6zjg7zjg6Djga51cGRhdGXjgpLlkbzjgpPjgafvvIxyZW5kZXJcbiAgICAgICAgLy8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lIOOBq+OCiOOCiuasoeODleODrOODvOODoOOCkuWRvOOBtlxuICAgICAgICBsZXQgcmVuZGVyOiBGcmFtZVJlcXVlc3RDYWxsYmFjayA9ICh0aW1lKSA9PiB7XG4gICAgICAgICAgICBvcmJpdENvbnRyb2xzLnVwZGF0ZSgpO1xuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNsb2NrKCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSk7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcblxuICAgICAgICAvLyDjgqbjgqPjg7Pjg4njgqbjga7jg6rjgrXjgqTjgrrjgqTjg5njg7Pjg4jjgpLlh6bnkIZcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMub25XaW5kb3dSZXNpemUpO1xuXG4gICAgICAgIHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudC5zdHlsZS5jc3NGbG9hdCA9IFwibGVmdFwiO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQuc3R5bGUubWFyZ2luID0gXCIxMHB4XCI7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLy8g44Km44Kj44Oz44OJ44Km44Gu44Oq44K144Kk44K644Kk44OZ44Oz44OI44OP44Oz44OJ44OpXG4gICAgcHJpdmF0ZSBvbldpbmRvd1Jlc2l6ZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5jYW1lcmEuYXNwZWN0ID0gd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQ7IC8vIOOCq+ODoeODqeOBruOCouOCueODmuOCr+ODiOavlOOCkuabtOaWsFxuICAgICAgICB0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7IC8vIOOCq+ODoeODqeOBruODl+ODreOCuOOCp+OCr+OCt+ODp+ODs+ODnuODiOODquODg+OCr+OCueOCkuabtOaWsFxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7IC8vIOODrOODs+ODgOODqeODvOOBruOCteOCpOOCuuOCkuabtOaWsFxuICAgIH1cblxuICAgIC8vIOOCt+ODvOODs+OBruS9nOaIkCjlhajkvZPjgacx5ZueKVxuICAgIHByaXZhdGUgY3JlYXRlU2NlbmUgPSAoKSA9PiB7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG4gICAgICAgIFxuICAgICAgICAvLyDjgrDjg6rjg4Pjg4nooajnpLpcbiAgICAgICAgY29uc3QgZ3JpZEhlbHBlciA9IG5ldyBUSFJFRS5HcmlkSGVscGVyKCAxMCwpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZCggZ3JpZEhlbHBlciApOyAgXG5cbiAgICAgICAgLy8g6Lu46KGo56S6XG4gICAgICAgIGNvbnN0IGF4ZXNIZWxwZXIgPSBuZXcgVEhSRUUuQXhlc0hlbHBlciggNSApO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZCggYXhlc0hlbHBlciApO1xuICAgICAgICAvLyDjg6njgqTjg4jjga7oqK3lrppcbiAgICAgICAgdGhpcy5saWdodCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZmZmZmKTtcbiAgICAgICAgbGV0IGx2ZWMgPSBuZXcgVEhSRUUuVmVjdG9yMygxLCAxLCAxKS5ub3JtYWxpemUoKTtcbiAgICAgICAgdGhpcy5saWdodC5wb3NpdGlvbi5zZXQobHZlYy54LCBsdmVjLnksIGx2ZWMueik7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMubGlnaHQpO1xuICAgICAgICAvL+eSsOWig+ODnuODg+ODlOODs+OCsOODhuOCueODiFxuICAgICAgICBjb25zdCB1cmxzID0gW1xuICAgICAgICAgICAgXCIwNV9yLnBuZ1wiLFxuICAgICAgICAgICAgXCIwNV9sLnBuZ1wiLFxuICAgICAgICAgICAgXCIwNV91LnBuZ1wiLFxuICAgICAgICAgICAgXCIwNV9kLnBuZ1wiLFxuICAgICAgICAgICAgXCIwNV9mLnBuZ1wiLFxuICAgICAgICAgICAgXCIwNV9iLnBuZ1wiXG4gICAgICAgIF1cbiAgICAgICAgLy8g44OG44Kv44K544OB44Oj44Gu44Ot44O844OJXG4gICAgICAgIGNvbnN0IGN1YmVUZXh0dXJlTG9hZGVyID0gbmV3IFRIUkVFLkN1YmVUZXh0dXJlTG9hZGVyKCk7XG4gICAgICAgIGNvbnN0IHRleHR1cmVNYXBwaW5nID0gY3ViZVRleHR1cmVMb2FkZXIubG9hZCh1cmxzKTtcbiAgICAgICAgdGhpcy5zY2VuZS5iYWNrZ3JvdW5kID0gdGV4dHVyZU1hcHBpbmc7XG4gICAgICAgIC8vIOeSsOWig+ODnuODg+ODlOODs+OCsOOBruatozEw6KeS5b2i44KS6KGo56S6XG4gICAgICAgIGNvbnN0IG1hcHBpbmdHZW9tZXRyeSA9IG5ldyBUSFJFRS5Eb2RlY2FoZWRyb25CdWZmZXJHZW9tZXRyeSgwLjMsMCk7XG4gICAgICAgIGNvbnN0IG1hcHBpbmdNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoUGh5c2ljYWxNYXRlcmlhbCh7XG4gICAgICAgICAgICBlbnZNYXA6IHRleHR1cmVNYXBwaW5nLFxuICAgICAgICAgICAgb3BhY2l0eTogMC41LFxuICAgICAgICAgICAgcm91Z2huZXNzOiAxLFxuICAgICAgICAgICAgcmVmbGVjdGl2aXR5OiAxIFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgbWFwcGluZyA9IG5ldyBUSFJFRS5NZXNoKG1hcHBpbmdHZW9tZXRyeSxtYXBwaW5nTWF0ZXJpYWwpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZChtYXBwaW5nKVxuICAgICAgICBtYXBwaW5nLnBvc2l0aW9uLnggPSAyXG5cblxuICAgICAgICAvLyDjg6Hjg4Pjgrfjg6VcbiAgICAgICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuVG9ydXNHZW9tZXRyeSgyLCAwLjE1LCAyNCwgMTMwKTtcblxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgICAgICBjb2xvcjogMHhmZmZmZmYsXG4gICAgICAgICAgICB0cmFuc21pc3Npb246IDEuNixcbiAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICBtZXRhbG5lc3M6IDAsXG4gICAgICAgICAgICByb3VnaG5lc3M6IDAsXG4gICAgICAgICAgICBpb3I6IDEuNSxcbiAgICAgICAgICAgIHRoaWNrbmVzczogNSxcbiAgICAgICAgICAgIHNwZWN1bGFySW50ZW5zaXR5OiAxLFxuICAgICAgICAgICAgc3BlY3VsYXJDb2xvcjogMHhmZmZmZmYsXG4gICAgICAgICAgICBkaXNwZXJzaW9uOiA1LFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hQaHlzaWNhbE1hdGVyaWFsKHtcbiAgICAgICAgICAgIGNvbG9yOiBwYXJhbXMuY29sb3IsXG4gICAgICAgICAgICB0cmFuc21pc3Npb246IHBhcmFtcy50cmFuc21pc3Npb24sXG4gICAgICAgICAgICBvcGFjaXR5OiBwYXJhbXMub3BhY2l0eSxcbiAgICAgICAgICAgIG1ldGFsbmVzczogcGFyYW1zLm1ldGFsbmVzcyxcbiAgICAgICAgICAgIHJvdWdobmVzczogcGFyYW1zLnJvdWdobmVzcyxcbiAgICAgICAgICAgIGlvcjogcGFyYW1zLmlvcixcbiAgICAgICAgICAgIGVudk1hcEludGVuc2l0eTogMC45LFxuICAgICAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgICAgICBzcGVjdWxhckludGVuc2l0eTogcGFyYW1zLnNwZWN1bGFySW50ZW5zaXR5LFxuICAgICAgICAgICAgc2lkZTogVEhSRUUuRG91YmxlU2lkZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgdG9ydXMgPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgICAgICAvLyB0b3J1cy5yb3RhdGVZKDAuNik7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRvcnVzKTtcblxuICAgICAgICAvLyDpm4blm6PliLblvqHnlKjjga7jgrDjg6vjg7zjg5fjgpLkvZzmiJBcbiAgICAgICAgY29uc3QgZ3JvdXAgPSBuZXcgVEhSRUUuR3JvdXAoKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoZ3JvdXApO1xuXG4gICAgICAgIC8vIC8vIDYw5YCL44Gu5bCP44GV44Gq55CD5L2T44KS5L2c5oiQXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpPCA2MDsgaSsrKXtcbiAgICAgICAgICAgIC8vIOeQg+S9k+S9nOaIkFxuICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFBoeXNpY2FsTWF0ZXJpYWwoe1xuICAgICAgICAgICAgICAgIGNvbG9yOiAweGZmZmZmZixcbiAgICAgICAgICAgICAgICB0cmFuc21pc3Npb246IDEuNixcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgICAgIG1ldGFsbmVzczogMCxcbiAgICAgICAgICAgICAgICByb3VnaG5lc3M6IDAuNCxcbiAgICAgICAgICAgICAgICBpb3I6IDEuNSxcbiAgICAgICAgICAgICAgICAvLyB0aGlja25lc3M6IDUsXG4gICAgICAgICAgICAgICAgc3BlY3VsYXJJbnRlbnNpdHk6IDEsXG4gICAgICAgICAgICAgICAgLy8gc3BlY3VsYXJDb2xvcjogMHhmZmZmZmYsXG4gICAgICAgICAgICAgICAgLy8gZGlzcGVyc2lvbjogNSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoMC4wNSwxNiwxNik7XG4gICAgICAgICAgICBjb25zdCBtZXNoID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksbWF0ZXJpYWwpO1xuXG4gICAgICAgICAgICAvL+mFjee9ruW6p+aomeioiOeul1xuICAgICAgICAgICAgY29uc3QgcmFkaWFuID0gaSAvIDYwICogTWF0aC5QSSAqIDI7XG4gICAgICAgICAgICBtZXNoLnBvc2l0aW9uLnNldChcbiAgICAgICAgICAgICAgICBNYXRoLmNvcyhyYWRpYW4pLFxuICAgICAgICAgICAgICAgIE1hdGguc2luKHJhZGlhbiksXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLy8g44Kw44Or44O844OX44Gr6L+95YqgXG4gICAgICAgICAgICBncm91cC5hZGQobWVzaCk7XG4gICAgICAgIH1cblxuICAgIFxuXG4gICAgICAgIC8vIOavjuODleODrOODvOODoOOBrnVwZGF0ZeOCkuWRvOOCk+OBp++8jOabtOaWsFxuICAgICAgICAvLyByZXFlc3RBbmltYXRpb25GcmFtZSDjgavjgojjgormrKHjg5Xjg6zjg7zjg6DjgpLlkbzjgbZcbiAgICAgICAgbGV0IHVwZGF0ZTogRnJhbWVSZXF1ZXN0Q2FsbGJhY2sgPSAodGltZSkgPT4ge1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG4gICAgICAgICAgICAvLyB0b3J1cy5yb3RhdGlvbi54ICs9IDAuMDE7XG4gICAgICAgICAgICAvLyB0b3J1cy5yb3RhdGlvbi55ICs9IDAuMDI7XG4gICAgICAgICAgICAvLyBncm91cC5yb3RhdGlvbi56ICs9IDAuMDE7XG4gICAgICAgIH1cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG4gICAgfVxuXG4gICAgLy8g5pmC6KiI44Gu5L2c5oiQXG4gICAgcHJpdmF0ZSBjcmVhdGVDbG9jayA9ICgpID0+IHtcbiAgICAgICAgLy8g5pmC6KiI44Gu55uk6Z2i44KS5L2c5oiQXG4gICAgICAgIGxldCBjbG9ja0ZhY2VHZW9tZXRyeSA9IG5ldyBUSFJFRS5DaXJjbGVHZW9tZXRyeSgxLCAxMik7XG4gICAgICAgIGxldCBjbG9ja0ZhY2VNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7XG4gICAgICAgICAgICBjb2xvcjogMHhmZmZmZmYsIFxuICAgICAgICAgICAgcm91Z2huZXNzOiAwLjUsXG4gICAgICAgICAgICBzaWRlOlRIUkVFLkRvdWJsZVNpZGUsXG4gICAgICAgICAgICB3aXJlZnJhbWU6IHRydWUgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgbGV0IGNsb2NrRmFjZSA9IG5ldyBUSFJFRS5NZXNoKGNsb2NrRmFjZUdlb21ldHJ5LCBjbG9ja0ZhY2VNYXRlcmlhbCk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKGNsb2NrRmFjZSk7XG5cbiAgICAgICAgLy8g5pmC6KiI44Gu6Yed44Gu5L2c5oiQZFxuICAgICAgICBsZXQgaGFuZEdlb21ldHJ5ID0gbmV3IFRIUkVFLkJveEdlb21ldHJ5KDAuMDIsIDAuNSwgMC4wMik7XG4gICAgICAgIGhhbmRHZW9tZXRyeS50cmFuc2xhdGUoMCwgMC4yNSwgMCk7IC8vIOWbnui7ouOBruS4reW/g+OCkuenu+WLlVxuXG4gICAgICAgIGxldCBob3VySGFuZE1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgY29sb3I6IDB4MDAwMGZmIH0pO1xuICAgICAgICB0aGlzLmhvdXJIYW5kID0gbmV3IFRIUkVFLk1lc2goaGFuZEdlb21ldHJ5LCBob3VySGFuZE1hdGVyaWFsKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5ob3VySGFuZCk7XG5cbiAgICAgICAgbGV0IG1pbnV0ZUhhbmRNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IGNvbG9yOiAweDAwZmYwMCB9KTtcbiAgICAgICAgdGhpcy5taW51dGVIYW5kID0gbmV3IFRIUkVFLk1lc2goaGFuZEdlb21ldHJ5LCBtaW51dGVIYW5kTWF0ZXJpYWwpO1xuICAgICAgICB0aGlzLm1pbnV0ZUhhbmQuc2NhbGUuc2V0KDEsIDEuNSwgMSk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMubWludXRlSGFuZCk7XG5cbiAgICAgICAgbGV0IHNlY29uZEhhbmRNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IGNvbG9yOiAweGZmMDAwMCB9KTtcbiAgICAgICAgdGhpcy5zZWNvbmRIYW5kID0gbmV3IFRIUkVFLk1lc2goaGFuZEdlb21ldHJ5LCBzZWNvbmRIYW5kTWF0ZXJpYWwpO1xuICAgICAgICB0aGlzLnNlY29uZEhhbmQuc2NhbGUuc2V0KDEsIDIsIDEpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLnNlY29uZEhhbmQpO1xuXG4gICAgICAgIFxuICAgIH1cbiAgICAvLyBUT0RPOuS9jee9ruenkuOBlOOBqOOBq+S9leOBi+OCkuWLleS9nOOBleOBm+OCi+mWouaVsCBEb25lXG4gICAgLy8g44K344O844Oz5L6LOuODjuOCpOOCuuOBruiDjOaZr+OBjOWLleOBjyzjg5Hjg7zjg4bjgqPjgq/jg6vjgYzjgqTjg7zjgrjjg7PjgrDjgafli5XjgYTjgabjgYTjgY9cbiAgICAvLyAxc+avjuOBq+ODkeODvOODhuOCo+OCr+ODq+OBjDEwMOWAi+Wil+OBiOOCi++8n+OBv+OBn+OBhOOBquOChOOBpFxuICAgICAgICAvLyB0d2VlbiDjgafjgYTjgYTmhJ/jgZjjgavjgqTjg7zjgrjjg7PjgrDjgYvjgZHjgablm57ou6LjgZnjgotcbiAgICBcbiAgICAvLyDjgajjgorjgYLjgYjjgZropovjgZ/nm67jgpLjgYvjgaPjgZPjgojjgY/jgZfjgZ/jgYRcblxuICAgIHByaXZhdGUgcHJldmlvdXNTZWNvbmRzOiBudW1iZXIgPSAtMTsgLy8g5YmN5Zue44Gu56eS5pWw44KS5L+d5a2Y44GZ44KL44OX44Ot44OR44OG44KjXG4gICAgLy8g5pmC6KiI44Gu5pu05pawXG4gICAgcHJpdmF0ZSB1cGRhdGVDbG9jayA9ICgpID0+IHtcbiAgICAgICAgbGV0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGxldCBzZWNvbmRzID0gbm93LmdldFNlY29uZHMoKTsgLy8g54++5Zyo44Gu56eS5pWwXG4gICAgICAgIGxldCBtaW51dGVzID0gbm93LmdldE1pbnV0ZXMoKTtcbiAgICAgICAgbGV0IGhvdXJzID0gbm93LmdldEhvdXJzKCkgJSAxMjtcblxuICAgICAgICAvLyDnp5LmlbDjgYw144Gu5YCN5pWw44GL44Gk5YmN5Zue44Gu56eS5pWw44Go55Ww44Gq44KL5aC05ZCI44Gr44Oh44OD44K744O844K444KS6KGo56S6XG4gICAgICAgIGlmIChzZWNvbmRzICUgNSA9PT0gMCAmJiBzZWNvbmRzICE9PSB0aGlzLnByZXZpb3VzU2Vjb25kcykge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLnp5LmlbDjgYw144Gu5YCN5pWw44Gr44Gq44KK44G+44GX44GfOlwiLCBzZWNvbmRzKTtcbiAgICAgICAgICAgIC8vIHRoaXMudGVzdGZ1bmMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOaZguioiOOBrumHneOBruWbnui7ouOCkuabtOaWsFxuICAgICAgICB0aGlzLnNlY29uZEhhbmQucm90YXRpb24ueiA9IC1zZWNvbmRzICogKE1hdGguUEkgLyAzMCk7IC8vIDHnp5Ljgas2wrDlm57ou6IgKFBJLzMwKVxuICAgICAgICB0aGlzLm1pbnV0ZUhhbmQucm90YXRpb24ueiA9IC1taW51dGVzICogKE1hdGguUEkgLyAzMCkgLSBzZWNvbmRzICogKE1hdGguUEkgLyAxODAwKTtcbiAgICAgICAgLy8g44KP44Ga44GL44Gr5YuV44GP5YiG44KS6KOc5q2j44GZ44KLXG4gICAgICAgIHRoaXMuaG91ckhhbmQucm90YXRpb24ueiA9IC1ob3VycyAqIChNYXRoLlBJIC8gNikgLSBtaW51dGVzICogKE1hdGguUEkgLyAzNjApO1xuXG4gICAgICAgIC8vIOWJjeWbnuOBruenkuaVsOOCkuabtOaWsFxuICAgICAgICB0aGlzLnByZXZpb3VzU2Vjb25kcyA9IHNlY29uZHM7XG5cbiAgICAgICAgLy8gLy8g5pmC6KiI44Gu56eS5pWw44Gr5b+c44GY44Gm5L2c5oiQ44GV44KM44KL5YaG44Gu5o+P55S7XG4gICAgICAgIC8vIGNvbnN0IHRpbWVUb3J1c0dlbyA9IG5ldyBUSFJFRS5Ub3J1c0J1ZmZlckdlb21ldHJ5KDEsMC4yLDEyLDEwMCxNYXRoLlBJKTtcbiAgICAgICAgLy8gY29uc3QgdGltZVRvcnVzTWF0ID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKCk7XG4gICAgICAgIC8vIGNvbnN0IHRpbWVUb3J1cyA9IG5ldyBUSFJFRS5NZXNoKHRpbWVUb3J1c0dlbyx0aW1lVG9ydXNNYXQpO1xuICAgICAgICAvLyB0aGlzLnNjZW5lLmFkZCh0aW1lVG9ydXMpXG4gICAgICAgIC8vIOavjuenkuOCuOOCquODoeODiOODquOCkuS9nOaIkOOBmeOCi+OBruOBr+iyoOiNt+OBjOOBi+OBi+OCi1xuICAgIH1cblxuICAgIHByaXZhdGUgdGVzdGZ1bmMgPSAoKSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5YuV44GP44GeIVwiKVxuICAgIH1cbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGluaXQpO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICAgIGxldCBjb250YWluZXIgPSBuZXcgVGhyZWVKU0NvbnRhaW5lcigpO1xuXG4gICAgbGV0IHZpZXdwb3J0ID0gY29udGFpbmVyLmNyZWF0ZVJlbmRlcmVyRE9NKG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDMpKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHZpZXdwb3J0KTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rY2dwcmVuZGVyaW5nXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2NncHJlbmRlcmluZ1wiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX2NvbnRyb2xzX09yYml0Q29udHJvbHNfanNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvYXBwLnRzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=