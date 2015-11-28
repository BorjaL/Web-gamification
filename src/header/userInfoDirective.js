header_module.directive("userInfo", function(){
	return{
		restrict: "EA",
		scope: {
			username: "@"
		},
		replace: true,
		template: "<a href='/{{username}}'>{{username}}</a>",
		link: function(scope, iElem, attrs){

		}
	};
});