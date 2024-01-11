/**
 * Клеточный автомат
 * Студенты:
 * - Максим Покидько
 * - Усейной Даниэль
 * - Ярослав Епишенко
 * 10 января 2024 г.
 */

var canvas = document.getElementById('canvas'), ctx = canvas.getContext("2d"),
   btnPromo = document.getElementById('promo'),
   btnPlay = document.getElementById('play'), 
   btnClear = document.getElementById('clear'), 
   btnRand = document.getElementById('rand'),
   game = false, focus = false, speed = 120, size = 16, rnd = 0.61803, center = size/2, arch = 2*Math.PI, radius = center*0.95,
   //colBG = 'PapayaWhip', colLine = 'LightBlue', colCell = 'Black',
   colBG = 'White', colLine = 'Grey', colCell = 'Black',
   width, height, row, col;

// Текст заставки
text = [
   [1, 56],   [1, 57],  [1, 58],  [2, 50],  [2, 51],  [2, 52],  [2, 56],  [2, 57],  [2, 58],  [2, 62],
   [2, 63],   [2, 64],  [3, 50],  [3, 51],  [3, 52],  [3, 53],  [3, 54],  [3, 55],  [3, 56],  [3, 57],
   [3, 58],   [3, 59],  [3, 60],  [3, 61],  [3, 62],  [3, 63],  [3, 64],  [4, 45],  [4, 46],  [4, 47],
   [4, 49],   [4, 50],  [4, 51],  [4, 52],  [4, 53],  [4, 54],  [4, 55],  [4, 56],  [4, 57],  [4, 58],
   [4, 59],   [4, 60],  [4, 61],  [4, 62],  [4, 63],  [4, 64],  [4, 65],  [4, 68],  [4, 69],  [5, 45],
   [5, 46],   [5, 47],  [5, 48],  [5, 49],  [5, 50],  [5, 51],  [5, 52],  [5, 63],  [5, 64],  [5, 65],
   [5, 66],   [5, 67],  [5, 68],  [5, 69],  [6, 45],  [6, 46],  [6, 47],  [6, 48],  [6, 49],  [6, 65],
   [6, 66],   [6, 67],  [6, 68],  [6, 69],  [7, 41],  [7, 42],  [7, 44],  [7, 45],  [7, 46],  [7, 47],
   [7, 67],   [7, 68],  [7, 69],  [7, 70],  [7, 72],  [7, 73],  [8, 40],  [8, 41],  [8, 42],  [8, 43],
   [8, 44],   [8, 45],  [8, 69],  [8, 70],  [8, 71],  [8, 72],  [8, 73],  [8, 74],  [9, 40],  [9, 41],
   [9, 42],   [9, 43],  [9, 44],  [9, 70],  [9, 71],  [9, 72],  [9, 73],  [9, 74], [10, 41], [10, 42],
   [10, 43], [10, 71], [10, 72], [10, 73], [11, 40], [11, 41], [11, 42], [11, 52], [11, 53], [11, 54],
   [11, 72], [11, 73], [11, 74], [12, 37], [12, 38], [12, 39], [12, 40], [12, 41], [12, 51], [12, 55],
   [12, 56], [12, 61], [12, 62], [12, 63], [12, 64], [12, 65], [12, 73], [12, 74], [12, 75], [12, 76],
   [12, 77], [13, 37], [13, 38], [13, 39], [13, 40], [13, 50], [13, 57], [13, 59], [13, 60], [13, 66],
   [13, 74], [13, 75], [13, 76], [13, 77], [14, 37], [14, 38], [14, 39], [14, 40], [14, 49], [14, 50],
   [14, 58], [14, 59], [14, 66], [14, 67], [14, 74], [14, 75], [14, 76], [14, 77], [15, 38], [15, 39],
   [15, 49], [15, 50], [15, 57], [15, 59], [15, 66], [15, 67], [15, 68], [15, 75], [15, 76], [16, 37],
   [16, 38], [16, 39], [16, 50], [16, 56], [16, 60], [16, 65], [16, 66], [16, 67], [16, 68], [16, 69],
   [16, 75], [16, 76], [16, 77], [17, 35], [17, 36], [17, 37], [17, 38], [17, 47], [17, 48], [17, 49],
   [17, 50], [17, 51], [17, 52], [17, 53], [17, 54], [17, 55], [17, 60], [17, 66], [17, 67], [17, 68],
   [17, 76], [17, 77], [17, 79], [18, 35], [18, 36], [18, 37], [18, 38], [18, 46], [18, 50], [18, 54],
   [18, 55], [18, 56], [18, 57], [18, 58], [18, 59], [18, 61], [18, 66], [18, 67], [18, 76], [18, 77],
   [18, 78], [18, 79], [19, 35], [19, 36], [19, 37], [19, 38], [19, 45], [19, 50], [19, 54], [19, 60],
   [19, 61], [19, 62], [19, 66], [19, 77], [19, 78], [19, 79], [20, 36], [20, 37], [20, 44], [20, 50],
   [20, 53], [20, 62], [20, 63], [20, 64], [20, 66], [20, 77], [20, 78], [21, 36], [21, 37], [21, 44],
   [21, 50], [21, 52], [21, 56], [21, 57], [21, 58], [21, 62], [21, 65], [21, 66], [21, 77], [21, 78],
   [22, 36], [22, 37], [22, 44], [22, 45], [22, 51], [22, 55], [22, 56], [22, 57], [22, 58], [22, 59],
   [22, 63], [22, 65], [22, 67], [22, 68], [22, 77], [22, 78], [23, 34], [23, 35], [23, 36], [23, 37],
   [23, 44], [23, 45], [23, 46], [23, 51], [23, 54], [23, 55], [23, 56], [23, 57], [23, 58], [23, 59],
   [23, 60], [23, 64], [23, 69], [23, 77], [23, 78], [23, 79], [23, 80], [24, 34], [24, 35], [24, 36],
   [24, 37], [24, 43], [24, 44], [24, 45], [24, 46], [24, 47], [24, 50], [24, 51], [24, 54], [24, 55],
   [24, 56], [24, 57], [24, 58], [24, 59], [24, 60], [24, 64], [24, 70], [24, 77], [24, 78], [24, 79],
   [24, 80], [25, 34], [25, 35], [25, 36], [25, 37], [25, 44], [25, 45], [25, 46], [25, 50], [25, 51],
   [25, 54], [25, 55], [25, 56], [25, 57], [25, 58], [25, 59], [25, 60], [25, 64], [25, 71], [25, 77],
   [25, 78], [25, 79], [25, 80], [26, 36], [26, 37], [26, 45], [26, 47], [26, 48], [26, 49], [26, 52],
   [26, 55], [26, 56], [26, 57], [26, 58], [26, 59], [26, 63], [26, 64], [26, 70], [26, 71], [26, 77],
   [26, 78], [27, 36], [27, 37], [27, 49], [27, 50], [27, 52], [27, 53], [27, 56], [27, 57], [27, 58],
   [27, 62], [27, 64], [27, 70], [27, 71], [27, 77], [27, 78], [28, 36], [28, 37], [28, 49], [28, 51],
   [28, 52], [28, 53], [28, 61], [28, 65], [28, 70], [28, 77], [28, 78], [29, 35], [29, 36], [29, 37],
   [29, 38], [29, 48], [29, 53], [29, 54], [29, 55], [29, 60], [29, 65], [29, 69], [29, 70], [29, 77],
   [29, 78], [29, 79], [30, 35], [30, 36], [30, 37], [30, 38], [30, 48], [30, 53], [30, 56], [30, 57],
   [30, 58], [30, 59], [30, 60], [30, 61], [30, 62], [30, 64], [30, 65], [30, 66], [30, 67], [30, 68],
   [30, 76], [30, 77], [30, 78], [30, 79], [31, 35], [31, 36], [31, 37], [31, 38], [31, 48], [31, 54],
   [31, 59], [31, 63], [31, 65], [31, 76], [31, 77], [31, 78], [31, 79], [32, 37], [32, 38], [32, 39],
   [32, 48], [32, 55], [32, 58], [32, 64], [32, 65], [32, 66], [32, 76], [32, 77], [33, 38], [33, 39],
   [33, 48], [33, 49], [33, 55], [33, 57], [33, 63], [33, 64], [33, 65], [33, 66], [33, 67], [33, 75],
   [33, 76], [34, 37], [34, 38], [34, 39], [34, 48], [34, 49], [34, 56], [34, 64], [34, 65], [34, 66],
   [34, 75], [34, 76], [34, 77], [35, 37], [35, 38], [35, 39], [35, 40], [35, 48], [35, 54], [35, 55],
   [35, 57], [35, 64], [35, 65], [35, 74], [35, 75], [35, 76], [35, 77], [36, 37], [36, 38], [36, 39],
   [36, 40], [36, 41], [36, 49], [36, 50], [36, 51], [36, 52], [36, 53], [36, 58], [36, 64], [36, 73],
   [36, 74], [36, 75], [36, 76], [36, 77], [37, 40], [37, 41], [37, 42], [37, 59], [37, 60], [37, 61],
   [37, 62], [37, 63], [37, 72], [37, 73], [37, 74], [38, 41], [38, 42], [38, 43], [38, 71], [38, 72],
   [38, 73], [39, 41], [39, 42], [39, 43], [39, 44], [39, 70], [39, 71], [39, 72], [39, 73], [39, 74],
   [40, 40], [40, 41], [40, 42], [40, 43], [40, 44], [40, 45], [40, 69], [40, 70], [40, 71], [40, 72],
   [40, 73], [40, 74], [41, 41], [41, 42], [41, 44], [41, 45], [41, 46], [41, 47], [41, 68], [41, 69],
   [41, 70], [41, 72], [41, 73], [42, 45], [42, 46], [42, 47], [42, 48], [42, 49], [42, 66], [42, 67],
   [42, 68], [42, 69], [43, 45], [43, 46], [43, 47], [43, 48], [43, 49], [43, 50], [43, 51], [43, 63],
   [43, 64], [43, 65], [43, 66], [43, 67], [43, 68], [43, 69], [44, 45], [44, 46], [44, 47], [44, 50],
   [44, 51], [44, 52], [44, 53], [44, 54], [44, 55], [44, 56], [44, 57], [44, 58], [44, 59], [44, 60],
   [44, 61], [44, 62], [44, 63], [44, 64], [44, 65], [44, 67], [44, 68], [44, 69], [45, 50], [45, 51],
   [45, 52], [45, 53], [45, 54], [45, 55], [45, 56], [45, 57], [45, 58], [45, 59], [45, 60], [45, 61],
   [45, 62], [45, 63], [45, 64], [46, 50], [46, 51], [46, 52], [46, 56], [46, 57], [46, 58], [46, 62],
   [46, 63], [46, 64], [47, 56], [47, 57], [47, 58], [47, 62]
]

//Выравнивание canvas по размерам экрана
window.addEventListener('resize', onResize);
onResize();
function onResize() {
   width  = window.innerWidth;
   height = window.innerHeight;
   canvas.width  = width;
   canvas.height = height;
   row = Math.ceil(height / size);
   col = Math.ceil(width / size);
}

//Кнопка промо
btnPromo.onclick = () => {
   for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
         if (arr[i][j] == true) {
            console.log(i, j);
            text.push([i, j])
         }
      }
   }
   console.log(text);
   focus = true;
   game = false;
   btnName();
   arr = arrNew(2);
}

//Кнопка старт/пауза
btnPlay.onclick = () => {
   focus = true;
   game = !game;
   btnName();
}

//Кнопка очистка
btnClear.onclick = () => {
   focus = true;
   game = false;
   btnName();
   arr = arrNew(0);
}

//Кнопка рандом
btnRand.onclick = () => {
   focus = true;
   btnName();
   arr = arrNew(1);
}

//Функция старт/пауза
function btnName() {
   if (game)
      btnPlay.innerHTML = 'pause';
   else
      btnPlay.innerHTML = 'start';
}

//Аннимационный цикл
setInterval(() => {
   ctx.fillStyle = colBG;
   ctx.fillRect(0, 0, width, height);
   drawLines();
   if (game)
      updateCell();
   drawCell();
}, speed)

// Заполнение / очистка массива клеток
arr = arrNew(); // по умолчанию
function arrNew(param=0) {
   let arr = [];
   for (let i = 0; i < row; i++) {
      arr[i] = [];
      for (let j = 0; j < col; j++)
      if (param == 0) {
         arr[i][j] = false;
      } else if (param == 1) {
         arr[i][j] = Math.random() >= rnd;
      } else if (param == 2) {
         arr[i][j] = false;
      } else {
         arr[i][j] = false;
      }        
   }
   if (param == 2) {
      text.forEach(i => {
         arr[i[0]][i[1]] = true;
      });
   }
   return arr;
}

// Отслеживаем клики мышкой
onclick = (e) => {
   if (!focus) {
      let x = Math.floor(e.clientX / size);
      let y = Math.floor(e.clientY / size);
      arr[y][x] = !arr[y][x];
   }
   focus = false;
}

//Отрисовка сетки
function drawLines() {
   ctx.lineWidth = 0.5;
   ctx.strokeStyle=colLine;
   //Горизонтальные линии
   ctx.beginPath();
   for (let i = 0; i < height; i+=size) {
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
   }
   ctx.stroke();
   ctx.closePath();
   //Вертикальные линии
   ctx.beginPath();
   for (let i = 0; i < width; i+=size) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
   }
   ctx.stroke();
   ctx.closePath();
}

//Отрисовка клеток
function drawCell() {
   ctx.fillStyle = colCell;
   for (let i = 0; i < row; i++)
      for (let j = 0; j < col; j++)
         if (arr[i][j]) {
            ctx.beginPath();
            ctx.arc(j*size+center, i*size+center, radius, 0, arch);
            ctx.fill();
            ctx.closePath();
         }
}

//Перерасчет клеток
function updateCell() {
   buffer = arrCopy(arr);
   let empty = false;
   //Перерасчет середины
   for (let i = 1; i < row-1; i++) {
      for (let j = 1; j < col-1; j++) {
         buffer[i][j] = nearCell(i, j);
         if (!empty)
            empty = buffer[i][j];
      }
   }
   //Перерасчет крайних рядов, левый, правый, верхний, нижний
   for (let i = 0; i < row; i++)
      buffer[i][0] = nearCellBorder(i, 0);
   for (let i = 0; i < row; i++)
      buffer[i][col-1] = nearCellBorder(i, col-1);
   for (let j = 1; j < col-1; j++)
      buffer[0][j] = nearCellBorder(0, j);
   for (let j = 1; j < col-1; j++)
      buffer[row-1][j] = nearCellBorder(row-1, j);
   //Проверка на отсутствие клеток
   arr = arrCopy(buffer);
   if (!empty) {
      game = false;
      btnName();
   }
}

//Копирование клеток
function arrCopy(arr) {
   let buffer = [];
   for (let i = 0; i < row; i++) {
      buffer[i] = [];
      for (let j = 0; j < col; j++)
         buffer[i][j] = arr[i][j];
   }
   return buffer;
}

//Проверка окружения
function nearCell(i, j) {
   let near = 0;
   for (let iNear = i-1; iNear < i+2; iNear++) {
      for (let jNear = j-1; jNear < j+2; jNear++)
         near+=arr[iNear][jNear];
   }
   if (arr[i][j] && near)
      near-=1;
   life = getLife(i, j, near);
   return life;
}

//Проверка окружения по краям
function nearCellBorder(i, j) {
   let near = 0;
   for (let iNear = i-1; iNear < i+2; iNear++) {
      for (let jNear = j-1; jNear < j+2; jNear++) {
         iBorder = iNear;
         jBorder = jNear;
         if (iNear < 0)
            iBorder = row-1;
         else if (iNear > row-1)
            iBorder = 0;
         if (jNear < 0)
            jBorder = col-1;
         else if (jNear > col-1)
            jBorder = 0;
         near+=arr[iBorder][jBorder];
      }
   }
   if (arr[i][j] && near)
      near-=1;
   life = getLife(i, j, near);
   return life;
}

//Логика жизни
function getLife(i, j, near) {
   let life = false;
   if (arr[i][j] && near >= 2 && near <= 3 || !arr[i][j] && near == 3)
      life = true;
   return life;
}
