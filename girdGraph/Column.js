class Column {
  constructor(left, width, height, board, id) {
    this.left   = left
    this.width  = width
    this.height = height
    this.board  = board
    this.range  = [this.x, this.x + this.width]
    this.cells  = {}
    this.id     = id
  }

  addCell(left, top, size, column) {
    this.cells.push(new Cell(left, top, size, this))
  }

  makeColumn() {
    for (let i = 0; i < this.height + (this.width + 1); i += this.width) {
      this.cells[i] = new Cell(this.left, i, this.width, this, i, this.cells, {left: this.board.columns[this.id-this.width], right:this.board.columns[this.id+this.width]})
    }
  }


}
