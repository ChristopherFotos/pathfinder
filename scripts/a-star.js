function euclidianDistance(c1, c2){
    let a = (c2.x - c1.x)
    let b = (c2.y  - c1.y )
    console.log('euc dis', Math.sqrt((a * a)  +  (b * b)))
    return  Math.abs(Math.sqrt((a * a)  +  (b * b)))
}

function calculateG(c, relation){ 

    let g

    if (relation === 'topLeft'   || 
        relation ==='bottomLeft' || 
        relation ==='topRight'   || 
        relation ==='bottomRight'){g = 14} else if(
        relation === 'top'    ||
        relation === 'bottom' ||
        relation === 'left'   ||
        relation === 'right'){g = 10}


    let cameFrom = c.cameFrom  
    let path     = [] 
    let checked  = []

    while(cameFrom && checked.indexOf(cameFrom) === -1){
        path.push(cameFrom)
        checked.push(cameFrom)
        if(cameFrom.parent){
            cameFrom = cameFrom.parent
        }
    }

    path.forEach(cell => {
        g += cell.gScore
        console.log(g)
    })

    return g
}

function aStar(){
    let open    = [],
        closed  = [],
        current = nodeInfo.start

    current.hScore    = euclidianDistance(nodeInfo.start, nodeInfo.end)
    current.gScore    = 0
    current.fScore    = current.hScore + current.gScore
    console.log('START NODE:', nodeInfo.start.fScore, current)
    let shortestPath = []
     

    while(current !== nodeInfo.end){
        console.log(nodeInfo.start.gScore)
        let pathG = 0
        for(neighbor in current.neighbors){
            //added third condition  ***** 
            if(!current.neighbors[neighbor].notNode && !closed.includes(current.neighbors[neighbor]) && current.neighbors[neighbor] !== undefined){
                if(!open.includes(current.neighbors[neighbor]) && !closed.includes(current.neighbors[neighbor])){
                    open.push(current.neighbors[neighbor])
                }

                if(current.neighbors[neighbor] === current.parent){
                    console.log('parent found, check skipped')
                    continue
                }

                current.neighbors[neighbor].div.classList.add('a')
                current.neighbors[neighbor].cameFrom    =  current
                current.neighbors[neighbor].hScore   =  euclidianDistance(current.neighbors[neighbor], nodeInfo.end) 

                let gScore                              =  calculateG(current.neighbors[neighbor], neighbor)

                
                if(!current.neighbors[neighbor].gScore || gScore < current.neighbors[neighbor].gScore){
                    current.neighbors[neighbor].cameFrom    =  current
                    current.neighbors[neighbor].gScore = gScore
                    current.neighbors[neighbor].fScore = pathG + current.neighbors[neighbor].hScore

                    current.neighbors[neighbor].parent = current
                    console.log('calculated fScore = ', current.neighbors[neighbor].fScore)
                }                                                       
            }
        }

        let lowestF = open[0]

        closed.push(current)
        console.log ('closed: ', closed , 'open: ', open)
        
        for(let i = 0; i < open.length - 1; i++){
            if(open[i].fScore < lowestF.fScore){
                console.log('GOING GOING GONE')
                lowestF = open[i]
            }
        }

        console.log(lowestF)
        open.splice(open.indexOf(lowestF), 1)
        current = lowestF
        console.log('THE CELL CURRENTLY IN THE WHILE LOOP IS: ', current)
    }

    parent = nodeInfo.end.parent 
    shortestPath.unshift(nodeInfo.end)
    shortestPath.unshift(parent)
    if(parent.parent){ parent = parent.parent} else parent = false
    while(parent){                                                                                              
        shortestPath.unshift(parent);                                                                           
        if(parent.parent){ parent = parent.parent } else parent = false
    }

    // ALL CHANGES MADE BELOW
    return {
         path: shortestPath, 
         closed: closed,
         open: open,
    }
} 


// make it so that a node never checks its own parent