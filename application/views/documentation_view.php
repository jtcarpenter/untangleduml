<div id="documentation">
    <h2>Documentation</h2>
    <p>
        UML class diagrams are defined in the text editor.
        Describe the diagram using the correct syntax, as explained below.
        <br><br>
        Click 'update' and the diagram will be drawn in the drawing panel.
        Drag the elements to re-arrange the diagram.
    </p>
    <table>
        <tr>
            <th>
                Class Example
            </th>
            <th>
                
            </th>
        </tr>

        <tr>
            <td>
                Classes must be contained within '{' '}'.<br><br>
                Classes must contain a name, ending with a '/'.<br><br>
                Abstract classes can be defined by beginning the name with a '/', otherwise class names must begin with a letter.<br>
                Attributes must be followed with a ';'.<br><br>
                Methods must be followed by '();'. Brackets can contains arguments.<br><br>
                Return values can be defined after brackets beginning with ':', and ending with ':', instead of the usual ';'.<br><br>
                Stereotypes can be defined by wrapping them in '<<' '>>'.
            </td>
            <td>
                <span class="invalid">
                <span class="valid">{<br>
                <span class="stereotype">&lt;&lt;stereotype&gt;&gt;</span><br>
                <span class="names">Class</span>/<br>
                <span class="id">-attribute</span>;<br>
                <span class="id">-attribute</span>;<br>
                <span class="id">+method()</span>;<br>
                <span class="id">+method(arg):returnValue</span>:<br>
                }</span>
                </span>
            </td>
        </tr>

        <tr>
            <th>
                Relationship Example
            </th>
            <th>

            </th>
        </tr>

        <tr>
            <td>
                Relationships must contain the names of the associated classes wrapped in '[' ']'.<br><br>
                Multiplicity can be defined by wrapping inside '(' ')', alongside the class names.<br><br>
                Relationship types must be specified.<br><br>
                Optional roles can be defined within '(' ')'<br><br>
                Roles defined on dependencies will be understood to be stereotypes.
            </td>
            <td>
                <span class="invalid">
                <span class="valid">
                [<span class="names">Class</span>(<span class="id">1</span>)]
                <span class="reserved">hasa</span>(<span class="id">role</span>)
                [<span class="names">Klass</span>(<span class="id">0..*</span>)]
                </span>
                </span>
            </td>
        </tr>

        <tr>
            <th>
                Relationship Types
            </th>
            <th>

            </th>
        </tr>

        <tr>
            <td>
                Unidirectional association<br>
                Inheritance relationship<br>
                bi-directional association<br>
                composition relationship<br>
                aggregation relationship<br>
                dependency relationship<br>
            </td>
            <td>
                hasa<br>
                isa<br>
                bi<br>
                comp<br>
                aggr<br>
                dep<br>
            </td>
        </tr>
    </table>
</div>