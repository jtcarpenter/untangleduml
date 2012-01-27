/*
 * Dispatcher object literal
 *
 * Manages all user interaction
 * @author Jason Carpenter
 */
var Dispatcher ={
    graph: null,
    spinner:{},
    spinnerOpts:{
        lines:10,
        length:10,
        width: 4,
        radius: 10,
        color: '#555',
        speed: 1,
        trail: 100
    },
    target:document.getElementById('spinner'),
    baseURL:'index.php/',

    /*
     * init
     * Initialises the js application
     */
    init:function(){
        //remove default pop onload (if js available)
        this.close();
        var that = this;

        this.spinner = new Spinner(this.spinnerOpts)

        //if a graph is saved to webstorage load graph and display
        $('#saved').attr('class',sessionStorage["saved"]);
        if(sessionStorage["graph"]!==undefined&&sessionStorage["graph"]!==null){
            this.graph = $.parseJSON(sessionStorage["graph"]);
            Painter.paint(Dispatcher.graph);
            Writer.write(Dispatcher.graph);
            Highlighter.highlight();
            this.setFontBtns();

            sessionStorage.clear();
        }
        
        this.addEventListeners();

    },

    /*
     * closeDown
     * stores any current graph
     * so it can be later retrieved
     */
    closeDown:function(){
        if(this.graph!==null){
            sessionStorage["graph"] = JSON.stringify(this.graph);
            sessionStorage["saved"] = $('#saved').attr('class');
        }
    },

    /*
     * addEventListeners
     * adds all event listeners
     */
    addEventListeners:function(){
        var that = this;
        //make text_panel draggable and fox focux on text_efitor
        $('#text_panel').draggable({handle:'#handle',containment:'body'});
        
        //remove any previously added listeners
        Dispatcher.removeEventListeners();
        
        //assign click events to all control panel buttons
        $('.control').bind('click',function(e){
            e.preventDefault();
            var id = $(this).attr('id');
            Dispatcher[id]();
        });

        //add event listener for drag events to update graph
        $('#drawing_panel .object').bind( "dragstop", function(event, ui) {
            var x = $(this).position().left;
            var y = $(this).position().top;
            var currentId = $(this).attr('id');

            currentId = currentId.substring(6,currentId.length);
            currentId = parseInt(currentId);
            
            Dispatcher.graph.vertices[currentId].x = x;
            Dispatcher.graph.vertices[currentId].y = y;

            $(this).removeClass('initial');
            $(this).addClass('moved');

            //set to unsaved
            $('#saved').attr('class','unsaved');
        });

        //open and close text editor toggle
        $('#toggle').toggle(function() {
            $('#text_panel').height(0)
            $('#text_editor').hide();
            $('#padding').hide();
            $('#toggle').attr('class','up');
            //change class on #toggle to change arrow
        },function() {
            $('#text_panel').height(500);
            $('#text_editor').show();
            $('#padding').show();
            $('#toggle').attr('class','down');
            //change class on #toggle to change arrow
        });

        //account link
        $('#account').bind('click',function(event){
            event.preventDefault();
            that.account();
        });

        //limit length of title
        $('#title').bind('keydown',function(event){
            var codes = [8,37,38,39,40,13];

            if($.inArray(event.keyCode,codes)===-1){
                that.checkTitleLength(event);
            }
            
        });
    },

    /*
     * checkTitleLength
     * stops keydown event from entering text
     * if title is more than 25 chars long
     * @param <Event> event
     */
    checkTitleLength:function(event){
        if($('#title').text().length > 25){
            event.preventDefault();
        }
    },

    /*
     * removeEventListeners
     * removes all event listeners from controls
     */
    removeEventListeners:function(){
        $(".control").unbind('click');
    },

    /*
     * setFontBtns
     * set visual appearance of font buttons
     */
    setFontBtns:function(){
        switch(this.graph.fontSize){
            case 24:
                this.fontHuge();
                break;
            case 18:
                this.fontBig();
                break;
            case 14:
                this.fontMedium();
                break;
            case 10:
                this.fontSmall();
                break;
            default:
                break;
        }
    },

    /*
     * fontHuge
     * control, sets diagram box font size
     */
    fontHuge:function(){
        if(this.graph!==null){

            this.graph.fontSize=24;
            this.update();
            $('#fontSmall,#fontMedium,#fontBig').css('opacity',1);
            $('#fontHuge').css('opacity',0.7);

            $('#saved').attr('class','unsaved');
        }
    },

    /*
     * fontBig
     * control, sets diagram box font size
     */
    fontBig:function(){
        if(this.graph!==null){

            this.graph.fontSize=18;
            this.update();
            $('#fontSmall,#fontMedium,#fontHuge').css('opacity',1);
            $('#fontBig').css('opacity',0.7);

            $('#saved').attr('class','unsaved');
        }
    },

    /*
     * fontMedium
     * control, sets diagram box font size
     */
    fontMedium:function(){
        if(this.graph!==null){

            this.graph.fontSize=14;
            this.update();
            $('#fontSmall,#fontBig,#fontHuge').css('opacity',1);
            $('#fontMedium').css('opacity',0.7);

            $('#saved').attr('class','unsaved');
        }
    },

    /*
     * fontSmall
     * control, sets diagram box font size
     */
    fontSmall:function(){
        if(this.graph!==null){

            this.graph.fontSize=10;
            this.update();
            $('#fontMedium,#fontBig,#fontHuge').css('opacity',1);
            $('#fontSmall').css('opacity',0.7);

            $('#saved').attr('class','unsaved');
        }
    },

    /*
     * update
     * control, updates a diagram from text editor
     */
    update:function(){

        this.spinner.spin(this.target);

        var newGraph = Reader.read();
        Highlighter.highlight();
        this.graph = Assimilator.assim(this.graph, newGraph);
        this.graph.title = $('#title').text();
        ($('#shared').attr('checked'))?this.graph.shared=true:this.graph.shared=false;
        Painter.paint(this.graph);

        this.addEventListeners();

        $('#saved').attr('class','unsaved');

        this.spinner.stop();
    },

    /*
     * open
     * opens popup window
     * @param <html> content
     */
    open:function(content){
        $('#popup').removeClass('invisible').addClass('visible');
        $('#popup_contents').empty().html(content);
        $('#wrapper').css('opacity','0.8');
    },

    /*
     * close
     * closes popup window
     */
    close:function(){
        $('#popup').removeClass('visible').addClass('invisible');
        $('#wrapper').css('opacity','1');
    },

    /*
     * clearDefault
     * clear default value from an input
     * @param   <DOM Object>    el
     * @param   <String>        defaultString
     */
    clearDefault:function(el,defaultValue){
        if(defaultValue==el.attr('value'))el.attr('value',"");
    },

    /*
     * fresh
     * control, clears drawing panel and text editor
     * for new diagram
     */
    fresh:function(){
        $('#drawing_panel').empty();
        $('#text_editor').empty();
        this.graph = null;
        $('#title').text('untitled');
        $('#saved').attr('class','saved');
    },

    /*
     * print
     * control, prints a diagram
     */
    print:function(){
        this.spinner.spin(this.target);
        window.print();
        this.spinner.stop();
    },

    /*
     * confirmDelete
     * control, prompts user to confirm a delete operation
     */
    confirmDelete:function(){
        var that = this;
        this.open(
            '<p>are you sure you want to delete this diagram?</p><p><a id="deleteDiagram" class="btn" href="#">ok</a></p>'
        )
        $('#deleteDiagram').bind('click',function(event){
            event.preventDefault();
            that.deleteDiagram();
        })
    },

    /*
     * account
     * control, ajax request for accounts view
     */
    account:function(){
        var url = this.baseURL+"accounts";
        var that = this;
        var dataType = "html";
        var data = undefined;
        var onError = "could not account options";

        this.spinner.spin(this.target);
        this.async(url,dataType,data,function(data){
            that.open(data);
            that.spinner.stop();
        },onError);
    },

    /*
     * deleteDiagram
     * control, ajax request to delete current diagram
     */
    deleteDiagram:function(){
        var that = this;
        if(this.graph!==null){

            if(this.graph.id===null){
                that.open('this diagram has not yet been saved');
            }else{

                var diagramId = 'diagramId='+this.graph.id;
                var url = this.baseURL+"editor/delete/";          
                var dataType = "html";
                var data = diagramId;
                var onError = "could not delete diagram";

                this.spinner.spin(this.target);
                this.async(url,dataType,data,function(data){
                    that.open(data);
                    that.fresh();
                    $('#saved').attr('class','saved');

                    that.spinner.stop();
                },onError);
            }
        }else{
            that.open('<p>there is no diagram to delete</p>')
        }
    },

    /*
     * load
     * control, ajax request for current user diagram list
     */
    load:function(){
        var url = this.baseURL+"editor/diagrams";
        var that = this;
        var dataType = "html";
        var data = undefined;
        var onError = "could not load diagrams";

        this.spinner.spin(this.target);
        this.async(url,dataType,data,function(data){
            that.open(data);
            $('#popup_contents ul li a').bind('click',function(e){
                e.preventDefault();
                Dispatcher.loadGraph($(this).attr('id'),true);
            });
            that.spinner.stop();
        },onError);
    },

    /*
     * loadShared
     * ajax request for sharing user diagram list
     * @param <String> sharer
     */
    loadShared:function(sharer){
        var url = this.baseURL+"editor/shared_diagrams";
        var that = this;
        var username = 'username='+sharer;
        var dataType = "html";
        var data = username;
        var onError = "could not open graph";

        this.spinner.spin(this.target);
        this.async(url,dataType,data,function(data){
            that.open(data);
            $('#popup_contents ul li a').bind('click',function(e){
                e.preventDefault();
                Dispatcher.loadGraph($(this).attr('id'),true);
                $('#saved').attr('class','unsaved');
            });
            that.spinner.stop();
        },onError);
    },

    /*
     * sharing
     * control, ajax request for sharing view
     */
    sharing:function(){
        var url = this.baseURL+"sharing";
        var that = this;
        var dataType = "html";
        var data = undefined;
        var onError = "could not load sharing options";

        this.spinner.spin(this.target);
        this.async(url,dataType,data,function(data){

            that.open(data);

            $('#popup #shareSearch').submit(function(){return false;});

            var defaultValue = $('#popup #search').attr('value');

            $('#popup #search').bind('focus',function(event){
                that.clearDefault($(this),defaultValue);
            });

            $('#popup #search').bind('keyup',function(event){
                var codes = [8,37,38,39,40];
                if($.inArray(event.keyCode,codes)===-1){
                    that.liveSearch($(this));
                }
            });

            $('#popup .sharer').bind('click',function(event){
                event.preventDefault();
                that.loadShared($(this).parent().attr('id'));

            });

            $('#popup .unshare').bind('click',function(event){

                event.preventDefault();
                that.unshare($(this).parent().attr('id'));
            });

            $('#popup .reject').bind('click',function(event){

                event.preventDefault();
                that.reject($(this).parent().attr('id'));
            });

            that.spinner.stop();
            
        },onError);
    },

    /*
     * unshare
     * control, ajax request to revoke sharing
     * on a user
     * @param <String> shared
     */
    unshare:function(shared){
        var url = this.baseURL+"sharing/unshare";
        var that = this;
        var username = 'username='+shared;
        var dataType = "html";
        var data = username;
        var onError = "could not unshare";

        this.spinner.spin(this.target);
        this.async(url,dataType,data,function(data){
            that.sharing();
            that.spinner.stop();
        },onError);
    },

    /*
     * reject
     * control, ajax request to reject sharing
     * from a user
     * @param <String> sharer
     */
    reject:function(sharer){
        var url = this.baseURL+"sharing/reject";
        var that = this;
        var username = 'username='+sharer;
        var dataType = "html";
        var data = username;
        var onError = "could not reject this share";

        this.spinner.spin(this.target);
        this.async(url,dataType,data,function(data){
            that.sharing();
            that.spinner.stop();
        },onError);
    },

    /*
     * liveSearch
     * ajax request search for a user
     * @param <String> input
     */
    liveSearch:function(input){
        var that = this;
        var search = 'search='+input.val();
        var url = this.baseURL+"sharing/user";
        var dataType = "html";
        var data = search;
        var onError = "could not perform search";
        
        this.async(url,dataType,data,function(data){

            if(data!==''){
                input.val(data);
                $('#popup #searchBtn').attr('class','enabled');
                //enable search submit
                $('#popup #shareSearch').submit(function() {
                    that.share(data);
                    return false;
                });
            }else{
                $('#popup #searchBtn').attr('class','disabled');
                $('#popup #shareSearch').unbind('submit');
                $('#popup #shareSearch').submit(function(){return false;});
            }
            
        },onError);
    },

    /*
     * share
     * ajax request to share with a user
     * @param <String> match
     */
    share:function(match){       
        var url = this.baseURL+"sharing/share";
        var that = this;
        var username = 'username='+match;
        var dataType = "html";
        var data = username;
        var onError = "could not share with this user";

        this.spinner.spin(this.target);
        this.async(url,dataType,data,function(data){
            that.sharing();
            that.spinner.stop();
        },onError);
    },

    /*
     * loadGraph
     * ajax request to load a specific diagram
     * @param <String> id
     * @param <String> shared
     */
    loadGraph:function(id,shared){
        var url = this.baseURL+"editor/load/"+id;
        var that = this;
        $('#saved').attr('class','saved');      

        this.graph = null;
        Painter.graph = null;
        var dataType = "json";
        var data = undefined;
        var onError = "graph could not be loaded";

        this.spinner.spin(this.target);
        this.async(url,dataType,data,function(data){
            that.graph = data;

            Painter.paint(Dispatcher.graph);
            Writer.write(Dispatcher.graph);
            Highlighter.highlight();
            that.setFontBtns();
            (Dispatcher.graph.shared)?$('#shared').attr('checked','checked'):$('#shared').attr('checked','unchecked');

            Dispatcher.addEventListeners();
            Dispatcher.close();

            that.spinner.stop();
            
        },onError);
    },

    /*
     * save
     * control, ajax request to save a diagram
     */
    save:function(){
        var that = this;
        
        if(this.graph!==null){
            var url = this.baseURL+"editor/save";
            this.update();
            this.graph.title = $('#title').text();
            var gString = JSON.stringify(Dispatcher.graph);
            var dataType = "json";
            var data = {graph:gString};
            var onError = "graph could not be saved";

            this.spinner.spin(this.target);
            this.async(url,dataType,data,function(data){

                if(data['message']!==undefined){
                    /*
                     * fix for demonstration save bug
                     * if not logged in server returns 'not available'
                     * and no diagram id is returned
                     * if we try to set it, graph.id becomes undefined
                     */
                    if(data['diagramId']!==undefined){
                        that.graph.id = data['diagramId'];
                    }
                    that.open(data['message']);
                    if(data['message']==='saved'){
                        $('#saved').attr('class','saved');
                    }
                }
                that.spinner.stop();
                
            },onError);
            
        }else{
            that.open('<p>there is no graph to save</p>');
        }
    },

    /*
     * docs
     * control, ajax request for documentation view
     */
    docs:function(){
        var url = this.baseURL+"documentation";
        var that = this;
        var dataType = "html";
        var data = undefined;
        var onError = "could not open documentation";

        this.spinner.spin(this.target);
        this.async(url,dataType,data,function(data){
            that.open(data);
            that.spinner.stop();
        },onError);
    },

    /*
     * asyc
     * makes ajax calls to server
     * @param   <String>    url
     * @param   <String>    dataTrype
     * @param   <String>    data
     * @param   <function>  successHandler
     * @param   <String>    enError
     */
    async:function(url,dataType,data,successHandler,onError){
        var that = this;
        $.ajax({
            type: "POST",
            url: url,
            dataType: dataType,
            data:data,
            success:successHandler,
            error:function(data){
                that.open('<p>'+onError+'</p>');
                that.spinner.stop();
            }
        });
    }
}
