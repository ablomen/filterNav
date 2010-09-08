# filterNav

A jQuery plugin that creates leveled/layered/filter navigation.

Demo is located on: [http://ablomen.nl/filternav/](http://ablomen.nl/filternav/)

Download: [ZIP](http://github.com/ablomen/filterNav/zipball/master) [TAR](http://github.com/ablomen/filterNav/tarball/master)

## Stats:

<table>
	<tr>
		<th>jQuery version</th>
		<td>1.4.2 or greater (might work on older versions too)</td>
	</tr>
	<tr>
		<th>Size</th>
		<td>18.2kB</td>
	</tr>
	<tr>
		<th>Size (Minified)</th>
		<td>12.6kB</td>
	</tr>
	<tr>
		<th>Tested in</th>
		<td>Firefox 3.6, Chromium 7, Internet Explorer 8, Safari 5, Android (1.5) Browser</td>
	</tr>
	<tr>
		<th>License</th>
		<td>BSD</td>
	</tr>
</table>


## Documentation:

First come some simple examples of usage per type of navigation, scroll down for the explanation of methods etc.

### Usage:

#### Radio box style:

	<ul class="filterNav" data-name="salesRentals" data-type="single">
		<li><a href="#" data-value="sales" data-checked="checked">Sales</a></li>
		<li><a href="#" data-value="rentals">Rentals</a></li>
	</ul>

	<script>$("filterNav").filterNav();</script>

Where:<br>
**data-name** is the name of the element<br>
**data-type** is the type of the element [single, multiple, range]<br>
**data-value** is the value of each item (if omitted, the text of the item will be used)<br>
**data-checked** states what element will be active by default (only one allowed)


#### Checkbox style:

	<ul class="filterNav" data-name="city" data-type="multiple">
		<li><a href="#" data-value="amsterdam" data-checked="checked">Amsterdam</a></li>
		<li><a href="#" data-value="den haag" data-checked="checked">Den Haag</a></li>
		<li><a href="#" data-value="rotterdam">Rotterdam</a></li>
		<li><a href="#" data-value="utrecht">Utrecht</a></li>
	</ul>

	<script>$("filterNav").filterNav();</script>

Where:<br>
**data-name** is the name of the element<br>
**data-type** is the type of the element [single, multiple, range]<br>
**data-value** is the value of each item (if omitted, the text of the item will be used)<br>
**data-checked** states what element(s) will be active by default (multiple allowed)


#### Range style - one value per item:

	<ul class="filterNav" data-name="rooms" data-type="range">
		<li><a href="#" data-value="1">1 rooms</a></li>
		<li><a href="#" data-value="2" data-checked="checked">2 rooms</a></li>
		<li><a href="#" data-value="3">3 rooms</a></li>
		<li><a href="#" data-value="4"data-checked="checked">4 rooms</a></li>
		<li><a href="#" data-value="5">5 rooms</a></li>
	</ul>
	
	<script>$("filterNav").filterNav();</script>

Where:<br>
**data-name** is the name of the element<br>
**data-type** is the type of the element [single, multiple, range]<br>
**data-value** is the value of each item<br>
**data-checked** states what element(s) will be active by default (you only need to set the first and last item you want checked, the items in between will be set automagicly)


#### Range style - a minimum and a maximum value per item:

	<ul class="filterNav" data-name="price" data-type="range">
		<li><a href="#" data-min-value="0" data-max-value="100000">&lt; 100.000</a></li>
		<li><a href="#" data-min-value="100000" data-max-value="200000" data-checked="checked">100.000 - 200.000</a></li>
		<li><a href="#" data-min-value="200000" data-max-value="300000">200.000 - 300.000</a></li>
		<li><a href="#" data-min-value="300000" data-max-value="400000">300.000 - 400.000</a></li>
		<li><a href="#" data-min-value="400000" data-max-value="500000" data-checked="checked">400.000 - 500.000</a></li>
		<li><a href="#" data-min-value="500000" data-max-value="99999999">&gt; 500.000</a></li>
	</ul>
	
	<script>$("filterNav").filterNav();</script>

Where:<br>
**data-name** is the name of the element<br>
**data-type** is the type of the element [single, multiple, range]<br>
**data-min-value** is the **minimum** value of each item (Will be used if the item is the first selected item)<br>
**data-max-value** is the **maximum** value of each item (Will be used if the item is the last selected item)<br>
**data-checked** states what element(s) will be active by default (you only need to set the first and last item you want checked, the items in between will be set automagicly)

### Functions & methods:

####$("selector").filterNav(options);

**Description:**<br>
Initializes a new instance of filterNav and/or returns the elements instance, if the selector matches multiple elements the first matched element's its instance will be returned<br>
The options argument is optional, an object, and can contain: {click: function ( ) { }, mouseOut: function ( ) { }, mouseOver: function ( ) { }}, this will set the callback functions of each event for all the matched elements.<br>
**Returns:**<br>
filterNav instance<br>

####$("selector").filterNav().init();

**Description:**<br>
(Re-)initializes the filterNav instance, this can be used when items are dynamically added/removed/changed<br>
**Returns**<br>
filterNav instance<br>

####$("selector").filterNav().serialize();

**Description**<br>
Serializes the value[s] of the filterNav instance for usage in get requests<br>
**Returns**<br>
A string with the serialization of the filterNav instance<br>

####$("selector").filterNav().val();

**Description**<br>
Returns an object with the value of the filterNav instance<br>
**Returns**<br>
a filterNav value object:
	{
		type:	"single/multiple/range",
		name:	"name of filterNav instance",
		value: 	// Depends: a string for single, an array for multiple or an object for range
	}

####$("selector").filterNav().val(CALLBACK);

**Description**<br>
Returns the result of a callback function with the value of the filterNav instance<br>
The callback function will recieve a filterNav value object (see above) as it's first argument<br>
**Returns**<br>
The result of the callback function

####$("selector").filterNav().click(CALLBACK);

**Description**<br>
Callback function to run when an item is clicked<br>
The callback function will recieve a filterNav value object (see above) as it's first argument<br>
**Returns**<br>
filterNav instance

####$("selector").filterNav().mouseOver(CALLBACK);

**Description**<br>
Callback function to run when the mouse hovers over an item<br>
The callback function will recieve a filterNav value object (see above) as it's first argument<br>
**Returns**<br>
filterNav instance

####$("selector").filterNav().mouseOut(CALLBACK);

**Description**<br>
Callback function to run when the mouse moves away from an item<br>
The callback function will recieve a filterNav value object (see above) as it's first argument<br>
**Returns**<br>
filterNav instance
