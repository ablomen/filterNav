/*jslint onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, newcap: true, immed: true, strict: true */
"use strict";

//////////////////////////////////////////////////////////////////////////////////////
// filterNav
//
// Copyright (c) 2010, Alexander Blomen <info@ablomen.nl>			
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without modification,
// are permitted provided that the following conditions are met:
//
// * Redistributions of source code must retain the above copyright notice, this
//   list of conditions and the following disclaimer.
// * Redistributions in binary form must reproduce the above copyright notice, this
//   list of conditions and the following disclaimer in the documentation and/or 
//   other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND 
// ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED 
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
// IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, 
// INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT 
// NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
// PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, 
// WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE 
// POSSIBILITY OF SUCH DAMAGE.
//////////////////////////////////////////////////////////////////////////////////////

(function ($) {

	var filterSingle,	// Filter navigation, radiobox style
	    filterMultiple,	// Filter navigation, checkbox style
	    filterRange;	// Filter navigation, range select
	
	filterSingle	=	function (container) {
		var $container,		// jQuery object of the containing element
		    elName,		// value of data-name attribute
		    $items,		// jQuery object of the items
		    handlers,		// Object with all the event handlers
		    methods,		// Methods of the function
		    activate,		// Activate an item
		    deActivate,		// De-activate an item
		    callbacks;		// User-defined callbacks
		
		$container	=	$(container);
		callbacks	=	{};
		
		methods		=	{
			init:		function ( ) {
				$container.addClass("single");
				
				elName		=	$container.attr("data-name");
				$items		=	$container.find("a");
				
				activate($items.filter("[data-checked=checked]"));
				
				$items.unbind("mouseover, mouseout, click");
				$items.bind("mouseover", handlers.mouseOver);
				$items.bind("mouseout", handlers.mouseOut);
				$items.bind("click", handlers.click);
				
				return methods;
			},
			serialize:	function ( ) {
				var returnData;
				
				$items.each(function ( ) {
					var $this, value;
					
					$this	=	$(this);
					
					if ($this.attr("data-checked") === "checked") {
						value		=	$this.attr("data-value");
						
						if (!value) {
							value	=	$this.text();
						}
						
						returnData	=	elName + "=" + value;
					}
				});
				
				return returnData;
			},
			val:		function (callback) {
				var data, $active;
				
				$active	=	$items.filter("[data-checked=checked]");
				
				data	=	{
					"type":		"single",
					"name":		elName,
					"value":	$active.attr("data-value")
				};
				
				if (!data.value) {
					data.value	=	$active.text();
				}
				
				if (callback) {
					return callback(data);
				} else {
					return data;
				}	
			},
			click:		function (callback) {
				callbacks.click		=	callback;
				
				return methods;
			},
			mouseOver:	function (callback) {
				callbacks.mouseOver	=	callback;
				
				return methods;
			},
			mouseOut:	function (callback) {
				callbacks.mouseOut	=	callback;
				
				return methods;
			}
		};
		
		activate	=	function (el) {
			el
				.removeClass("hover single")
				.addClass("active single")
				.attr({"data-checked": "checked"});
		};
		
		deActivate	=	function (el) {
			el
				.removeClass("active single")
				.attr({"data-checked": ""});
		};
		
		handlers	=	{
			// mouseover event for items
			mouseOver:	function ( ) {
				var $this;
				
				$this	=	$(this);
				
				if (!$this.hasClass("active")) {
					$this.addClass("hover single");
				}
				
				if (callbacks.mouseOver) {
					methods.val(callbacks.mouseOver);
				}
			},
			// mouseout event for items
			mouseOut:	function ( ) {
				var $this;
				
				$this	=	$(this);
				
				if (!$this.hasClass("active")) {
					$this.removeClass("hover single");
				}
				
				if (callbacks.mouseOut) {
					methods.val(callbacks.mouseOut);
				}
			},
			// click event for items
			click:		function ( ) {
				var $this, $active;
				
				$this	=	$(this);
				$active	=	$container.find(".active");
				
				if (!$this.hasClass("active")) {
					activate($this);
					deActivate($active);
				}
				
				if (callbacks.click) {
					methods.val(callbacks.click);
				}
				
				return false;
			}
		};
		
		methods.init();
		
		return methods;
	};
	
	filterMultiple	=	function (container) {
		var $container,		// jQuery object of the containing element
		    elName,		// value of data-name attribute
		    $items,		// jQuery object of the items
		    handlers,		// Object with all the event handlers
		    methods,		// Methods of the function
		    activate,		// Activate an item
		    deActivate,		// De-activate an item
		    callbacks;		// User-defined callbacks
		
		$container	=	$(container);
		callbacks	=	{};
		
		methods		=	{
			init:		function ( ) {
				$container.addClass("multiple");
				
				elName		=	$container.attr("data-name");
				$items		=	$container.find("a");
				
				$items.filter("[data-checked=checked]").each(function ( ) {
					activate($(this));
				});
				
				$items.unbind("mouseover, mouseout, click");
				$items.bind("mouseover", handlers.mouseOver);
				$items.bind("mouseout", handlers.mouseOut);
				$items.bind("click", handlers.click);
				
				return methods;
			},
			serialize:	function ( ) {
				var returnData, first;
				
				returnData	=	"";
				first		=	true;
				
				$items.each(function ( ) {
					var $this, value;
					
					$this	=	$(this);
					
					if ($this.attr("data-checked") === "checked") {
						value		=	$this.attr("data-value");
						
						if (!value) {
							value	=	$this.text();
						}
						
						if (first) {
							first		=	false;
						} else {
							returnData	+=	"&";
						}
						
						returnData	+=	elName + "[]=" + value;
					}
				});
				
				return returnData;
			},
			val:		function (callback) {
				var data, $active;
				
				$active	=	$items.filter("[data-checked=checked]");
				
				data	=	{
					"type":		"multiple",
					"name":		elName,
					"value":	[]
				};
				
				$active.each(function ( ) {
					var value	=	$(this).attr("data-value");
					if (!value) {
						value	=	$(this).text();
					}
					data.value.push(value);
				});
				
				if (callback) {
					return callback(data);
				} else {
					return data;
				}	
			},
			click:		function (callback) {
				callbacks.click		=	callback;
				
				return methods;
			},
			mouseOver:	function (callback) {
				callbacks.mouseOver	=	callback;
				
				return methods;
			},
			mouseOut:	function (callback) {
				callbacks.mouseOut	=	callback;
				
				return methods;
			}
		};
		
		activate	=	function (el) {
			el
				.removeClass("hover single")
				.addClass("active single")
				.attr({"data-checked": "checked"});
		};
		
		deActivate	=	function (el) {
			el
				.removeClass("active single")
				.addClass("hover single")
				.attr({"data-checked": ""});
		};
		
		handlers	=	{
			mouseOver:	function ( ) {
				var $this;
				
				$this	=	$(this);
				
				if (!$this.hasClass("active")) {
					$this.addClass("hover single");
				}
				
				if (callbacks.mouseOver) {
					methods.val(callbacks.mouseOver);
				}
			},
			mouseOut:	function ( ) {
				var $this;
				
				$this	=	$(this);
				
				if (!$this.hasClass("active")) {
					$this.removeClass("hover single");
				}
				
				if (callbacks.mouseOut) {
					methods.val(callbacks.mouseOut);
				}
			},
			click:		function ( ) {
				var $this;
				
				$this	=	$(this);
				
				if ($this.hasClass("active")) {
					deActivate($this);
				} else {
					activate($this);
				}
				
				if (callbacks.click) {
					methods.val(callbacks.click);
				}
				
				return false;
			}
		};
		
		methods.init();
		
		return methods;
	};
	
	filterRange	=	function (container) {
		var $container,		// jQuery object of the containing element
		    elName,		// value of data-name attribute
		    $items,		// jQuery object of the items
		    handlers,		// Object with all the event handlers
		    methods,		// Methods of the function
		    activate,		// Activate an item
		    addClose,		// Create close button
		    callbacks;		// User-defined callbacks
		
		$container	=	$(container);
		callbacks	=	{};
		
		methods		=	{
			init:		function ( ) {
				var $start, $end, startIndex, endIndex, i;
				
				$container.addClass("range");
				
				elName		=	$container.attr("data-name");
				$items		=	$container.find("a");
				
				$start		=	$items.filter("[data-checked]:first");
				$end		=	$items.filter("[data-checked]:last");
				if ($start[0]) {
					startIndex	=	$items.index($start);
					endIndex	=	$items.index($end);
					
					if (startIndex === endIndex) {
						activate($start, "single");
					} else {
						activate($start, "top");
						for (i = startIndex + 1; i < endIndex; i+= 1) {
							activate($($items[i]), "middle");
						}
						activate($end, "bottom");
					}
					addClose();
				}
				
				$items.unbind("mouseover, mouseout, click");
				$items.bind("mouseover", handlers.mouseOver);
				$items.bind("mouseout", handlers.mouseOut);
				$items.bind("click", handlers.click);
				
				return methods;
			},
			serialize:	function ( ) {
				var $active, minVal, maxVal, $first, $last;
				
				$active	=	$container.find(".active");
				
				if ($active.length === 1) {
					minVal	=
					maxVal	=	$active.attr("data-value");
					
					if (!minVal) {
						minVal	=	$active.attr("data-min-value");
						maxVal	=	$active.attr("data-max-value");
					}
				} else {
					$first	=	$active.filter(":first");
					$last	=	$active.filter(":last");
					
					minVal	=	$first.attr("data-value");
					maxVal	=	$last.attr("data-value");
					
					if (!minVal) {
						minVal	=	$first.attr("data-min-value");
						maxVal	=	$last.attr("data-max-value");
					}
				}
				
				return elName + "-min=" + minVal + "&" + elName + "-max=" + maxVal;
			},
			val:		function (callback) {
				var data, $active, minVal, maxVal, $first, $last;
				
				$active	=	$items.filter("[data-checked=checked]");
				
				data	=	{
					"type":		"range",
					"name":		elName,
					"value":	{}
				};
				
				if ($active.length === 1) {
					minVal	=
					maxVal	=	$active.attr("data-value");
					
					if (!minVal) {
						minVal	=	$active.attr("data-min-value");
						maxVal	=	$active.attr("data-max-value");
					}
				} else {
					$first	=	$active.filter(":first");
					$last	=	$active.filter(":last");
					
					minVal	=	$first.attr("data-value");
					maxVal	=	$last.attr("data-value");
					
					if (!minVal) {
						minVal	=	$first.attr("data-min-value");
						maxVal	=	$last.attr("data-max-value");
					}
				}
				
				data.value.min	=	minVal;
				data.value.max	=	maxVal;
				
				if (callback) {
					return callback(data);
				} else {
					return data;
				}	
			},
			click:		function (callback) {
				callbacks.click		=	callback;
				
				return methods;
			},
			close:		function (callback) {
				callbacks.close		=	callback;
				
				return methods;
			},
			mouseOver:	function (callback) {
				callbacks.mouseOver	=	callback;
				
				return methods;
			},
			mouseOut:	function (callback) {
				callbacks.mouseOut	=	callback;
				
				return methods;
			}
		};
		
		activate	=	function (el, className) {
			el
				.removeClass("hover " + className)
				.addClass("active " + className)
				.attr({"data-checked": "checked"});
		};
		
		addClose	=	function ( ) {
			var $close, $active, top, position, height;
			
			$close		=	$("<div/>").addClass("close");
			$active		=	$container.find(".active");
			
			top		=	$active.filter(":first").offset().top - $container.offset().top;
			height		=	$active.filter(":first").outerHeight(true);
			
			$close.appendTo($container);
			position	=	top + (height * $active.length) / 2 - ($close.height() / 2);
			$close.css({top: position});
		};
		
		handlers	=	{
			mouseOver:	function ( ) {
				var $this, $active, thisIndex, activeIndex, i;
				
				$this	=	$(this);
				$active	=	$container.find(".active");
				
				if (!$active[0]) {
					$this.addClass("hover single");
				} else {
					if (!$this.hasClass("active") && $active.length === 1) {
						thisIndex	=	$items.index($this);
						activeIndex	=	$items.index($active);
						if (thisIndex > activeIndex) {
							$active
								.removeClass("single")
								.addClass("top");
							
							for (i = (activeIndex + 1); i < thisIndex; i += 1) {
								$items
									.filter(":eq(" + i + ")")
									.addClass("hover middle");
							}
							
							$this.addClass("hover bottom");
						} else {
							$active
								.removeClass("single")
								.addClass("bottom");
							
							for (i = (thisIndex + 1); i < activeIndex; i += 1) {
								$items
									.filter(":eq(" + i + ")")
									.addClass("hover middle");
							}
							
							$this.addClass("hover top");
						}
					}
				}
				
				if (callbacks.mouseOver) {
					methods.val(callbacks.mouseOver);
				}
				
			},
			mouseOut:	function ( ) {
				var $this, $active, thisIndex, activeIndex, i;
				
				$this	=	$(this);
				$active	=	$container.find(".active");
				
				if (!$active[0]) {
					$this.removeClass("hover single");
				} else {
					if (!$this.hasClass("active") && $active.length === 1) {
						thisIndex	=	$items.index($this);
						activeIndex	=	$items.index($active);
						if (thisIndex > activeIndex) {
							$active
								.removeClass("top")
								.addClass("single");
							
							for (i = (activeIndex + 1); i < thisIndex; i += 1) {
								$items
									.filter(":eq(" + i + ")")
									.removeClass("hover middle");
							}
							
							$this.removeClass("hover bottom");
						} else {
							$active
								.removeClass("bottom")
								.addClass("single");
							
							for (i = (thisIndex + 1); i < activeIndex; i += 1) {
								$items
									.filter(":eq(" + i + ")")
									.removeClass("hover middle");
							}
							
							$this.removeClass("hover top");
						}
					}
				}
				
				if (callbacks.mouseOut) {
					methods.val(callbacks.mouseOut);
				}
			},
			click:		function ( ) {
				var $this, $active, thisIndex, activeIndex, i;
				
				$this	=	$(this);
				$active	=	$container.find(".active");
				$container
					.find(".close")
					.remove();
				
				if (!$active[0]) {
					activate($this, "single");
					addClose();
				} else if (!$this.hasClass("active") && $active.length === 1) {
					thisIndex	=	$items.index($this);
					activeIndex	=	$items.index($active);
					if (thisIndex > activeIndex) {
						
						for (i = (activeIndex + 1); i < thisIndex; i += 1) {
							activate($items.filter(":eq(" + i + ")"), "middle");
						}
						
						activate($this, "bottom");
					} else {
						
						for (i = (thisIndex + 1); i < activeIndex; i += 1) {
							activate($items.filter(":eq(" + i + ")"), "middle");
						}
						
						activate($this, "top");
					}
					addClose();
				} else {
					$active
						.removeClass("active single top middle bottom")
						.attr({"data-checked": ""});
					
					activate($this, "single");
					
					addClose();
				}
				
				if (callbacks.click) {
					methods.val(callbacks.click);
				}
				
				return false;
			},
			clickClose:	function ( ) {
				$container
					.find(".active")
					.removeClass("active single top middle bottom")
					.attr({"data-checked": ""});
					
				$(this).remove();
				
				if (callbacks.click) {
					methods.val(callbacks.click);
				}
				
				if (callbacks.close) {
					methods.val(callbacks.close);
				}
				
				return false;
			}
		};
		
		$container.find(".close").live("click", handlers.clickClose);
		
		methods.init();
		
		return methods;
	};
	
	$.fn.filterNav	=	function ( ) {
		if (this.length > 1) {
			this.each(function ( ) {
				var $this;
				
				$this		=	$(this);
				
				if (!$this.data("filterNav")) {
					if ($this.attr("data-type") === "single") {
						$this.data("filterNav", filterSingle(this));
					} else if ($this.attr("data-type") === "multiple") {
						$this.data("filterNav", filterMultiple(this));
					} else if ($this.attr("data-type") === "range") {
						$this.data("filterNav", filterRange(this));
					}
				}
			});
			return $(this).filter(":first").data("filterNav");
		} else {
			var instance;
			
			instance	=	this.data("filterNav");
				
			if (instance) {
				return instance;
			} else {
				if (this.attr("data-type") === "single") {
					this.data("filterNav", filterSingle(this[0]));
				} else if (this.attr("data-type") === "multiple") {
					this.data("filterNav", filterMultiple(this[0]));
				} else if (this.attr("data-type") === "range") {
					this.data("filterNav", filterRange(this[0]));
				}
				return this.data("filterNav");
			}
		}
	};

}(jQuery));
