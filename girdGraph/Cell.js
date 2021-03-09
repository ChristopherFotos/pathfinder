class Cell {
  constructor(x, y, size, column, id, cellObject, neighborColumns) {
    this.id              = id
    this.HTMLid          = column.id.toString() + '_' + id.toString()
    this.state           = {} 
    this.newState        = {}
    this.cellObject      = cellObject
    this.column          = column
    this.board           = this.column.board
    this.neighborColumns = neighborColumns 
    this.x               = x;
    this.y               = y;
    this.size            = size; 
    this.width           = size;
    this.height          = size;
    this.neighbors       = {}  ; 
    this.addToLookupTable()    ;
    this.draw()                ;
  }

  draw() {
    this.board.draw.bind(this)()
  }

  addToLookupTable(){
    this.column.board.cellLookup[this.HTMLid] = this
  }

  findNeighbors(){
    this.neighbors.top                                         = this.cellObject[this.id - this.column.board.cellSize ]
    this.neighbors.bottom                                      = this.cellObject[this.id + this.column.board.cellSize ]
    if(this.neighborColumns.left )  this.neighbors.left        = this.neighborColumns.left.cells  [this.id]
    if(this.neighborColumns.right)  this.neighbors.right       = this.neighborColumns.right.cells [this.id]
    if(this.neighborColumns.left )  this.neighbors.topLeft     = this.neighborColumns.left.cells  [this.id - this.size]
    if(this.neighborColumns.right)  this.neighbors.topRight    = this.neighborColumns.right.cells [this.id - this.size]
    if(this.neighborColumns.right)  this.neighbors.bottomRight = this.neighborColumns.right.cells [this.id + this.size]
    if(this.neighborColumns.left )   this.neighbors.bottomLeft = this.neighborColumns.left.cells  [this.id + this.size]
  }

  getNeighbor(number, direction){
    let currentCell = this
    for(let steps = 0; steps <= number; steps++){
      currentCell = currentCell.neighbors[direction]
    }
    return currentCell
  }

  adoptNewState(){
    if(this.newState){
      this.state = {...this.newState}
      if(this.newState.updates){
        this.newState.updates.bind(this)() 
      }
    }
    this.newState = {}
  }
}
