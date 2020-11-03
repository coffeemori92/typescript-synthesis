"use strict";
var table = document.createElement('table');
var rows = [];
var cells = [];
var turn = 'X';
var result = document.createElement('div');
for (var i = 1; i <= 3; i++) {
    var row = document.createElement('tr');
    rows.push(row);
    cells.push([]);
    for (var j = 1; j <= 3; j++) {
        var cell = document.createElement('td');
        cell.addEventListener('click', function (e) {
            var rowIndex = rows.indexOf(e.currentTarget.parentNode);
            var cellIndex = cells[rowIndex].indexOf(e.currentTarget);
            if (cells[rowIndex][cellIndex].textContent !== '') {
                console.log('빈 칸이 아닙니다.');
            }
            else {
                cells[rowIndex][cellIndex].textContent = turn;
                turn = turn === 'O' ? 'X' : 'O';
                var full = false;
                if (cells[rowIndex][0].textContent === turn &&
                    cells[rowIndex][1].textContent === turn &&
                    cells[rowIndex][2].textContent === turn) {
                    full = true;
                }
                if (cells[0][cellIndex].textContent === turn &&
                    cells[1][cellIndex].textContent === turn &&
                    cells[2][cellIndex].textContent === turn) {
                    full = true;
                }
                if (cells[0][2].textContent === turn &&
                    cells[1][1].textContent === turn &&
                    cells[2][0].textContent === turn) {
                    full = true;
                }
                if (full) {
                    result.textContent = turn + "\uB2D8\uC774 \uC2B9\uB9AC!";
                    turn = 'X';
                    cells.forEach(function (row) {
                        row.forEach(function (cell) {
                            cell.textContent = '';
                        });
                    });
                }
                else {
                    turn = turn === 'O' ? 'X' : 'O';
                }
            }
        });
        cells[i - 1].push(cell);
        row.append(cell);
    }
    table.append(row);
}
document.body.append(table);
document.body.append(result);
