class Board {
  constructor({width, height, cellSize, stepFunction, updateInterval = 300, cellByCell = true, props, draw}) {
    this.width        = width;
    this.height       = height;
    this.cellByCell   = cellByCell;
    this.cellSize     = cellSize; 
    this.updateInterval = updateInterval
    this.columns      = {};
    this.cells        = [];
    this.state        = {};
    this.props        = props;
    this.draw         = draw
    this.cellLookup   = {};
    this.columnArray  = [];
    this.subscribers  = [];
    this.stepFunction = stepFunction;
    this.createGrid();
    this.createCells();
    this.getCells();
    this.findCellNeighbors();
  }

  addSubscriber(sub){
    if(!sub.handleUpdate){
      throw new Error('subscirbers must have a method called handleUpdate')
    }
    this.subscribers.push(sub)
  }

  createGrid() {
    //Create columns
    for (
      let i = 0;
      i < this.width + (this.cellSize + 1);
      i += this.cellSize
    ) {
      this.columns[i] = new Column(i, this.cellSize, this.height, this, i)
    }
  }

  createCells(){
    for(let column in this.columns){
      this.columnArray.push(this.columns[column])
    }
    this.columnArray.forEach(c=>{
      c.makeColumn()
    })
  }

  getCells() {
    for(let column in this.columns){
      for(let cell in this.columns[column].cells){
        this.cells.push(this.columns[column].cells[cell])
      }
    }
  }

  findCellNeighbors(){
    this.cells.forEach(cell => {
      cell.findNeighbors()
    })
  }

  update(board){
      this.subscribers.forEach((s)=>{
        s.handleUpdate()
      })

      board.cells.forEach(c => {
        board.stepFunction(c)
      })

      if(board.cellByCell){
      board.cells.forEach(c => {
        c.adoptNewState()
      })


    }
    
    if(!board.cellByCell){
      board.stepFunction()
    }
  }

  start(){
    // shouldn't this.update be wrapped in an arrow function with 'this' as an argument?
    this.stopID = setInterval(()=>this.update(this), this.updateInterval, this)
  }


  stop(){
    if(this.stopID) clearInterval(this.stopID)
  }

  clear(){
    this.columns = {}
    this.createGrid()
  }
}


