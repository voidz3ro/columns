import { Component, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Input() colCount = 4;
  wordsArrSorted = [];
  strVal = '';
  columns = [];

  constructor() { }

  arrangeWords(items: Array<any>, numCols: number) {
    this.columns = [];

    const minPerRow = Math.floor(items.length / numCols);
    const colCount = [];
    const remaining = items.length % numCols;
    const maxPerRow = Math.ceil(items.length / numCols);

    for (let i = 0; i < numCols; i++) {
      if (i < remaining && items[0] !== '') {
        colCount.push(minPerRow + 1);
      } else {
        if (minPerRow === 0 && items.length > 0 && items[0] !== '') {
          colCount.push(1);
        } else {
          colCount.push(minPerRow);
        }
      }
    }

    let count = 0;
    for (let i = 0; i < colCount.length; i++) {
      // create a new column
      const column = {
        cells: []
      };

      for (let j = 0; j < colCount[i]; j++) {
        // add cells for this collection
        const cell = {
          word: items[count]
        };
        column.cells.push(cell);
        count = count + 1;
      }
      this.columns.push(column);
    }
    // add dummies
    this.columns.forEach(col => {
      if (col.cells.length < maxPerRow) {
        col.cells.push({ word: ' ' });
      }
    });
  }

  setWords() {
    const _words = this.strVal.toLowerCase();
    this.wordsArrSorted = _words.trim().split(/[ ,]+/).sort();
    if (this.wordsArrSorted === ['']) {
      this.wordsArrSorted = [];
    }
    this.arrangeWords(this.wordsArrSorted, this.colCount);
  }

  removeWord(cell: any, columnIndex: number, cellIndex: number) {
    if (cell.word) {
      this.strVal = this.strVal.toLowerCase().replace(cell.word.toLowerCase(), '').trim();
    }
    this.columns[columnIndex].cells.splice(cellIndex, 1);

    if (this.strVal.trim() === '') {
      this.columns = null;
    } else {
      this.setWords();
    }
  }

}
