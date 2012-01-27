/*
 * Assimilator object literal
 *
 * Updates data in old graph with
 * data in a new graph
 * @author Jason Carpenter
 */
var Assimilator = {
    oldGraph:{},
    newGraph:{},
    assimGraph:{},

    /*
     * assim
     * assimulates new graph into old
     * @param   <Graph> oldGraph
     * @param   <Graph> newGraph
     * @return  <Graph> newGraph
     */
    assim:function(oldGraph,newGraph){
        if(oldGraph !== null){
            this.oldGraph = oldGraph;
            this.newGraph = newGraph;
            this.assimGraph = new Graph();

            this.assimGraph = new Graph();
            this.assimGraph.vertices = this.updateVertices(this.oldGraph.vertices,this.newGraph.vertices);
            this.assimGraph.edges = this.newGraph.edges;
            this.assimGraph.matrix = this.newGraph.matrix;
            this.assimGraph.fontSize = oldGraph.fontSize;
            this.assimGraph.title = oldGraph.title;
            this.assimGraph.id = oldGraph.id;
            this.assimGraph.version = oldGraph.version;
            this.padding = oldGraph.padding;

            return this.assimGraph;
        }else{
            //there is no currently defined graph
            return newGraph;
        }
    },

    /*
     * updateVertices
     * addes old position to new graph
     * of all pre-existing vertices
     * @param   <Array> oldVs
     * @param   <Array> newVs
     * @return  <Array> newVs
     */
    updateVertices:function(oldVs,newVs){
        
        for(var n=0;n<newVs.length;n++){
            for(var o=0;o<oldVs.length;o++){
                if(newVs[n].names[newVs[n].names.length-1]==oldVs[o].names[oldVs[o].names.length-1]){
                    //new vertex is already in the graph take old x,y
                    newVs[n].x = oldVs[o].x;
                    newVs[n].y = oldVs[o].y;
                }
                //vertex in old graph don't appear in new
            }
        }

        return newVs;
    }
}