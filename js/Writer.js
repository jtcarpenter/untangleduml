/*
 * Writer object literal
 * 
 * Interprets graphs and writes to text editor
 * @author Jason Carpenter
 */
var Writer = {
    graph:null,

    /*
     * write
     * writes graph to the text editor
     * @param <Graph> graph
     */
    write:function(graph){
        //if an arg is passed
        if(graph!==undefined){
            this.graph=graph;          
            $('#text_editor').empty();
            this.parseGraph();
            this.addTitle();
        }
    },

    /*
     * addTitle
     * adds title to the editor
     */
    addTitle:function(){
        $('#title').text(this.graph.title);
    },

    /*
     * parseGraph
     * adds elements and relationships
     */
    parseGraph:function(){
        this.writeElements(this.graph.vertices);
        this.writeRelationships(this.graph.edges,this.graph.matrix);
    },

    /*
     * writeElements
     * adds syntax for verrtices
     * @param <Array> vertices
     */
    writeElements:function(vertices){
        
        for(var v=0;v<vertices.length;v++){
            this.writeToEditor('{',false);
            try{
                for(var n=0;n<vertices[v].names.length;n++){
                    // replaces with html escapes chars
                    var str = vertices[v].names[n]+'/';
                    str = str.replace(/<</,'&lt;&lt;');
                    str = str.replace(/>>\//,'&gt;&gt;');
                    this.writeToEditor(str,true);
                }
                
            }catch(e){};
            try{
                for(var a=0;a<vertices[v].attributes.length;a++){
                    this.writeToEditor(vertices[v].attributes[a]+';',true);
                }
            }catch(e){};
            try{
                for(var m=0;m<vertices[v].methods.length;m++){
                    // if method uses method():return: syntax
                    if(vertices[v].methods[m].match(/[+-_A-Za-z0-9]+\([A-Za-z0-9-_,:]*\):[A-Za-z0-9-_]+/)){
                        this.writeToEditor(vertices[v].methods[m]+':',true);
                    }else{
                        this.writeToEditor(vertices[v].methods[m]+';',true);
                    }
                }
            }catch(e){};
            
            this.writeToEditor('}',true);
        }
    },

    /*
     * writeRelationships
     * checks id edges have valid ends
     * @param <Array> edges
     * @param <Array> matrix
     */
    writeRelationships:function(edges,matrix){
        var hasLeft = false;
        var hasRight = false;
        for(var e=0;e<matrix.length;e++){
            hasLeft = false;
            hasRight = false;

            for(var v=0;v<matrix[e].length;v++){
                if(matrix[e][v]==-1){
                    hasLeft = true;
                }else if(matrix[e][v]==1){
                    hasRight = true;
                }else{
                    //no connection
                }
            }
            
            var str = this.writeRelationship(edges[e]);
            this.writeToEditor(str,true);
        }
    },

    /*
     * writeRelationship
     * add the syntax for relationships
     * @param <Edge> edge
     */
    writeRelationship:function(edge){
        var left = edge.left;
        var right = edge.right;
        var type = edge.type;
        
        var leftMult = '';
        try{
            leftMult = edge.leftMult;
            if(leftMult!=='')leftMult = '('+leftMult+')';
        }catch(e){};
        var rightMult = '';
        try{
            rightMult = edge.rightMult;
            if(rightMult!=='')rightMult = '('+rightMult+')';
        }catch(e){};
        var role = '';
        try{
            //extract <s and >s from text editor 
            role = edge.role.replace(/(<)|(>)|(&lt;)|(&gt;)/g,'');
            if(role!==''){role = '('+role+')'}else{role = ''};
        }catch(e){};
        return '['+left+leftMult+']'+type+role+'['+right+rightMult+']';
    },

    /*
     * writeToEditor
     * writes into the text editor
     * @param <String> str
     * @param <Boolean> newLine
     */
    writeToEditor:function(str,newLine){
        $('#text_editor').append(str);
        if(newLine)$('#text_editor').append('<br/>');
    }
}