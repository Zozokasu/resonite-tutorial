// (function () {
//     var h2 = document.querySelectorAll('h2')
//     var newList = document.createElement('ul');
//     newList.setAttribute('class', 'innerLink');
//     for (var i = 0, l = h2.length; i < l; i += 1) {
//         var a = h2[i].firstElementChild;
//         var label = a.innerText;
//         var href = a.getAttribute('href');
//         var newAnchor = document.createElement('a');
//         newAnchor.setAttribute('href', href);
//         newAnchor.innerHTML = label;
//         var newItem = document.createElement('li');
//         newItem.className = 'chapter-item expanded';
//         newItem.appendChild(newAnchor);
//         newList.appendChild(newItem);
//     }
//     let active = document.querySelector('.sidebar .active');
//     let currentPath = window.location.pathname;
//     let activePath = Array.from(document.querySelector('.sidebar')).filter((a =>{
//         try {
//             return new URL(a.href).pathname === currentPath;
//         } catch (e) {
//             return false;
//         }
//     }))
//     console.log(activePath);
//     if (active) {
//         active.appendChild(newList);
//     }
// })();

(function () {
    //マウスストーカー用のdivタグを作成
    const stalker = document.createElement('div');  //divタグを作成
    stalker.id = 'stalker';                         //IDを付与
    document.body.appendChild(stalker);//bodyの最後に挿入

})();


const canvas = document.createElement('canvas');
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100vw';
canvas.style.height = '100vh';
canvas.style.zIndex = '999';
canvas.style.backgroundColor = 'transparent';
canvas.style.pointerEvents = 'none';
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const vertexShaderSource = `
    attribute vec2 a_position;
    attribute float a_pointSize;
    attribute vec4 a_color;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform float u_time;
    varying vec4 v_color;

    void main() {
        // パーティクルの位置をスクリーン座標からWebGL座標に変換
        vec2 zeroToOne = a_position / u_resolution;
        vec2 zeroToTwo = zeroToOne * 2.0;
        vec2 clipSpace = zeroToTwo - 1.0;

        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
        gl_PointSize = a_pointSize;

        // // パーティクルの色をマウスとの距離に応じて変化
        // float dist = distance(a_position, u_mouse);
        
        // パーティクルの色をランダムに設定
        
        
        //v_color = vec4(1.0 - dist / u_resolution.x, 0.5, dist / u_resolution.x, 1.0);
        v_color = a_color;
    }
`;

const fragmentShaderSource = `
    precision mediump float;
    varying vec4 v_color;

    void main() {
        // 円形のパーティクル
        float dist = distance(gl_PointCoord, vec2(0.5, 0.5));
        if (dist > 0.5) {
            discard;
        }
        gl_FragColor = v_color;
    }
`;

// シェーダーをコンパイルする関数
function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }
    //console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

// プログラムをリンクする関数
function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }
    //console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

const gl = canvas.getContext('webgl',{alpha: true});

if (!gl) {
    alert('WebGL がサポートされていません。');
}

// シェーダーのコンパイルとプログラムの作成
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
const program = createProgram(gl, vertexShader, fragmentShader);

// ブレンドを有効にし、ブレンド関数を設定
gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

// パーティクルの数
const numParticles = 30;

// パーティクルの初期位置とサイズをランダムに生成
const positions = new Float32Array(numParticles * 2);
const sizes = new Float32Array(numParticles);
const colors = new Float32Array(numParticles * 4);
const angles = new Float32Array(numParticles);
const radius = new Float32Array(numParticles);
const center = new Float32Array(numParticles * 2);
const centerWeight = new Float32Array(numParticles);
for (let i = 0; i < numParticles; i++) {
    positions[2 * i] = Math.random() * window.innerWidth;
    positions[2 * i + 1] = Math.random() * window.innerHeight;
    center[2 * i] = window.innerWidth / 2;
    center[2 * i + 1] = window.innerHeight / 2;
    centerWeight[i] = Math.random() * 0.5 + 0.5;
    sizes[i] = Math.random() * 1.5 + 3.5;
    angles[i] = Math.random() * Math.PI * 2;
    radius[i] = Math.random() * 100 + 25;
}

// バッファの作成
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);

const sizeBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);

const colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

// 属性ロケーションの取得
const positionLocation = gl.getAttribLocation(program, 'a_position');
const pointSizeLocation = gl.getAttribLocation(program, 'a_pointSize');
const pointColorLocation = gl.getAttribLocation(program, 'a_color');

// ユニフォームロケーションの取得
const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
const mouseLocation = gl.getUniformLocation(program, 'u_mouse');
const timeLocation = gl.getUniformLocation(program, 'u_time');

// マウスポジションの初期化
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

// マウス移動イベントのリスナー
window.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

// ウィンドウリサイズ時の処理
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    //console.log(window.innerWidth.toString() + " " + window.innerHeight.toString());
}
resizeCanvas();

// プログラムの使用開始
gl.useProgram(program);

// 属性の有効化とバッファのバインド
gl.enableVertexAttribArray(positionLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

gl.enableVertexAttribArray(pointSizeLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
gl.vertexAttribPointer(pointSizeLocation, 1, gl.FLOAT, false, 0, 0);

gl.enableVertexAttribArray(pointColorLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.vertexAttribPointer(pointColorLocation, 4, gl.FLOAT, false, 0, 0);
// ユニフォームの設定
gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

// アニメーションループ
let then = 0;

function render(now) {
    now *= 0.001; // 秒単位に変換
    const deltaTime = now - then;
    then = now;

    // パーティクルの位置を更新
    for (let i = 0; i < numParticles; i++) {
        // 現在の位置
        let x = positions[2 * i];
        let y = positions[2 * i + 1];

        // マウスへのベクトル
        let dx = (mouseX - center[2 * i])
        let dy = (mouseY - center[2 * i + 1])

        // 距離と速度の計算
        //let dist = Math.sqrt(dx * dx + dy * dy);
        //let speed = 100 / (dist + 1000); // 距離に応じた速度調整

        // 位置の更新

        // 軸を引き寄せる
        center[2 * i] += dx * 0.05 * centerWeight[i];
        center[2 * i + 1] += dy * 0.05 * centerWeight[i];

        // カーソルの周りを円運動させる
        let angularSpeeds = 100 / radius[i]
        angles[i] += angularSpeeds * deltaTime;
        x = center[2 * i] + Math.cos(angles[i]) * radius[i];
        y = center[2 * i + 1] + Math.sin(angles[i]) * radius[i];



        // let sqrMag = (dx * dx + dy * dy);
        // x += ((dx - dy) * 0.5 - dx * sqrMag) * deltaTime * 500;
        // y += ((dx + dy) * 0.5 - dy * sqrMag) * deltaTime * 500;


        // 画面外に出た場合は再配置
        // if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) {
        //     x = Math.random() * canvas.width;
        //     y = Math.random() * canvas.height;
        // }

        positions[2 * i] = x;
        positions[2 * i + 1] = y;
    }

    // 位置バッファの更新
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, positions);

    // ユニフォームの更新
    gl.uniform2f(mouseLocation, mouseX, mouseY);
    gl.uniform1f(timeLocation, now);

    // クリアと描画
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, numParticles);

    requestAnimationFrame(render);
}

// 色の初期化
// 5色の間でランダムに色を選択
const color0 = [0.19, 0.92, 0.20] // green
const color1 = [0.38, 0.82, 0.98] // blue
const color2 = [0.67, 0.25, 0.95] // purple
const color3 = [1.00, 0.31, 0.31] // red
const color4 = [0.97, 0.97, 0.22] // yellow
const colorList = [color0, color1, color2, color3, color4]
for (let i = 0; i < numParticles * 4; i += 4) {
    let colorindex = Math.floor(Math.random() * 5)
    let color = colorList[colorindex]
    colors[i] = color[0];
    colors[i + 1] = color[1];
    colors[i + 2] = color[2];
    colors[i + 3] = 1.0;
}
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

window.addEventListener('resize', resizeCanvas);
requestAnimationFrame(render);