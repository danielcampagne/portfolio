///// Percentage of visible project

$.fn.ratioVisible = function() {
	var returnValue;
	var $win = $(window),
		wh = $win.height(),
		vp = {
			top: $win.scrollTop(),
			bottom: wh
		},
	  $el = $(this),
	  elbox = $el.offset();
	vp.bottom +=vp.top;
	elbox.bottom = elbox.top + $el.height();
	if(elbox.bottom >= vp.top && elbox.top <= vp.bottom) {
		if(elbox.bottom < vp.bottom) {
			returnValue = (elbox.bottom-vp.top) / wh;
			return returnValue;
		} else if(elbox.top > vp.top) {
			returnValue = (vp.bottom-elbox.top) / wh;
			return returnValue;
		}
	  return 1;
	}
	return 0;
}