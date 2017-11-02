var divList;
var ulTodo;
var maxValue = 25;

function setup() {
  divList = select('#list');
  ulTodo = select('#todoList');

  Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/1M-jY0VpUFAd7wHvhmSwAqWvgc9iWdtcHwqkg0awjsWg/pubhtml',
                   callback: function(data, tabletop) {
                     divList.html("");
                     var archivedProjects = [];
                     var outlinedProjects = [];
                     var todoProjects = [];
                      console.log(data);
                       for(let i=0,len=data.length;i<len;i++){
                         if(data[i].Archived=="TRUE"){
                           archivedProjects.push(data[i]);
                         }else{
                           if(data[i].hasOutline=="TRUE"){
                             outlinedProjects.push(data[i]);
                           } else {
                             todoProjects.push(data[i]);
                           }
                         }
                       }
                       console.log(outlinedProjects);
                       getValues(outlinedProjects);
                       getValues(todoProjects);
                       renderTodos(todoProjects);
                       renderOutlined(outlinedProjects);

                   },
                   simpleSheet: true } );
  // let seeds = seedData();
  //
  // let projectValues = getProjectValues(seeds);
  // renderValues(projectValues);
  noLoop();
  noCanvas();

}

function dataReturned(rawProjects){

}

function seedData(){
    let dataArray = [];
    for ( let i = 0 ; i < 10 ; i ++){
      let d = {};
 /*x1-2 */ d.dateCreated = 1+Math.random();
  //bool    -last modifed anything inactive for more than 3 months gets archived
      if(Math.random()>0.5){
        /*x1.1*/   d.easyMoney = 1.1;
      }else{
           d.easyMoney = 1;
      }
      if(Math.random()>0.5){
        /*x1.1 */  d.easyWork = 1.1;
      }else{
           d.easyWork = 1;
      }
      if(Math.random()>0.5){
        /*x1.2 */  d.interesting = 1.2;
      }else{
           d.interesting = 1;
      }
      if(Math.random()>0.5){
        /*x1.2*/   d.teamWork = 1.2;
      }else{
           d.teamWork = 1;
      }
      //bool    -already outlined (deal breaker)
      /*x1-2*/   d.dueDate = 1+Math.random();
      if(Math.random()>0.5){
        /*x1.5*/   d.tool = 1.5;
      }else{
           d.tool = 1;
      }
      if(Math.random()>0.5){
        /*x1.2*/   d.preReq = 1.2;
      }else{
           d.preReq = 1;
      }
      if(Math.random()>0.5){
        /*x2.0*/   d.paidWork = 2;
      }else{
           d.paidWork = 1;
      }
      dataArray.push(d);
    }
  return dataArray;
}

function sortProjects(rawProjects){
  if(Array.isArray(rawProjects)){
    for(let i=0,len=rawProjects.length;i<len;i++){
      if(rawProjects[i].Archived){
        archivedProjects.push(rawProjects[i]);
        break;
      }
      if(rawProjects[i].hasOutline){
        outlinedProjects.push(rawProjects[i]);
        break;
      } else {
        todoProjects.push(rawProjects[i]);
      }
    }
  }else{
    console.log(rawProjects);
  }
}

function getMultiplier(listString){
  let multipliers = listString.split(", ");
  let total = 1;
  for(let i=0,len=multipliers.length;i<len;i++){
    switch(multipliers[i]){
      case "Easily Monetized":
      case "Easily Completed":
        total *= 1.1;
        break;
      case "Interesting Domain":
      case "Prerequisite":
      case "Working with Others":
        total *= 1.2;
        break;
      case "Personal Tool":
        total *= 1.5;
        break;
      case "Paid Work":
        total *= 2;
        break;
      default:
        total *= 1;
        break;
    }
  }
  return total;
}

function checkAge(timestamp){
  let dateCreated = new Date(timestamp);
  let today    = new Date();
  let elaspedDays    = dateDiffInDays(dateCreated, today);
  if(elaspedDays<180){
    return map(elaspedDays, 0, 180, 1, 2);
  } else{
    return -1;
  }
}

function dateDiffInDays(a, b) {
  let _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  let utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  let utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function checkDueDate(date){
 let today = new Date();
 let dueDate = new Date(date);
 let remainingDays = dateDiffInDays(today,dueDate);
 if(remainingDays>180){
   return 1;
 }else{
   return map(remainingDays,180,0,1,2);
 }
}

function getValues(projArray){
  let row = 2;
  for ( let i=0, len=projArray.length; i < len; i++){
    projArray[i].value = 1;
    let age = checkAge(projArray[i].Timestamp);
    let urgency =1, multiplier=1;
    if(age>=0){
      if(projArray[i]["Due Date"]!==""){
        urgency = checkDueDate(projArray[i]["Due Date"]);
      }
      multiplier = getMultiplier(projArray[i].Multipliers);
      projArray[i].value *= (age * urgency * multiplier);
      projArray[i].row = row;
    }else{
      console.log("Archive Project - Too Old");
    }
    row++;
  }
}

function getProjectValues(projArray){
  let totalArray = [];
  for ( let i = 0 ; i < 10 ; i ++){
    let total =1*projArray[i].dateCreated*projArray[i].dueDate*projArray[i].easyMoney*projArray[i].easyWork*projArray[i].interesting*projArray[i].paidWork*projArray[i].preReq*projArray[i].teamWork*projArray[i].tool;
    totalArray.push(total);
  }
  let sorted = totalArray.sort(sortNumber).reverse();
  return sorted;
}

function renderOutlined(valArray){
  let s = 0;
  for ( let i = 0, len=valArray.length ; i < len ; i ++){
    let value = valArray[i].value;
    let name = valArray[i]['Project Name'];
    let dueDate = valArray[i]['Due Date'];
    if(s+value<maxValue){
      //card
      let randomBG = randomColor();
      let card = createElement('a');
      if(valArray[i]['inCollection']=='TRUE'){
        card.attribute('href','https://kravenoff42.github.io/kravenoffs_kollection/'+name);
      }else{
        card.attribute('href','https://github.com/kravenoff42/'+name);
      }
      card.addClass('outlined');
      card.style('height',(value*1.3 +"em"));
      card.style('background-color',randomBG);

      //content
      let pName = createElement('p', name);
      pName.style('text-align','left');
      pName.parent(card);
      let pDueDate = createElement('p', dueDate);
      pDueDate.style('text-align','right');
      pDueDate.parent(card);

      //adding to page
      card.parent(divList);

      s = s+valArray[i].value;
    }
  }
  // let tot = createElement('p',"Total: "+s);
  // tot.parent(divList)
}

function randomColor(){
return random(["#e6194b","#3cb44b","#ffe119","#0082c8","#f58231",
    "#911eb4","#d2f53c","#008080","#e6beff","#800000","#000080"]);
}
/*
var currentCol;
var currentRow;
var currentValue;
function archiveProject(project){
  currentCol = 'F';
  currentRow = project.row;
  currentValueObject = {}
}

function setProjectOutlined(){
  currentCol = 'G';

}
*/

// function makeApiCall() {
//   var params = {
//     // The ID of the spreadsheet to update.
//     spreadsheetId: '1M-jY0VpUFAd7wHvhmSwAqWvgc9iWdtcHwqkg0awjsWg',  // TODO: Update placeholder value.
//     // The A1 notation of the values to update.
//     range: "A2:H1005",  // TODO: Update placeholder value.
//     // How the input data should be interpreted.
//     valueInputOption: 'USER_ENTERED',  // TODO: Update placeholder value.
//   };
//
//   var valueRangeBody = {
//     // TODO: Add desired properties to the request body. All existing properties
//     // will be replaced.
//   };
//
//   var request = gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
//   request.then(function(response) {
//     // TODO: Change code below to process the `response` object:
//     console.log(response.result);
//   }, function(reason) {
//     console.error('error: ' + reason.result.error.message);
//   });
// }

// function initClient() {
//   var API_KEY = 'AIzaSyDT5ry6UgDF-cIyVUU1neb6AJKZ2IvJwgQ';
//   var CLIENT_ID = '776723441901-l0okfsnvgm565pfb2jks9ab59o8vmlsk.apps.googleusercontent.com';
//   var SCOPE = 'https://www.googleapis.com/auth/spreadsheets';
//
//   gapi.client.init({
//     'apiKey': API_KEY,
//     'clientId': CLIENT_ID,
//     'scope': SCOPE,
//     'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
//   }).then(function() {
//     gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
//     updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
//   });
// }
//
// function handleClientLoad() {
//   gapi.load('client:auth2', initClient);
// }
//
// function updateSignInStatus(isSignedIn) {
//   if (isSignedIn) {
//     makeApiCall();
//   }
// }
//
// function handleSignInClick(event) {
//   gapi.auth2.getAuthInstance().signIn();
// }
//
// function handleSignOutClick(event) {
//   gapi.auth2.getAuthInstance().signOut();
// }

function renderTodos(valArray){
  let s = 0;
  for ( let i = 0, len=valArray.length ; i < len ; i ++){
    let value = valArray[i].value;
    let name = valArray[i]['Project Name'];
    if(s+value<maxValue){
      //item card
      let li = createElement('li');
      li.addClass('todo');

      //check box
      let sheetLink = createElement('a');
      sheetLink.attribute('href','https://docs.google.com/spreadsheets/d/1M-jY0VpUFAd7wHvhmSwAqWvgc9iWdtcHwqkg0awjsWg/edit');
      let span = createElement('span');
      span.id('chk_'+name);
      let icon = createElement('i','check_box_outline_blank');
      icon.addClass('material-icons');
      icon.parent(span);
      span.parent(sheetLink);

      //link
      let a = createElement('a',name);
      a.attribute('href','https://stackedit.io/editor');

      //adding to card
      sheetLink.parent(li);
      a.parent(li);

      // adding card to div
      li.parent(todoList);
      s = s+valArray[i].value;
    }
  }
}

function sortNumber(a,b) {
    return a - b;
}
