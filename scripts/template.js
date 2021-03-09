const template = `
<div id='modal'>
        <span class="exit">X</span>
        <h1 class="help-title">About</h1>
        <p class="help-text">
            Pathfinder is a demo of the A* pathfinding algorithm. Pathfinding algorithms,
            including (and perhaps especially) A* are used all over modern software.
            The obvious use-case is for maps like Google Maps or Waze, but there are 
            a ton of novel and practical uses for pathfinding algorithms. 
        </p>
        <p class="help-text">
            Pathfinder was built using a small library called gridGraph, which I wrote.
            gridGraph creates a grid of cells (hence 'grid') where each cell stores a 
            reference to all of its neighbors, technically making it a graph (hence graph)
            where each node is a cell.  
        </p>

        <h1 class="help-title">Instructions</h1>
        <p class="help-text">
            <strong>Nodes</strong><br>
            The A* algorithm needs a start node and an end node. 
            <br><br>
            You can place a start node by clicking the 'Start node' button 
            and then clicking on any cell on the grid. The 'End node' button 
            will automatically be selected for you after you place a start node, 
            so all you have to to is click another cell to place your end node. 
            <br><br>
            Now click 'go' in the top right hand corner and watch Pathfinder
            find a path between the two nodes.
            <br><br>
            Of course, it isn't really that exciting to watch your computer draw
            a line from one square to another. That's where obstacles come in! 
            <br> <br>
            <strong>Obstacles</strong> <br>
            To place an obstacle, select either 'Obstacle' or 'Large Obstacle'
            from the menu at the top right of your screen. Then click and drag 
            on the grid to place your obstacle. Now when you click 'go', Pathfinder 
            will navigate around the obstacles you've placed. 
        </p>
    </div>
`