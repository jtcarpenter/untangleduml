/*
 * Reader object literal
 *
 * Reads syntax from text editor and create graph
 * @author Jason Carpenter
 */
var Reader = {
    graph:{},
    lang:Language,

    /*
     * read
     * @return <Graph> graph
     */
    read:function(){
        
        this.graph = new Graph();
        this.getElements();
        this.getRelationships();    

        return this.graph;
    },

    /*
     * getElements
     * reads elements and adds to graph.vertices
     */
    getElements:function(){
        var txt = $('#text_editor').text();
        var elementStrs = [];
        
        try{elementStrs = this.matchPhrases(txt,this.lang.ELEMENT_PHRASE);}
        catch(e){}
        
        for(var el=0;el<elementStrs.length;el++){
   
            var name = undefined;
            var elem = {names:[],attr:[],methods:[],x:0,y:0}

            try{
                // element has a valid name
                var name = this.matchWord(elementStrs[el],this.lang.NAME_WORD);
            
                try{
                    elem.names.push(this.matchWord(elementStrs[el],this.lang.STEREOTYPE_WORD));
                    elem.names.push(name);
                }catch(e){
                    elem.names.push(name);
                };
                try{
                    elem.attr = this.matchWords(elementStrs[el],this.lang.ATTRIBUTE_WORD);
                }catch(e){};
                try{
                    elem.methods = this.matchWords(elementStrs[el],this.lang.METHOD_WORD);
                }catch(e){};

                if(elem.names.length>0){
                    this.setCoords(elem);
                    this.graph.vertices.push(new Vertex(elem));
                }
            }catch(e){
                // element is invalid, has no name
            };
        }
    },

    /*
     * setCoords
     * sets positioning of elemtns to defaults
     * @param <Object> elem
     */
    setCoords:function(elem){     
        elem.x = -1;
        elem.y = -1;
    },

    /*
     * getRelationships
     * reads relationships and adds to graph.edges
     */
    getRelationships:function(){
        var txt = $('#text_editor').text();      
        var relationshipStrs = [];
        this.graph.edges = [];
        this.graph.matrix = [];
        
        try{relationshipStrs = this.matchPhrases(txt, this.lang.RELATIONSHIP_PHRASE);}
        catch(e){};

        for(var r=0;r<relationshipStrs.length;r++){
            var rel = undefined;
            
            try{
                try{var ends = this.matchWords(relationshipStrs[r],this.lang.END_WORD);}catch(e){};
                try{var e1 = this.matchWord(ends[0],this.lang.END_NAME_WORD);}catch(e){};
                try{var e2 = this.matchWord(ends[1],this.lang.END_NAME_WORD);}catch(e){};

                rel = {left:'',right:'',type:'',role:'',leftMult:'',rightMult:''};

                rel.left = e1;
                rel.right = e2

                try{rel.leftMult=this.matchWord(ends[0],this.lang.MULT_WORD)}catch(e){};
                try{rel.rightMult=this.matchWord(ends[1],this.lang.MULT_WORD)}catch(e){};

                try{
                    var type=this.matchWord(relationshipStrs[r],this.lang.REL_TYPE_WORD,1);

                    try{
                        var typeName=this.matchWord(type,this.lang.REL_TYPE_NAMES_WORD,0);
                        var role=this.matchWord(type,this.lang.REL_TYPE_ROLE_WORD,1);

                        rel.type=typeName;
                        if(role!==undefined)rel.role=role;

                        this.addToMatrix(rel);
                        this.graph.edges.push(new Edge(rel));


                    }catch(e){
                        //relationship type is invalid
                    };

                }catch(e){
                    //relationship is invalid
                };
                    
            }catch(e){
                // relationship has invalid ends
            }
        }
    },

    /*
     * addToMatrix
     * create the incidence matrix
     * @param <Object> rel
     */
    addToMatrix:function(rel){
        //add array (extra dimension) to matrix
        this.graph.matrix.push([]);

        for(var v=0;v<this.graph.vertices.length;v++){
            
            if(this.graph.vertices[v].names[this.graph.vertices[v].names.length-1]===rel.left){
                this.graph.matrix[this.graph.matrix.length-1][v]=-1;
            }else if(this.graph.vertices[v].names[this.graph.vertices[v].names.length-1]===rel.right){
                this.graph.matrix[this.graph.matrix.length-1][v]=1;
            }else{
                this.graph.matrix[this.graph.matrix.length-1][v]=0;
            }
        }
    },

    /*
     * matchPhrases
     * matches against phrases (elements or relationships)
     * @param   <String>    txt
     * @param   <RegExp>    PHRASE
     * @return  <Array>     results
     */
    matchPhrases:function(txt,PHRASE){
        var results = [];
        results = txt.match(PHRASE);
        if(results!==null){
            return results;
        }else{
            throw new Error('contains no phrases');
        }
    },

    /*
     * matchWords
     * matches against word (attributes etc.)
     * @param  <String> txt
     * @param  <RegExp> WORD
     * @return <Array> results
     */
    matchWords:function(txt,WORD){
        var results = [];
        results = txt.match(WORD);
        if(results!==null){
            return results
        }else{
            throw new Error("no words matched");
        }
    },

    /*
     * matchWord
     * matches against word when we only want
     * to return one of the results
     * @param   <String>    txt
     * @param   <RegExp>    WORD
     * @param   <number>    index
     * @return  <String>    result
     */
    matchWord:function(txt,WORD,index){
        var wanted = 0;
        if(index!==undefined){
            //pass index if the value we want is not the first match
            wanted = index
        };
        var results = [];
        results = txt.match(WORD);
        if(results!==null){
            var result = results[wanted];
            return result;
        }else{
            throw new Error("no word found");
        }
    }
}