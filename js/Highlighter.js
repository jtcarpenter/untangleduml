/*
 * Highlighter
 *
 * Performs syntax highlighting on text editor
 * @author Jason Carpenter
 */
Highlighter = {
    html:'',
    txt:'',
    elements:[],
    names:[],
    lang:Language,

    /*
     * highlight
     * highlights text in text editor
     * by ading HTML
     */
    highlight:function(){
        this.html = $('#text_editor').html();
        this.txt = $('#text_editor').text();

        //strip all old highlighting
        this.names = [];
        this.stripOldHighlights();
        this.getNames();
        
        this.html = this.decodeHtmlSpecialChars();

        this.html = this.highlightNames(this.html);
        this.html = this.highlightEndWordMatches(this.html);
        this.html = this.highlightIds(this.html);
        this.html = this.highlightReserved(this.html);
        this.html = this.highlightStereotypes(this.html);

        this.html= this.cleanFalseMatches(this.html);

        this.html = this.encodeHtmlSpecialChars(this.html);

        $('#text_editor').html(this.html);
    },

    /*
     * cleanFalseMatches
     * highlighter will find false matches for attributes
     * on <s and >s which are not part of valid stereotype
     * this method stripe falsly added HTML
     * @return <HTML> newHtml
     */
    cleanFalseMatches:function(){
        var newHtml = this.html;
        //clean syntax error <stereotype>>
        newHtml = newHtml.replace(/(&<span class="id">lt<\/span>;([A-Za-z-_:]+)>>)/g,'&lt;$2>>');
        //clean syntax error <<stereotype>
        newHtml = newHtml.replace(/(<<([A-Za-z-_:]+)&<span class="id">gt<\/span>;)/g,'<<$2&gt;');
        //clean syntax error <stereotype>
        newHtml = newHtml.replace(/(&<span class="id">lt<\/span>;([A-Za-z-_:]+)&<span class="id">gt<\/span>;)/g,'&lt;$2&gt;');
        //clean syntax error stereotype>
        newHtml = newHtml.replace(/(&<span class="id">lt<\/span>;)/g,'&lt;');
        //clean syntax error <stereotype
        newHtml = newHtml.replace(/(&<span class="id">gt<\/span>;)/g,'&gt;');

        return newHtml;
    },

    /*
     * stripOldHighlights
     * strips all highlighting
     */
    stripOldHighlights:function(){
        this.html = this.html.replace(/<\/?span(\sclass="[a-zA-Z_]+")?[^>]*>/g,'');
    },

    /*
     * getNames
     * creates an array of all valid names in elements
     */
    getNames:function(){
        this.elements = this.txt.match(this.lang.ELEMENT_PHRASE);
        if(this.elements!==null){
            var names;
            for(var e=0;e<this.elements.length;e++){
                try{
                    names = this.elements[e].match(this.lang.NAME_WORD);
                    this.names.push(names[0]);
                }catch(e){
                    // element doesn't have a valid name'
                }
            }
        }
    },

    /*
     * decodeHtmlSpecialChars
     * replaces HMTL escapes &lt; and &gt; with < and >
     * @return <HTML> newHtml
     */
    decodeHtmlSpecialChars:function(){
        var newHtml = this.html;
        newHtml = newHtml.replace(/(&lt;&lt;)|(&gt;&gt;)/g,function(word){
            switch(word){
                case '&lt;&lt;':
                    return '<<';
                case '&gt;&gt;':
                    return '>>';
                default:
                    break;
            }
        });
        return newHtml;
    },

    /*
     * encodeHtmlSpecialChars
     * replaces < and > with HTML escapes &lt; and $gt;
     * @return <HTML> newHtml
     */
    encodeHtmlSpecialChars:function(){
        var newHtml = this.html;
        newHtml = newHtml.replace(/(<<)|(>>)/g,function(word){
            switch(word){
                case '<<':
                    return '&lt;&lt;';
                case '>>':
                    return '&gt;&gt;';
                default:
                    break;
            }
        });
        return newHtml;
    },

    /*
     * highlightStereotypes
     * @param   <HTML> src
     * @return  <HTML> newHtml
     */
    highlightStereotypes:function(src){
        var newHtml = src;
        newHtml = newHtml.replace(this.lang.STEREOTYPE_WORD,'<span class="stereotype">$&</span>');
        return newHtml;
    },

    /*
     * highlightEndWordMatches
     * @param   <HTML> src
     * @return  <HTML> newHtml
     */
    highlightEndWordMatches:function(src){
        var newHtml = src;
        newHtml = newHtml.replace(this.lang.END_NAME_WORD,function(word){
            if(Highlighter.names.indexOf(word)!==-1){
                return '<span class="names">'+word+'</span>';
            }else{
                return word;
            }
        });
        return newHtml;
    },

    /*
     * highlightNames
     * @param   <HTML> src
     * @return  <HTML> newHtml
     */
    highlightNames:function(src){
        var newHtml = src;
        newHtml = newHtml.replace(this.lang.NAME_WORD,'<span class="names">$&</span>');
        return newHtml;
    },

    /*
     * highlightIds
     * @param   <HTML> src
     * @return  <HTML> newHtml
     */
    highlightIds:function(src){
        var newHtml = src;
        newHtml = newHtml.replace(this.lang.ID_WORD,'<span class="id">$&</span>');
        return newHtml;
    },

    /*
     * highlightReserved
     * @param   <HTML> src
     * @return  <HTML> newHtml
     */
    highlightReserved:function(src){
        var newHtml = src;
        newHtml = newHtml.replace(this.lang.RESERVED_WORD,'<span class="reserved">$&</span>');
        return newHtml;
    }
}