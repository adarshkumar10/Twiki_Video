
 
(function(){


/******* Action to make input field for search empty on click in it********/

$('#txt-search').on('click focusin', function() { 
    this.value = '';
});

$('#txt-search').val('');      /* Making Text field for Search Empty on page Load */ 


//oadInitialPlayList(playListData);    /* Loading initialData in playList */



var loadData=[];     /* Global Array to Add search based data to playList */

var counter = 0;
    var s = $("#counter");
    var pos = s.position();
    $(window).scroll(function () {
        var windowpos = $(window).scrollTop();
       // s.html("Distance from top:" + pos.top + "<br />Scroll position: " + windowpos);
        if (windowpos >= pos.top) {
            s.addClass("stick");
			
        } else {
            s.removeClass("stick");
			
        }
    });

				
				/********** Dynamically loading content to video player by clicking on playList Item **********/	
				
				$('body').on('click','div.video' ,function(){
					$('#videoDetails').empty();
					$('#videoDetails').append($("<h2></h2>").text($(this).find('h4').text()));
						for( var i=0;i<descArray.length;i++){
								if(descArray[i].id == $(this).find('p').attr('id')){
										$('#videoDetails').append($("<h4></h4>").text(descArray[i].data));
								}
						}
						
						for(var i=0;i<playListData.length;i++){
								if(playListData[i].id == $(this).find('p').attr('id')){
										$('#playVideo').get(0).pause();
										$('#playVideo').find('source').attr("src", playListData[i].videoURL);
										$('#playVideo').load();	
								}
						}
				});	
				
				
				/*********** Defualt video in HTML Player **************/
				
				loadInitialPlayList(playListData);

		
		
		/********* Click event for Search Button***********/
		
		$('#srchBtn').click(function(){
					var searchField = $('#txt-search').val();
						$('#txt-search').focusout();
						 if(searchField === '')  {
							loadPlayList(playListData,"blankSearch");
	
						}else
						{
								loadData=[];
								var regex = new RegExp(searchField, "i");
								$.each(playListData, function(key, val){
								if ((val.title.search(regex) != -1 || val.desc.search(regex) != -1)) {
										loadData.push(val);
										$('#txt-search').val('');
									}
									
							});	
							loadPlayList(loadData,"");
						}
		
					
		
		});
		
		
		/********* Click Event for Show MOre Button At bottom of Playlist*********/
		
		$('body').on('click','button.showMore',function (){
				$('#txt-search').focus();
		
		});

	
})();



/***************  Function to oad PLayList based on Search *****************/
function loadPlayList(playListData_,type){
			$('#playList').empty();
			if(type == "blankSearch")
					loadInitialPlayList(playListData_);
			else{
						loadDataInPlayer(playListData_[0]);
						for(var i=0;i <playListData_.length;i++){
							var div =$("<div class='w3-hover-shadow w3-hover-white playlistCardContainer' ></div>");
							var dataDiv = $("<div class='w3-card-4  w3-margin w3-padding video playlistCard' ></div>"); 
							var title = $("<h5>"+playListData_[i].title+"</h5>");
							var desc = $("<p class='w3-left-align' id='"+playListData_[i].id+"'>"+playListData_[i].desc+"</p>");
							var img = $("<img src='"+playListData_[i].image+"' />");
								dataDiv.append($(img));		
								dataDiv.append($(title));
								dataDiv.append($(desc));
								div.append($(dataDiv));
								$('#playList').append($(div));
						}
						$('#playList').append($("<button class='w3-btn showMore' id='searchShowMore' >Show More</button>"));
				}		
				
}	

/****************** Function to initially load data in PlayList******************/
function loadInitialPlayList(playListData_){
			$('#playList').empty();
			loadDataInPlayer(playListData_[0]);
		for(var i=0;i <10;i++){
					var div =$("<div class='w3-hover-shadow w3-hover-white playlistCardContainer' ></div>");
					var dataDiv = $("<div class='w3-card-4  w3-margin w3-padding video playlistCard' ></div>"); 
					var index = Math.floor(Math.random() * 10) + 1 ; 
					var title = $("<h5>"+playListData_[index].title+"</h5>");
					var desc = $("<p class='w3-left-align' id='"+playListData_[index].id+"'>"+playListData_[index].desc+"</p>");
					var img = $("<img src='"+playListData_[index].image+"' />");
						dataDiv.append($(img));		
						dataDiv.append($(title));
						dataDiv.append($(desc));
						div.append($(dataDiv));
						$('#playList').append($(div));
				}
				$('#playList').append($("<button class='w3-btn showMore' >Show More</button>"));
				
}	

function loadDataInPlayer(dataObj){
$('#videoDetails').empty();
$('#playVideo').find('source').attr("src", dataObj.videoURL);
				$('#playVideo').load();
				$('#videoDetails').append($("<h2></h2>").text(dataObj.title));
				$('#videoDetails').append($("<h4></h4>").text(dataObj.desc));

}