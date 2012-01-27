/*
 * Graph class
 *
 * @author Jason Carpenter
 */
function Graph(){
    this.title = 'untitled';
    this.id = NaN;
    this.version = 0;
    this.vertices = [];
    this.edges = [];
    this.matrix = [];
    this.fontSize = 18;
    this.shared = false;
}

/*
 * Vertex class
 *
 * @author Jason Carpenter
 */
function Vertex(params){
    this.names = params.names;
    this.attributes = params.attr;
    this.methods = params.methods;
    this.x = params.x;
    this.y = params.y;
}

/*
 * Edge class
 *
 * @author Jason Carpenter
 */
function Edge(params){
    this.left = params.left;
    this.right = params.right;
    this.type = params.type;
    this.leftMult = params.leftMult;
    this.rightMult = params.rightMult;
    this.role = params.role;
}

/*
 * runs when user leaves page
 */
$(window).unload(function(){
    Dispatcher.closeDown();
})

/*
 * js application starts here once page loaded
 */
$(document).ready(function(){   
    Dispatcher.init();   
})

