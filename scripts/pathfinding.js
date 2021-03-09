function drawcell(){
    let cell             = document.createElement('div')
    let body             = document.getElementsByTagName('body')[0]
    cell.style.position  = 'absolute'
    cell.style.left      = this.x + 'px'
    cell.style.top       = this.y  +  'px'
    cell.style.width     = this.size  + 'px'
    cell.style.height    = this.size  + 'px'
    cell.style.margin    = 'none'
    cell.classList.add('cell')
    cell.dataset.cell    = this.HTMLid
    body.append(cell)
    this.div = cell
  }

  let board = new Board({
    width: window.innerWidth * 0.98, 
    height: window.innerHeight * 0.98, 
    cellSize: 20, 
    stepFunction: findPath, 
    updateInterval:20, 
    cellByCell: false, 
    draw: drawcell
  })

let cells   = Array.from(document.getElementsByClassName('cell'))

function findPath(){
    if( nodeInfo.start && nodeInfo.end && !board.state.path){
        board.state.path = aStar().path
        board.state.open = aStar().open
        board.state.closed = aStar().closed
        board.stop()

        board.state.path.forEach(c => {
            c.div.classList.add('start')
        })
    }
}

function clear(){

    nodeInfo.obstacles.forEach(c => {
        c.div.classList.remove('obstacle')
        c.notNode = false
    })

    if(board.state.path){
        board.state.path.forEach(c => {
            delete c.cameFrom
            delete c.hScore
            delete c.fScore
            delete c.gScore

            let div = document.querySelector(`div[data-cell='${c.HTMLid}']`)
            div.classList.remove('start')
        })
        

        board.state.open.forEach(c => {
            delete c.cameFrom
            delete c.hScore
            delete c.fScore
            delete c.gScore
            delete c.parent

            let div = document.querySelector(`div[data-cell='${c.HTMLid}']`)
            div.classList.remove('a')
        })
        
        board.state.closed.forEach(c => {
            delete c.cameFrom
            delete c.hScore
            delete c.fScore
            delete c.gScore
            delete c.parent

            let div = document.querySelector(`div[data-cell='${c.HTMLid}']`)
            div.classList.remove('a')
        })

        delete board.state.path 
        delete board.state.open
        delete board.state.closed
        delete board.state.null

        let end = document.querySelector(`div[data-cell='${nodeInfo.end.HTMLid}']`)
        let start = document.querySelector(`div[data-cell='${nodeInfo.end.HTMLid}']`)

        end.classList.remove('end')
        end.classList.remove('a')
        start.classList.remove('end')
        start.classList.remove('a')

        mouseState.addingNode = 'start'

        nodeInfo.obstacles.forEach(c => {
            c.div.classList.remove('obstacle')
            c.notNode = false
        })

        let actives   = Array.from(document.getElementsByClassName('active'))
        actives.forEach(a => a.classList.remove('active'))
        document.getElementById('start').classList.add('active')

        nodeInfo = {
            start: null,
            end  : null,
            obstacles: []
        }

        
    }
}

let nodeInfo   = {
    start: null,
    end  : null,
    obstacles: []
}

let mouseState = {
    addingNode: 'start',
    obstacle  : false  ,
}

document.addEventListener('mousemove', e => {
    mouseState.mouseX = e.clientX
    mouseState.mouseY = e.clientY
})

document.addEventListener('mousedown', e => {
    e.preventDefault()
    mouseState.down = true
    mouseState.up   = false
})

document.addEventListener('mouseup', e => {
    mouseState.up   = true
    mouseState.down = false
})

function addActive(e){
    let activesRaw   = Array.from(document.getElementsByClassName('active'))
    let activesClean = activesRaw.filter(a => a !== e.target)
    activesClean.forEach(a => a.classList.remove('active'))

    e.target.classList.add('active')
}

document.addEventListener('click', e => {
    console.log(e.target)

    const controls = {
        go: ()=>{ if(nodeInfo.start && nodeInfo.end) board.start()},
        start: ()=>{ mouseState.addingNode = 'start'; addActive(e) },
        end: ()=>{ mouseState.addingNode = 'end'; addActive(e)},
        obstacle: ()=>{ mouseState.addingNode = 'obstacle'; addActive(e) },
        bigObstacle: ()=>{ mouseState.addingNode = 'big-obstacle'; addActive(e) },
        clear: clear,
        help : addModal
    }

    if(e.target.dataset.control){
        controls[e.target.dataset.control]()
    }
})

cells.forEach(c => {
    c.addEventListener('click', e => {

        if (
                nodeInfo.start && 
                board.cellLookup[e.target.dataset.cell].HTMLid == nodeInfo.start.HTMLid &&
                mouseState.addingNode === 'start'
            ){
                console.log('removing')
                e.target.classList.remove('start')
                nodeInfo.start = null 
                return 
        }

        if (
                nodeInfo.end && 
                board.cellLookup[e.target.dataset.cell].HTMLid === nodeInfo.end.HTMLid &&
                mouseState.addingNode === 'end'
            ){
                console.log('removing')
                e.target.classList.remove('end')
                nodeInfo.end = null 
                return 
        }

        if(mouseState.addingNode === 'end' && nodeInfo.end === null){
            nodeInfo.end = board.cellLookup[e.target.dataset.cell]
            e.target.classList.add('end') 
        }

        if(mouseState.addingNode === 'start' && nodeInfo.start === null){
            nodeInfo.start = board.cellLookup[e.target.dataset.cell]
            e.target.classList.add('start')  
            
            mouseState.addingNode = 'end'

            document.getElementById('start').classList.remove('active')
            document.getElementById('end').classList.add('active')
        }  

  

        if(mouseState.addingNode === 'obstacle'){
            board.cellLookup[e.target.dataset.cell].notNode = true
            nodeInfo.obstacles.push(board.cellLookup[e.target.dataset.cell])
            e.target.classList.add('obstacle') 
        }
    })

    c.addEventListener('mouseenter', e => {
        if(mouseState.addingNode === 'obstacle' && mouseState.down === true){
            board.cellLookup[e.target.dataset.cell].notNode = true
            nodeInfo.obstacles.push(board.cellLookup[e.target.dataset.cell])
            e.target.classList.add('obstacle') 
            }

            if(mouseState.addingNode === 'big-obstacle' && mouseState.down === true){
                for(cell in board.cellLookup[e.target.dataset.cell].neighbors){
                    board.cellLookup[e.target.dataset.cell].neighbors[cell].notNode = true

                    nodeInfo.obstacles.push(board.cellLookup[e.target.dataset.cell].neighbors[cell])

                    board.cellLookup[e.target.dataset.cell].neighbors[cell].div.classList.add('obstacle')
                }
            }
            
        }
    )
})




