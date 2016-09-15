var Conversations=function(){var b="",m=[],q=void 0,r=void 0,d="",g=[],l=[],p={},h=void 0,u=!1,v=!1,n=[];$(function(){var a=function(k){jsGrid.Field.call(this,k)},e=function(k){jsGrid.Field.call(this,k)},c=function(k){jsGrid.Field.call(this,k)};a.prototype=new jsGrid.Field({sorter:function(k,a){return new Date(k)-new Date(a)},itemTemplate:function(a){return(new Date(a)).toLocaleString()},insertTemplate:function(a){return""},editTemplate:function(a){return""},insertValue:function(){return""},editValue:function(){return""}});
$("#onlyMyConversations").click(function(){u=$(this).is(":checked");f()});$("#includeDeleted").click(function(){v=$(this).is(":checked");f()});e.prototype=new jsGrid.Field({sorter:function(a,c){return 0},itemTemplate:function(a,c){if("importing"in c){var b=c.stageProgress.numerator,e=c.stageProgress.denominator,d=c.stageProgress.name;return $("<div/>").append($("<progress/>",{value:b,max:e,text:sprintf("%s out of %s",b,e)})).append($("<div/>",{text:d}))}return w(c)?$("<a/>",{href:sprintf("/editConversation?conversationJid=%s",
c.jid),text:"Edit"}):""},insertTemplate:function(a){return""},editTemplate:function(a){return""},insertValue:function(){return""},editValue:function(){return""}});c.prototype=new jsGrid.Field({sorter:function(a,c){return 0},itemTemplate:function(a,c){if("importing"in c){var b=c.overallProgress.numerator,e=c.overallProgress.denominator,d=c.overallProgress.name;return $("<div/>").append($("<progress/>",{value:b,max:e,text:sprintf("%s out of %s",b,e)})).append($("<div/>",{text:d}))}return a},insertTemplate:function(a){return""},
editTemplate:function(a){return""},insertValue:function(){return""},editValue:function(){return""}});jsGrid.fields.dateField=a;jsGrid.fields.editConversationField=e;jsGrid.fields.joinConversationField=function(a){jsGrid.Field.call(this,a)};jsGrid.fields.conversationSharingField=c;h=$("#conversationsDataGrid");h.jsGrid({width:"100%",height:"auto",inserting:!1,editing:!1,sorting:!0,paging:!0,noDataContent:"No conversations match your query",rowClick:function(a){"jid"in a.item&&!("importing"in a.item)&&
(window.location.href=sprintf("/board?conversationJid=%s&unique=true",a.item.jid))},controller:{loadData:function(a){if("sortField"in a){var c=_.sortBy(n,function(c){return c[a.sortField]});u&&(c=_.filter(c,function(a){return a.author==b}));"sortOrder"in a&&"desc"==a.sortOrder&&(c=_.reverse(c));return c}return n}},pageLoading:!1,fields:[{name:"lifecycle",type:"text",title:"Lifecycle",readOnly:!0,itemTemplate:function(a,c){var b=$("<span/>");switch(a){case "deleted":b.addClass("deletedConversationTag").text("archived");
break;case "new":b.addClass("newConversationTag").text("new");break;default:b.text("")}return b}},{name:"title",type:"text",title:"Title",readOnly:!0},{name:"creation",type:"dateField",title:"Created"},{name:"author",type:"text",title:"Author",readOnly:!0},{name:"subject",type:"conversationSharingField",title:"Sharing",readOnly:!0},{name:"edit",type:"editConversationField",title:"Edit",sorting:!1,width:30,css:"gridAction"}]});h.jsGrid("sort",{field:"creation",order:"desc"});$("#activeImportsListing").hide();
$("#importConversationInputElementContainer").hide();$("#showImportConversationWorkflow").click(function(){$("#importConversationInputElement").click()});$("#importConversationInputElement").fileupload({dataType:"json",add:function(a,c){$("#importConversationProgress").css("width","0%");$("#importConversationProgressBar").show();$("#activeImportsListing").show();c.submit()},progressall:function(a,c){var b=parseInt(c.loaded/c.total*100,10)+"%";$("#importConversationProgressBar").css("width",b)},done:function(a,
c){$.each(c.files,function(a,c){$("<p/>").text(c.name).appendTo(document.body)});$("#importConversationProgress").fadeOut()}});q=$("#conversationContainerListing");q.find(".conversationContainer").clone();q.empty();r=$("#activeImportsListing");r.find(".importContainer").clone();r.empty();a=$("#conversationSearchBox");p=$("<input/>",{type:"text",val:d});a.append(p);p.on("keydown",function(a){var c=$(this).val();query=c;13==a.keyCode&&t(c)});$("#createConversationButton").on("click",function(){var a=
sprintf("%s at %s",b,(new Date).toString());createConversation(a)});$("#searchButton").on("click",function(){t(query)})});var w=function(a){return a.author==b||_.some(m,function(a){var c=a.name?a.name:a.value;return"special"==(a.key?a.key:a.type)&&"superuser"==c})},x=function(a){var e=a.subject.toLowerCase().trim(),c=a.title.toLowerCase().trim();a=a.author;return(d==a||-1<c.indexOf(d))&&("deleted"!=e||v&&a==b)&&(a==b||_.some(m,function(a){var c=a.name?a.name:a.value;return"special"==(a.key?a.key:
a.type)&&"superuser"==c||c.toLowerCase().trim()==e}))},f=function(){var a=_.filter(_.map(l,function(a){return"result"in a&&"a"in a.result?{importing:!0,title:sprintf("%s - %s - %s","import failure",a.name,a.a),author:a.author,jid:a.id,newConversation:!0,creation:(new Date).getTime(),overallProgress:a.overallProgress,stageProgress:a.stageProgress}:"result"in a&&"b"in a.result?(a=a.result.b,!("creation"in a)&&"created"in a&&_.isNumber(a.created)&&(a.creation=a.created,a.created=new Date(a.creation)),
a.newConversation=!0,a):{lifecycle:"new",importing:!0,title:a.name,author:a.author,jid:a.id,newConversation:!0,creation:(new Date).getTime(),overallProgress:a.overallProgress,stageProgress:a.stageProgress}}),function(a){return"importing"in a&&1==a.importing||!_.some(g,function(b){return b.jid==a.jid})}),b=(new Date).getTime()-18E5;n=_.map(_.concat(a,_.filter(g,x)),function(a){a.lifecycle="deleted"==a.subject?"deleted":a.creation>b?"new":"available";return a});void 0!=h&&(h.jsGrid("loadData"),a=h.jsGrid("getSorting"),
"field"in a&&h.jsGrid("sort",a));a=n;a=sprintf("%s result%s",a.length,1==a.length?"":"s");$("#conversationListing").find(".aggregateContainer").find(".count").text(a)},t=function(a){d=a.toLowerCase().trim();getSearchResult(d)};return{receiveUsername:function(a){b=a},receiveUserGroups:function(a){m=a},receiveConversationDetails:function(a){g=_.uniq(_.concat([a],_.filter(g,function(b){return b.jid!=a.jid})));console.log("currentSearchResults:",g,a);f()},receiveSearchResults:function(a){g=a;f()},receiveNewConversationDetails:function(a){a.newConversation=
!0;g.push(a);f()},receiveImportDescription:function(a){l=_.filter(l,function(b){return b.id!=a.id});l.push(a);f()},receiveImportDescriptions:function(a){l=a;f()},receiveQuery:function(a){d=a.toLowerCase().trim();p.val(d);f()},getConversationListing:function(){return n},getImportListing:function(){return l},getQuery:function(){return d},getUsername:function(){return b},getUserGroups:function(){return m},search:t,create:function(a){createConversation(a)},getUserGroups:function(){return m},getUsername:function(){return b}}}();
function augmentArguments(b){b[_.size(b)]=(new Date).getTime();return b}function serverResponse(b){}function receiveUsername(b){Conversations.receiveUsername(b)}function receiveUserGroups(b){Conversations.receiveUserGroups(b)}function receiveConversationDetails(b){Conversations.receiveConversationDetails(b)}function receiveConversations(b){Conversations.receiveSearchResults(b)}function receiveNewConversationDetails(b){Conversations.receiveNewConversationDetails(b)}
function receiveImportDescription(b){Conversations.receiveImportDescription(b)}function receiveImportDescriptions(b){Conversations.receiveImportDescriptions(b)}function receiveQuery(b){Conversations.receiveQuery(b)};
