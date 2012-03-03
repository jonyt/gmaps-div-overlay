function DivOverlay(div, map, position) {

  // Now initialize all properties.
  this.div_ = div;
  this.map_ = map;
  this.position_ = position;	
	
  // Explicitly call setMap() on this overlay
  this.setMap(map);
}

DivOverlay.prototype = new google.maps.OverlayView();

DivOverlay.prototype.onAdd = function() {

  // Note: an overlay's receipt of onAdd() indicates that
  // the map's panes are now available for attaching
  // the overlay to the map via the DOM.

  // We add an overlay to a map via one of the map's panes.
  // We'll add this overlay to the overlayImage pane.
  var panes = this.getPanes();
  panes.overlayLayer.style['zIndex'] = 1000;
  panes.overlayLayer.appendChild(this.div_);
}

DivOverlay.prototype.draw = function() {

  // Size and position the overlay. We use a southwest and northeast
  // position of the overlay to peg it to the correct position and size.
  // We need to retrieve the projection from this overlay to do this.
  var overlayProjection = this.getProjection();

  // Retrieve the southwest and northeast coordinates of this overlay
  // in latlngs and convert them to pixels coordinates.
  // We'll use these coordinates to resize the DIV.
  var position = overlayProjection.fromLatLngToDivPixel(this.position_);  
  
  // Position the div  
  var div = this.div_;
  var horizontalOffset = 10;
  var verticalOffset = div.clientHeight + 10;
  div.style.position = 'absolute';  
  if ((position.x + this.div_.clientWidth + horizontalOffset) > this.map_.getDiv().clientWidth) {
	div.style.left = (this.map_.getDiv().clientWidth - this.div_.clientWidth - 20) + 'px';
  } else if (position.x < this.div_.clientWidth) {
	div.style.left = 10 + 'px';
  } else {
	div.style.left = position.x + horizontalOffset + 'px';
  }
  if ((position.y - verticalOffset) > this.map_.getDiv().clientHeight) {
	div.style.top = (this.map_.getDiv().clientHeight - verticalOffset) + 'px';
//console.log('1');
  } else if (position.y - verticalOffset < 0) {	
	div.style.top = position.y + 10 + 'px';
//console.log('2');
//console.log(position.y);
  } else {
	div.style.top = position.y - verticalOffset + 'px';
//console.log('3');
//console.log(position.y);
  }
}

DivOverlay.prototype.onRemove = function() {
  this.div_ = null;
}

// Note that the visibility property must be a string enclosed in quotes
DivOverlay.prototype.hide = function() {
  if (this.div_) {
    this.div_.style.visibility = "hidden";
  }
}

DivOverlay.prototype.show = function() {
  if (this.div_) {
    this.div_.style.visibility = "visible";
  }
}

DivOverlay.prototype.toggle = function() {
  if (this.div_) {
    if (this.div_.style.visibility == "hidden") {
      this.show();
    } else {
      this.hide();
    }
  }
}

DivOverlay.prototype.getDiv = function() {
  if (this.div_) {
    return this.div_;
  }
}

DivOverlay.prototype.destroy = function() {
  if (this.getMap()) {
    this.setMap(null);
  }
}
