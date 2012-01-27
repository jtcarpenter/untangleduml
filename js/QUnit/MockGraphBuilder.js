/*
 * MockGraphBuilder
 *
 * provides mock graphs for javascript unit tests
 * @author Jason Carpenter
 */
var MockGraphBuilder = {
    getSimpleGraph:function(){
        var g = new Graph();
        g.title = 'simple graph';
        g.id = 1;
        g.version = 1;
        g.shared = true;

        var cnames = ["Class"];
        var cattributes = ["-attr","-attr"];
        var cmethods = ["+method()","+method()"];
        var elem1 = {names:cnames,attr:cattributes,methods:cmethods,x:10,y:10};

        var knames = ["Klass"];
        var kattributes = ["-attr","-attr"];
        var kmethods = ["+method()","+method()"];
        var elem2 = {names:knames,attr:kattributes,methods:kmethods,x:47,y:40};

        g.vertices.push(new Vertex(elem1));
        g.vertices.push(new Vertex(elem2));

        var rel1 = {left:'Class',right:'Klass',type:'hasa',role:'',leftMult:'',rightMult:''};

        g.edges.push(new Edge(rel1));

        g.matrix[0] = [];
        g.matrix[0][0] = -1;
        g.matrix[0][1] = 1;

        return g;
    },

    getUpdatedSimpleGraph:function(){
        var g = new Graph();
        g.title = 'updated simple graph';
        g.id = 2;
        g.version = 1;
        g.shared = true;

        var cnames = ["Class"];
        var cattributes = ["-attr"];//-attr removed
        var cmethods = ["+method()","+method()","method()"];//method() added
        var elem1 = {names:cnames,attr:cattributes,methods:cmethods,x:10,y:10};

        var knames = ["Klass"];
        var kattributes = ["-attr","-attribute"];//-attr changed to -attribute
        var kmethods = ["+method()","+method()"];
        var elem2 = {names:knames,attr:kattributes,methods:kmethods,x:40,y:40};

        var gnames = ["Glass"];
        var gattributes = ["-attr","-attr"];//-attr changed to -attribute
        var gmethods = ["+method()","+method()"];
        var elem3 = {names:gnames,attr:gattributes,methods:gmethods,x:70,y:70};

        g.vertices.push(new Vertex(elem1));
        g.vertices.push(new Vertex(elem2));
        g.vertices.push(new Vertex(elem3));

        var rel1 = {left:'Class',right:'Klass',type:'hasa',role:'',leftMult:'',rightMult:''};
        var rel2 = {left:'Class',right:'Glass',type:'hasa',role:'role',leftMult:'',rightMult:''};
        var rel3 = {left:'Grass',right:'Glass',type:'hasa',role:'',leftMult:'',rightMult:''};

        g.edges.push(new Edge(rel1));
        g.edges.push(new Edge(rel2));
        g.edges.push(new Edge(rel3));

        g.matrix[0] = [];
        g.matrix[0][0] = -1;
        g.matrix[0][1] = 1;
        g.matrix[0][2] = 0;

        g.matrix[1] = [];
        g.matrix[1][0] = -1;
        g.matrix[1][1] = 1;
        g.matrix[1][2] = 0;

        g.matrix[1] = [];
        g.matrix[1][0] = 0;
        g.matrix[1][1] = 0;
        g.matrix[1][2] = 1;

        return g;
    },

    getRecursiveGraph:function(){
        var g = new Graph();
        g.title = 'recursive graph';
        g.id = 3;
        g.version = 1;
        g.shared = true;

        var cnames = ["Class"];
        var cattributes = ["-attr","-attr"];
        var cmethods = ["+method()","+method()"];
        var elem1 = {names:cnames,attr:cattributes,methods:cmethods,x:10,y:10};

        var knames = ["Klass"];
        var kattributes = ["-attr","-attr"];
        var kmethods = ["+method()","+method()"];
        var elem2 = {names:knames,attr:kattributes,methods:kmethods,x:10,y:10};

        g.vertices.push(new Vertex(elem1));
        g.vertices.push(new Vertex(elem2));

        var rel1 = {left:'Class',right:'Klass',type:'hasa',role:'',leftMult:'',rightMult:''};
        var rel2 = {left:'Class',right:'Class',type:'hasa',role:'',leftMult:'',rightMult:''};

        g.edges.push(new Edge(rel1));
        g.edges.push(new Edge(rel2));

        g.matrix[0] = [];
        g.matrix[0][0] = -1;
        g.matrix[0][1] = 1;

        g.matrix[1] = [];
        g.matrix[1][0] = 1;
        g.matrix[1][1] = 0;

        return g;
    },
    
    getObserver:function(){
        var g = new Graph();
        g.title = 'observer';
        g.id = 4;
        g.version = 1;
        g.shared = true;

        var snames = ["<<interface>>","Subject"];
        var sattributes = "";
        var smethods = ["+attach(Observer)","+detach(Observer)","+notify()"];
        var elem1 = {names:snames,attr:sattributes,methods:smethods,x:10,y:10};

        var onames = ["<<interface>>","Observer"];
        var oattributes = "";
        var omethods = ["+update()"];
        var elem2 = {names:onames,attr:oattributes,methods:omethods,x:40,y:40};

        var csnames = ["ConcreteSubject"];
        var csattributes = ["-subjectState"];
        var csmethods = "";
        var elem3 = {names:csnames,attr:csattributes,methods:csmethods,x:70,y:70};

        var conames = ["ConcreteObserver"];
        var coattributes = ["-observerState"];
        var comethods = ["+update()"];
        var elem4 = {names:conames,attr:coattributes,methods:comethods,x:100,y:100};

        g.vertices.push(new Vertex(elem1));
        g.vertices.push(new Vertex(elem2));
        g.vertices.push(new Vertex(elem3));
        g.vertices.push(new Vertex(elem4));

        var rel1 = {left:'Subject',right:'Observer',type:'hasa',role:'',leftMult:'',rightMult:''};
        var rel2 = {left:'ConcreteObserver',right:'ConcreteSubject',type:'hasa',role:'',leftMult:'',rightMult:''};
        var rel3 = {left:'ConcreteSubject',right:'Subject',type:'isa',role:'',leftMult:'',rightMult:''};
        var rel4 = {left:'ConcreteObserver',right:'Observer',type:'isa',role:'',leftMult:'',rightMult:''};

        g.edges.push(new Edge(rel1));
        g.edges.push(new Edge(rel2));
        g.edges.push(new Edge(rel3));
        g.edges.push(new Edge(rel4));

        g.matrix[0] = [];
        g.matrix[0][0] = -1;
        g.matrix[0][1] = 1;
        g.matrix[0][2] = 0;
        g.matrix[0][3] = 0;

        g.matrix[1] = [];
        g.matrix[1][0] = 0;
        g.matrix[1][1] = 0;
        g.matrix[1][2] = 1;
        g.matrix[1][3] = -1;

        g.matrix[2] = [];
        g.matrix[2][0] = 1;
        g.matrix[2][1] = 0;
        g.matrix[2][2] = -1;
        g.matrix[2][3] = 0;

        g.matrix[3] = [];
        g.matrix[3][0] = 0;
        g.matrix[3][1] = 1;
        g.matrix[3][2] = 0;
        g.matrix[3][3] = -1;
        
        return g;
    },

    getInterpreter:function(){
        var g = new Graph();
        g.title = 'interpreter';
        g.id = 5;
        g.version = 1;
        g.shared = true;

        var clnames = ["Client"];
        var clattributes = "";
        var clmethods = [""];
        var elem1 = {names:clnames,attr:clattributes,methods:clmethods,x:10,y:10};

        var conames = ["Context"];
        var coattributes = "";
        var comethods = [""];
        var elem2 = {names:conames,attr:coattributes,methods:comethods,x:40,y:40};

        var aenames = ["<<interface>>","AbstractExpression"];
        var aeattributes = "";
        var aemethods = ["+interpret()"];
        var elem3 = {names:aenames,attr:aeattributes,methods:aemethods,x:70,y:70};

        var tenames = ["TerminalExpression"];
        var teattributes = "";
        var temethods = ["+interpret()"];
        var elem4 = {names:tenames,attr:teattributes,methods:temethods,x:70,y:70};

        var nenames = ["NonterminalExpression"];
        var neattributes = "";
        var nemethods = ["+interpret()"];
        var elem5 = {names:nenames,attr:neattributes,methods:nemethods,x:70,y:70};

        g.vertices.push(new Vertex(elem1));
        g.vertices.push(new Vertex(elem2));
        g.vertices.push(new Vertex(elem3));
        g.vertices.push(new Vertex(elem4));
        g.vertices.push(new Vertex(elem5));

        var rel1 = {left:'Client',right:'Context',type:'hasa',role:'role',leftMult:'1',rightMult:'1'};
        var rel2 = {left:'Client',right:'AbstractExpression',type:'hasa',role:'',leftMult:'1',rightMult:'1'};
        var rel3 = {left:'NonterminalExpression',right:'AbstractExpression',type:'comp',role:'',leftMult:'1',rightMult:'1'};
        var rel4 = {left:'TerminalExpression',right:'AbstractExpression',type:'isa',role:'',leftMult:'',rightMult:''};
        var rel5 = {left:'NonterminalExpression',right:'AbstractExpression',type:'isa',role:'',leftMult:'',rightMult:''};
        
        g.edges.push(new Edge(rel1));
        g.edges.push(new Edge(rel2));
        g.edges.push(new Edge(rel3));
        g.edges.push(new Edge(rel4));
        g.edges.push(new Edge(rel5));

        g.matrix[0] = [];
        g.matrix[0][0] = -1;
        g.matrix[0][1] = 1;
        g.matrix[0][2] = 0;
        g.matrix[0][3] = 0;
        g.matrix[0][4] = 0;

        g.matrix[1] = [];
        g.matrix[1][0] = -1;
        g.matrix[1][1] = 0;
        g.matrix[1][2] = 1;
        g.matrix[1][3] = 0;
        g.matrix[1][4] = 0;

        g.matrix[2] = [];
        g.matrix[2][0] = 0;
        g.matrix[2][1] = 0;
        g.matrix[2][2] = 1;
        g.matrix[2][3] = 0;
        g.matrix[2][4] = -1;

        g.matrix[3] = [];
        g.matrix[3][0] = 0;
        g.matrix[3][1] = 0;
        g.matrix[3][2] = 1;
        g.matrix[3][3] = -1;
        g.matrix[3][4] = 0;

        g.matrix[4] = [];
        g.matrix[4][0] = 0;
        g.matrix[4][1] = 0;
        g.matrix[4][2] = 1;
        g.matrix[4][3] = 0;
        g.matrix[4][4] = -1;

        return g;
    },

    getUntangledClient:function(){
        var g = new Graph();
        g.title = 'untangled client';
        g.id = 6;
        g.version = 1;
        g.shared = false;

        var rnames = ["Reader"];
        var rattributes = ["lang:Language","graph:Graph","offset:10"];
        var rmethods = ["read(g)","getText()","getElements()","getRels()","adToMatrix()","matchPhrase()","matchWord()","matchWords()"];
        var elem1 = {names:rnames,attr:rattributes,methods:rmethods,x:10,y:10};

        var wnames = ["Writer"];
        var wattributes = ["lang:Language","graph:Graph"];
        var wmethods = ["write(g)","parseGraph()","writeElements(v)","writeRels(edges,matrix)","writeRel(edge)","writeToEditor(param)","clearEditor()"];
        var elem2 = {names:wnames,attr:wattributes,methods:wmethods,x:40,y:40};

        var anames = ["Assimilator"];
        var aattributes = ["newG:Graph","oldGraph:Graph","assimGraph:Graph"];
        var amethods = ["assim(oldGraph,newGraph)","compareEls()","updateEl()","removeEl()","addNewEl()","replaceRels()","replaceMatrix()"];
        var elem3 = {names:anames,attr:aattributes,methods:amethods,x:70,y:70};

        var pnames = ["Painter"];
        var pattributes = ["graph:Graph","isa:[]","hasa:[]","aggr:[]","comp:[]","boxes:[]"];
        var pmethods = ["paint(g)","setupJSPlumb()","createBoxes()","getOverlay(edge)","getConnection(overlay)","getRecursiveConnection(overlay)","connect(srcDiv,tgtDiv,connection)","plumbBoxes()"];
        var elem4 = {names:pnames,attr:pattributes,methods:pmethods,x:100,y:100};

        var dnames = ["Dispatcher"];
        var dattributes = ["graph:Graph"];
        var dmethods = ["init()","saveGraph()","loadGraph()","printGraph()","exportGraph()","updateGraph()","updateGraphCoords()","newDiagram()","share()","createAccount()","toggleAuthorship()"];
        var elem5 = {names:dnames,attr:dattributes,methods:dmethods,x:130,y:130};

        var gnames = ["Graph"];
        var gattributes = ["vertices:[]","edges:[]","matrix:[]","font-size:number","padding:number"];
        var gmethods = "";
        var elem6 = {names:gnames,attr:gattributes,methods:gmethods,x:160,y:160};

        var vnames = ["Vertex"];
        var vattributes = ["x:number","y:number","stereotype:string","name:string","attributes:[]","methods:[]"];
        var vmethods = "";
        var elem7 = {names:vnames,attr:vattributes,methods:vmethods,x:190,y:190};

        var enames = ["Edge"];
        var eattributes = ["left:string","right:string","type:string","leftMult:string","rightMult:string","role:string"];
        var emethods = "";
        var elem8 = {names:enames,attr:eattributes,methods:emethods,x:220,y:220};

        var lnames = ["Language"];
        var lattributes = ["ELEMENT_PHRASE:RegExp","RELATIONSHIP_PHRASE:RegExp","STEREOTYPE_WORD:RegExp","NAME_WORD:RegExp","ATTRIBUTE_WORD:RegExp","METHOD_WORD:RegExp","END_WORD:RegExp","MULT_WORD:RegExp","END_NAME_WORD:RegExp","REL_TYPE_WORD:RegExp","REL_TYPE_NAMES_WORD:RegExp"];
        var lmethods = "";
        var elem9 = {names:lnames,attr:lattributes,methods:lmethods,x:250,y:250};

        var tnames = ["<<DOM>>","text_area"];
        var tattributes = "";
        var tmethods = "";
        var elem10 = {names:tnames,attr:tattributes,methods:tmethods,x:280,y:280};

        var dpnames = ["<<DOM>>","drawing_panel"];
        var dpattributes = "";
        var dpmethods = "";
        var elem11 = {names:dpnames,attr:dpattributes,methods:dpmethods,x:310,y:310};

        var snames = ["<<server>>","Server"];
        var sattributes = "";
        var smethods = "";
        var elem12 = {names:snames,attr:sattributes,methods:smethods,x:340,y:340};

        g.vertices.push(new Vertex(elem1));
        g.vertices.push(new Vertex(elem2));
        g.vertices.push(new Vertex(elem3));
        g.vertices.push(new Vertex(elem4));
        g.vertices.push(new Vertex(elem5));
        g.vertices.push(new Vertex(elem6));
        g.vertices.push(new Vertex(elem7));
        g.vertices.push(new Vertex(elem8));
        g.vertices.push(new Vertex(elem9));
        g.vertices.push(new Vertex(elem10));
        g.vertices.push(new Vertex(elem11));
        g.vertices.push(new Vertex(elem12));

        var rel1 = {left:'Dispatcher',right:'Reader',type:'hasa',role:'',leftMult:'1',rightMult:'1'};
        var rel2 = {left:'Dispatcher',right:'Writer',type:'hasa',role:'',leftMult:'1',rightMult:'1'};
        var rel3 = {left:'Dispatcher',right:'Assimilator',type:'hasa',role:'',leftMult:'1',rightMult:'1'};
        var rel4 = {left:'Dispatcher',right:'Painter',type:'hasa',role:'',leftMult:'1',rightMult:'1'};
        var rel5 = {left:'Dispatcher',right:'Graph',type:'hasa',role:'',leftMult:'1',rightMult:'1'};
        var rel6 = {left:'Graph',right:'Vertex',type:'hasa',role:'',leftMult:'1',rightMult:'0..*'};
        var rel7 = {left:'Graph',right:'Edge',type:'hasa',role:'',leftMult:'1',rightMult:'0..*'};
        var rel8 = {left:'Dispatcher',right:'Language',type:'hasa',role:'',leftMult:'1',rightMult:'1'};
        var rel9 = {left:'Dispatcher',right:'text_area',type:'hasa',role:'',leftMult:'1',rightMult:'1'};
        var rel10 = {left:'Dispatcher',right:'drawing_panel',type:'hasa',role:'',leftMult:'1',rightMult:'1'};
        var rel11 = {left:'Dispatcher',right:'Server',type:'hasa',role:'',leftMult:'1',rightMult:'1'};

        g.edges.push(new Edge(rel1));
        g.edges.push(new Edge(rel2));
        g.edges.push(new Edge(rel3));
        g.edges.push(new Edge(rel4));
        g.edges.push(new Edge(rel5));
        g.edges.push(new Edge(rel6));
        g.edges.push(new Edge(rel7));
        g.edges.push(new Edge(rel8));
        g.edges.push(new Edge(rel9));
        g.edges.push(new Edge(rel10));
        g.edges.push(new Edge(rel11));

        g.matrix[0] = [];
        g.matrix[0][0] = 1;
        g.matrix[0][1] = 0;
        g.matrix[0][2] = 0;
        g.matrix[0][3] = 0;
        g.matrix[0][4] = -1;
        g.matrix[0][5] = 0;
        g.matrix[0][6] = 0;
        g.matrix[0][7] = 0;
        g.matrix[0][8] = 0;
        g.matrix[0][9] = 0;
        g.matrix[0][10] = 0;
        g.matrix[0][11] = 0;

        g.matrix[1] = [];
        g.matrix[1][0] = 0;
        g.matrix[1][1] = 1;
        g.matrix[1][2] = 0;
        g.matrix[1][3] = 0;
        g.matrix[1][4] = -1;
        g.matrix[1][5] = 0;
        g.matrix[1][6] = 0;
        g.matrix[1][7] = 0;
        g.matrix[1][8] = 0;
        g.matrix[1][9] = 0;
        g.matrix[1][10] = 0;
        g.matrix[1][11] = 0;

        g.matrix[2] = [];
        g.matrix[2][0] = 0;
        g.matrix[2][1] = 0;
        g.matrix[2][2] = 1;
        g.matrix[2][3] = 0;
        g.matrix[2][4] = -1;
        g.matrix[2][5] = 0;
        g.matrix[2][6] = 0;
        g.matrix[2][7] = 0;
        g.matrix[2][8] = 0;
        g.matrix[2][9] = 0;
        g.matrix[2][10] = 0;
        g.matrix[2][11] = 0;

        g.matrix[3] = [];
        g.matrix[3][0] = 0;
        g.matrix[3][1] = 0;
        g.matrix[3][2] = 0;
        g.matrix[3][3] = 1;
        g.matrix[3][4] = -1;
        g.matrix[3][5] = 0;
        g.matrix[3][6] = 0;
        g.matrix[3][7] = 0;
        g.matrix[3][8] = 0;
        g.matrix[3][9] = 0;
        g.matrix[3][10] = 0;
        g.matrix[3][11] = 0;

        g.matrix[4] = [];
        g.matrix[4][0] = 0;
        g.matrix[4][1] = 0;
        g.matrix[4][2] = 0;
        g.matrix[4][3] = 0;
        g.matrix[4][4] = -1;
        g.matrix[4][5] = 1;
        g.matrix[4][6] = 0;
        g.matrix[4][7] = 0;
        g.matrix[4][8] = 0;
        g.matrix[4][9] = 0;
        g.matrix[4][10] = 0;
        g.matrix[4][11] = 0;

        g.matrix[5] = [];
        g.matrix[5][0] = 1;
        g.matrix[5][1] = 0;
        g.matrix[5][2] = 0;
        g.matrix[5][3] = 0;
        g.matrix[5][4] = 0;
        g.matrix[5][5] = -1;
        g.matrix[5][6] = 1;
        g.matrix[5][7] = 0;
        g.matrix[5][8] = 0;
        g.matrix[5][9] = 0;
        g.matrix[5][10] = 0;
        g.matrix[5][11] = 0;

        g.matrix[6] = [];
        g.matrix[6][0] = 0;
        g.matrix[6][1] = 0;
        g.matrix[6][2] = 0;
        g.matrix[6][3] = 0;
        g.matrix[6][4] = 0;
        g.matrix[6][5] = -1;
        g.matrix[6][6] = 0;
        g.matrix[6][7] = 1;
        g.matrix[6][8] = 0;
        g.matrix[6][9] = 0;
        g.matrix[6][10] = 0;
        g.matrix[6][11] = 0;

        g.matrix[7] = [];
        g.matrix[7][0] = 0;
        g.matrix[7][1] = 0;
        g.matrix[7][2] = 0;
        g.matrix[7][3] = 0;
        g.matrix[7][4] = -1;
        g.matrix[7][5] = 0;
        g.matrix[7][6] = 0;
        g.matrix[7][7] = 0;
        g.matrix[7][8] = 1;
        g.matrix[7][9] = 0;
        g.matrix[7][10] = 0;
        g.matrix[7][11] = 0;

        g.matrix[8] = [];
        g.matrix[8][0] = 0;
        g.matrix[8][1] = 0;
        g.matrix[8][2] = 0;
        g.matrix[8][3] = 0;
        g.matrix[8][4] = -1;
        g.matrix[8][5] = 0;
        g.matrix[8][6] = 0;
        g.matrix[8][7] = 0;
        g.matrix[8][8] = 0;
        g.matrix[8][9] = 1;
        g.matrix[8][10] = 0;
        g.matrix[8][11] = 0;

        g.matrix[9] = [];
        g.matrix[9][0] = 0;
        g.matrix[9][1] = 0;
        g.matrix[9][2] = 0;
        g.matrix[9][3] = 0;
        g.matrix[9][4] = -1;
        g.matrix[9][5] = 0;
        g.matrix[9][6] = 0;
        g.matrix[9][7] = 0;
        g.matrix[9][8] = 0;
        g.matrix[9][9] = 0;
        g.matrix[9][10] = 1;
        g.matrix[9][11] = 0;

        g.matrix[10] = [];
        g.matrix[10][0] = 0;
        g.matrix[10][1] = 0;
        g.matrix[10][2] = 0;
        g.matrix[10][3] = 0;
        g.matrix[10][4] = -1;
        g.matrix[10][5] = 0;
        g.matrix[10][6] = 0;
        g.matrix[10][7] = 0;
        g.matrix[10][8] = 0;
        g.matrix[10][9] = 0;
        g.matrix[10][10] = 0;
        g.matrix[10][11] = 1;

        return g;
    }
}