(function( window ) {

'use strict';

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

window.classie = classie;

})( window );

function hasParentClass( e, classname ) {
    if(e === document) return false;
    if( classie.has( e, classname ) ) {
        return true;
    }
    return e.parentNode && hasParentClass( e.parentNode, classname );
}


function SidebarMenuEffects() {

    var container = document.querySelector( '#st-container' ),
                reset = document.getElementById( 'closeMenu' ),
        button = document.querySelector('#showFilter'),
        // event type (if mobile use touch events)
        eventtype ='touchstart',
        resetMenu = function() {
            classie.remove( container, 'st-menu-open' );
        },
        bodyClickFn = function(evt) {
            if( !hasParentClass( evt.target, 'st-menu' ) ) {
                resetMenu();
                document.removeEventListener( eventtype, bodyClickFn );
            }
        },
        resetClickFn = function(evt) {
            if (evt.target == reset) {
                resetMenu();
                document.removeEventListener(eventtype, bodyClickFn);
            }
        };

        var effect = button.getAttribute( 'data-effect' );
        button.addEventListener( eventtype, function( ev ) {
            ev.stopPropagation();
            ev.preventDefault();
            container.className = 'st-container'; // clear
            classie.add( container, effect );
            setTimeout( function() {
                classie.add( container, 'st-menu-open' );
            }, 25 );
            document.addEventListener( eventtype, bodyClickFn );
            document.addEventListener( eventtype, resetClickFn );
        });


}

export default SidebarMenuEffects;