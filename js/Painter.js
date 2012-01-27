/*
 * Painter object literal
 *
 * Interprets a graph object
 * and represents it in drawing panel
 * @author Jason Carpenter
 */
var Painter = {
    graph:{},
    isa: [ "PlainArrow", {location:1,width:15,length:15,paintStyle:{fillStyle:'#fff',strokeStyle:'#000'}}],
    hasa: [ "Arrow", {location:1,width:15,length:15,foldback:0.01,paintStyle:{strokeStyle:'#000'}}],
    aggr: [ "Diamond", {location:0,width:15,length:17,paintStyle:{fillStyle:'#fff',strokeStyle:'#000'}}],
    comp: [ "Diamond", {location:0,width:15,length:17,paintStyle:{fillStyle:'#000',strokeStyle:'#000'}}],
    boxes:[],

    x:0,
    y:0,
    defaultX:20,
    defaultY:20,
    tallest:0,
    drawingAreaPadding:50,

    /*
     * paint
     * represents a graph in the drawing panel
     * @param <Graph> graph
     */
    paint:function(graph){
        //clean up 
        jsPlumb.reset();
        this.graph = {};
        this.boxes = [];
        $('#drawing_panel').empty();
        this.x=this.defaultX;
        this.y=this.defaultY;

        this.graph = graph;
        this.setupJSPlumb();
        this.createBoxes();
        this.plumbBoxes();
        this.addDragToUnconnected();
    },

    /*
     * setupJSPlumb
     * completes setup for JSPlumb Library
     */
    setupJSPlumb:function(){
        jsPlumb.setRenderMode(jsPlumb.CANVAS);
        //set width and colour of lines
        jsPlumb.Defaults.PaintStyle = {lineWidth:1,strokeStyle: '#000'};
        //set default size and colour for endpoints
        jsPlumb.Defaults.Endpoints = [["Dot",{radius:1} ],["Dot",{radius:1}]];
        jsPlumb.Defaults.EndpointStyles = [{fillStyle:"#000"}, {fillStyle:"#000"}];

        //unload jsPlumb when we navigate away
        $(window).unload(function(){
            jsPlumb.unload();
        });

        jsPlumb.setMouseEventsEnabled(true);
        jsPlumb.Defaults.DragOptions = {cursor: 'pointer', zIndex:2000};
        //allows unlimited connectiosn from single endpoint
        jsPlumb.Defaults.MaxConnections = -1;
        //set default dynamic anchors for src and target 
        jsPlumb.Defaults.Anchor = [[0.25,0,0,-1], [0.5,0,0,-1], [0.75,0,0,-1], [1,0.25,1,0], [1,0.5,1,0], [1,0.75,1,0], [0.75,1,0,1], [0.5,1,0,1], [0.25,1,0,1], [0,0.75,-1,0], [0,0.5,-1,0], [0,0.25,-1,0]];;
    },

    /*
     * setCoords
     * sets position of elements in drawing panel
     * @param <Vertex>      vertex
     * @param <DOM Object>  node
     */
    setCoords:function(vertex,node){
        var reach = this.x + (node.width()+40);
        ((node.height()+40)>this.tallest)?this.tallest=(node.height()+40):this.tallest=this.tallest;

        if(reach > ($('#drawing_panel').width())){
            this.x = this.defaultX;
            this.y += this.tallest;
            this.tallest = 0;
        }

        
        if(this.y>$('#drawing_panel').height()){
            this.y=this.defaultX;
            this.x=this.defaultY;
        }
        vertex.y = this.y;
        vertex.x = this.x;
        

        this.x += (node.width()+40);
    },

    /*
     * createBoxes
     * paints boxes to represent vertices
     */
    createBoxes:function(){
        for(var v=0;v<this.graph.vertices.length;v++){

            $('#drawing_panel').append('<div class="object" id="object'+v+'" >\n\</div>');
            $('#object'+v).css('fontSize',this.graph.fontSize);

            //add names to class box
            $('#drawing_panel #object'+v).append('<div class="name"></div>\n');  
            for(var n=0;n<this.graph.vertices[v].names.length;n++){
                var name = this.graph.vertices[v].names[n].replace(/\</g, '&lt;');
                name = name.replace(/\>/g, '&gt;');

                if(name.match(/\/[A-Za-z0-9-_:]/)){
                    //abstract class
                    name = name.replace(/\//,'');
                    $('#drawing_panel #object'+v+' .name').append('<p class="abstract">'+name+'</p>');
                }else{
                    $('#drawing_panel #object'+v+' .name').append('<p>'+name+'</p>');
                }
                
            }

            //add attributes to class box
            if(this.graph.vertices[v].attributes.length>0){
                $('#drawing_panel #object'+v).append('<div class="attr"></div>\n');
                for(var a=0;a<this.graph.vertices[v].attributes.length;a++){

                    $('#drawing_panel #object'+v+' .attr').append('<p>'+this.graph.vertices[v].attributes[a]+'</p>')
                }
            }

            //add methods to class box
            if(this.graph.vertices[v].methods.length>0){
                $('#drawing_panel #object'+v).append('<div class="methods"></div>\n');
                for(var m=0;m<this.graph.vertices[v].methods.length;m++){

                    $('#drawing_panel #object'+v+' .methods').append('<p>'+this.graph.vertices[v].methods[m]+'</p>')
                }
            }

            if(this.graph.vertices[v].x==-1||this.graph.vertices[v].y==-1){
                //vertex is new, position must be set
                this.setCoords(this.graph.vertices[v],$('#object'+v));
                $('#object'+v).addClass('initial');
            };

            $('#object'+v).css({top:this.graph.vertices[v].y,left:this.graph.vertices[v].x});            
            this.boxes.push('object'+v);
        }

        this.x = this.y = this.drawingAreaPadding;
    },

    /*
     * dashed
     * create special ovelay for dashed lines
     * @param   <Array> overlay
     * @return  <Array> overlay
     */
    dashed:function(overlay){
        
        for(var i=0;i<10;i++){
            overlay.push(["Label",{
                label:'-',
                location:i/10,
                cssClass:"dash",
                labelStyle:{color:'#fff'}
            }]);  
        }
        
        return overlay;
    },

    /*
     * getOverlay
     * creates ovelay to represent line type
     * @param   <Edge>  edge
     * @return  <Array> ovelay
     */
    getOverlay:function(edge){
        var overlay = [];

        //add correct arrow type to line overlay
        switch(edge.type){
            case "isa":
                overlay.push(this.isa);
                break;
            case "hasa":
                overlay.push(this.hasa);
                break;
            case "aggr":
                overlay.push(this.aggr);
                break;
            case "comp":
                overlay.push(this.comp);
                break;
            case "bi":
                break;
            case "dep":
                if(edge.role!==''){
                    //extract any old <s and >s
                    edge.role=edge.role.replace(/(<)|(>)|(&lt;)|(&gt;)/g,'');
                    //change role to stereotype for dependency
                    edge.role='&lt;&lt;'+edge.role+'&gt;&gt;';
                }
                overlay.push(this.hasa);
                overlay=this.dashed(overlay);
                break;
            default:
                //no arrow attached
        }
        //if edge has a role add it to overlay
        if(edge.role!==''){
            overlay.push(["Label",{
                label:edge.role,
                location:0.5,
                cssClass:"jsplumb_label"
            }]);          
        }
        //if edge has leftMult add it to overlay
        if(edge.leftMult!==''){
            overlay.push(["Label",{
                label:edge.leftMult,
                location:0.1,
                cssClass:"jsplumb_label"
            }]);
        }
        //if edge has rightMult
        if(edge.rightMult!==''){
            overlay.push(["Label",{
                label:edge.rightMult,
                location:0.9,
                cssClass:"jsplumb_label"
            }]);
        }
        return overlay;
    },

    /*
     * getConnection
     * create a jsPlumb connection object
     * @param   <Array>     overlay
     * @return  <Object>    connection
     */
    getConnection:function(overlay){
        var connection = {
            connector:["Flowchart",{stub:20}],
            dragOptions:{containment:"parent"},
            overlays:overlay
        };
        return connection;
    },

    /*
     * getRecursiveConnection
     * create a recursive jsPlumb connection object
     * @param   <Array>     overlay
     * @return  <Object>    connection
     */
    getRecursiveConnection:function(overlay){
        var connection = {
            connector:["Flowchart",{stub:100}],
            dragOptions:{containment:"parent"},
            overlays:overlay,
            anchors:[[1,0.1,1,0],[1,0.5,1,0]]
        };
        return connection;
    },

    /*
     * connect
     * connect boxes with ilne using jsPlumb
     * @param   <DOM Object>    srcDiv
     * @param   <DOM Object>    tgtDiv
     * @param   <Object>        connection
     */
    connect:function(srcDiv,tgtDiv,connection){
        jsPlumb.connect({source:srcDiv,target:tgtDiv},connection);
    },

    /*
     * plumbBoxes
     * perform plumbing
     */
    plumbBoxes:function(){
        var srcDiv = '';
        var tgtDiv = '';
        var overlay = null;
        var connection = null;

        for(var e=0;e<this.graph.matrix.length;e++){

            //find ends of a line
            for(var v=0;v<this.graph.matrix[e].length;v++){
                if(this.graph.matrix[e][v]===-1){
                    srcDiv = this.boxes[v];
                }else if(this.graph.matrix[e][v]===1){
                    tgtDiv = this.boxes[v];
                }
            }
            //create overlay for this line
            overlay = this.getOverlay(this.graph.edges[e]);
            if(srcDiv===''&&tgtDiv===''){
                //source and target not set in matrix
            }else if(srcDiv!==''&&tgtDiv===''){
                //relationship is recursive on srcDiv
                connection = this.getRecursiveConnection(overlay);
                this.connect(srcDiv,srcDiv,connection);
            }else if(srcDiv===''&&tgtDiv!==''){
                //relationship is recursive on tgtDiv
                connection = this.getRecursiveConnection(overlay);
                this.connect(tgtDiv,tgtDiv,connection);
            }else{
                connection = this.getConnection(overlay);
                this.connect(srcDiv,tgtDiv,connection);
            }           
            
            srcDiv = tgtDiv = '';
            overlay = null;
            connection = null;
            
        }
    },

    /*
     * addDragToUnconnected
     * Boxes are made draggable when connecions are made
     * Unconnected Boxes are made draggable too
     */
    addDragToUnconnected:function(){
        var id = NaN;
        for(var v=0;v<this.boxes.length;v++){
            id = v;
            for(var e=0;e<this.graph.matrix.length;e++){
                if(this.graph.matrix[e][v]===1||this.graph.matrix[e][v]===-1)id=NaN;
            }
            if(id!==NaN){
                $('#object'+v).draggable();
            }
        }
    }
}