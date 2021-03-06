/*! prevnext plugin for Cycle2;  version: BETA-20120910 */
(function($) {
"use strict";

$.extend($.fn.cycle.defaults, {
    next:           '> .cycle-next',
    nextEvent:      'click.cycle',
    disabledClass:  'disabled',
    prev:           '> .cycle-prev',
    prevEvent:      'click.cycle',
    swipe:          false
});    

$(document).on( 'cycle-initialized', function( e, opts ) {
    opts.API.getComponent( 'next' ).off( opts.nextEvent ).on( opts.nextEvent, function(e) {
        e.preventDefault();
        opts.API.next();
    });

    opts.API.getComponent( 'prev' ).off( opts.prevEvent ).on( opts.prevEvent, function(e) {
        e.preventDefault();
        opts.API.prev();
    });

    if ( opts.swipe ) {
        opts.container.on( 'swipeleft.cycle', function() {
            opts.API.next();
        });
        opts.container.on( 'swiperight.cycle', function() {
            opts.API.prev();
        });
    }
});

$(document).on( 'cycle-update-view', function( e, opts, slideOpts, currSlide ) {
    if ( opts.allowWrap )
        return;

    var cls = opts.disabledClass;
    var next = opts.API.getComponent( 'next' );
    var prev = opts.API.getComponent( 'prev' );
    var prevBoundry = opts._prevBoundry || 0;
    var nextBoundry = opts._nextBoundry || opts.slideCount - 1;

    if ( opts.currSlide == nextBoundry )
        next.addClass( cls ).prop( 'disabled', true );
    else
        next.removeClass( cls ).prop( 'disabled', false );

    if ( opts.currSlide === prevBoundry )
        prev.addClass( cls ).prop( 'disabled', true );
    else
        prev.removeClass( cls ).prop( 'disabled', false );
});


$(document).on( 'cycle-destroyed', function( e, opts ) {
    $( opts.next ).off( opts.nextEvent );
    $( opts.prev ).off( opts.prevEvent );
    opts.container.off( 'swipeleft.cycle swiperight.cycle' );
});

})(jQuery);
