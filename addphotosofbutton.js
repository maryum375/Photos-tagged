addPhotosButton();

document.addEventListener('DOMNodeInserted', addButtonIfNonExists);

function addButtonIfNonExists(){
   var photosButton = document.getElementById('photos-of-extension'); 
   if (photosButton===null || getUserId() !== photosButton.getAttribute("target-id")){
		addPhotosButton();
   }
}

function addPhotosButton(){
	var btn = document.createElement ("a");
	btn.className="_6-6";
	btn.innerText="Photos Tagged";
	btn.setAttribute ("id","photos-of-extension");
	var targetId =getUserId();
	if (targetId === ""){
		return;
	}
	btn.setAttribute ("target-id",targetId);
	btn.setAttribute ("href","http://www.facebook.com/search/"+targetId+"/photos-of");
	var parentElement = document.querySelector ("#fbTimelineHeadline ._70k div");
	parentElement.insertBefore (btn,parentElement.children[parentElement.childNodes.length-1]);
}

function getUserId(){
   var pgletMainCol = document.getElementById('pagelet_timeline_main_column'); 

   if (pgletMainCol===null){
		return "";
   }
   var dataGt=pgletMainCol.getAttribute("data-gt");
   
   var re = new RegExp("\"profile_owner\":\"([0-9]+?)\"");
   var match = re.exec(dataGt);

   
    return match[1];
}