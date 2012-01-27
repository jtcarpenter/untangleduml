/*
 * Language object literal
 *
 * Regular Expressions for describing
 * Domain specific language
 * @author Jason Carpenter
 */
var Language = {
    //matches and element
    ELEMENT_PHRASE:/\{[^{}]*\}/g,
    //matches a relationship 
    RELATIONSHIP_PHRASE:/\[[^\[\]]+\][A-Za-z]+(\([^\[\]]+\))?\[[^\[\]]+\]/g,
    //matches a stereotype
    STEREOTYPE_WORD:/(<<|&lt;&lt;)[a-zA-Z\s]+(>>|&gt;&gt;)/g,
    //matches a valid element name
    NAME_WORD:/\/?[A-Za-z][a-zA-Z-_0-9\:]*(?=\/)/g,
    //matches an attribute
    ATTRIBUTE_WORD:/[\-\+]?[a-zA-Z][a-zA-Z-_0-9:\[\]\{\}]*(?=;)/g,
    //matches a method
    METHOD_WORD:/[\-\+]?[_a-z][a-zA-Z-_0-9]*\([a-zA-Z,:]*\)((?=;)|:[A-Za-z-_0-9]+(?=:))/g,
    //matches end definition including any multiplicity
    END_WORD:/\[[A-Za-z][A-Za-z0-9-_:]*(\([0-9\.\*]+\))?\]/g,
    //matches multiplicity definition
    MULT_WORD:/[0-9\.\*]+(?=\))/g,
    //matches element name inside relationship
    END_NAME_WORD:/[A-Za-z][A-Za-z0-9-_\:]*(?=((\([0-9\.\*]*\))|\]))/g,
    //matches a relationship type with of without role
    REL_TYPE_WORD:/\]([A-Za-z0-9-_]+(\([A-Za-z0-9-_]+\))?(?=\[))/,
    //matches the type inside a type definition
    REL_TYPE_NAMES_WORD:/(hasa)|(isa)|(aggr)|(comp)|(dep)|(bi)/g,
    //matches role name in a relationship
    REL_TYPE_ROLE_WORD:/[A-Za-z-_:0-9]+/g,
    //matches an identifier inside a relationship
    REL_ID_WORD:/[a-zA-Z0-9\.\*\:]+(?=\))/g,
    //matches all reserved words and chars
    RESERVED_WORD:/((hasa)|(isa)|(aggr)|(comp)|(dep)|(bi))(?=\[|\()/g,
    //matches all identifiers
    ID_WORD:/([\-\+]?[a-zA-Z][a-zA-Z-_0-9:\[\]\{\}]*(?=;))|([\-\+]?[_a-z][a-zA-Z-_0-9]*\([a-zA-Z,:]*\)((?=;)|:[A-Za-z-_0-9]+(?=:)))|([a-zA-Z0-9\.\*\:]+(?=\)))/g,
    //matches special characters in the language
    SPECIAL_CHAR:/(\[|\]|\/(?!span)|{|}|;|(\((?!\);))|(\)(?!;)))/g
}