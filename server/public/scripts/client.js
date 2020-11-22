console.log( 'js' );
 
$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getToDo();

}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let taskToDo = {
      task: 'testName',
      notes: 'testName',
      date_due: 'testName',
      completed: 'testName',
    };
    // call saveKoala with the new obejct
    addToDo( taskToDo );
  });
  
  $('#viewToDo').on ('click', '.btn-completed', function () {
    toDoId = $(this).closest('tr').data('id');
    isCompleted = $(this).data('completed');
    setDoneStatus(toDoId, isCompleted);
  });
  
  $('#viewToDo').on('click', '.btn-uncompleted', function () {
    toDoId = $(this).closest('tr').data('id');
    isCompleted = $(this).data('completed');
    setDoneStatus(toDoId, isCompleted);
  });

  $('#viewToDo').on ('click', '.btn-deleteToDo', function () {
    toDoId = $(this).closest('tr').data('id')
    deleteToDo (toDoId);
  });

}



function getToDo(){
  console.log( 'in getToDo' );
  let html = '';
  $("#viewToDo").empty();
  $.ajax({
    type: 'GET',
    url: '/todo'
  }).then(function (response) {
    console.log(response);
    // append data to the DOM
    for (let i = 0; i < response.length; i++) {
      html = `<tr class="${response[i].completed}" data-id="${response[i].id}">
                    <td>${response[i].task}</td>
                    <td>${response[i].notes}</td>
                    <td>${response[i].date_due}</td>                   
              `;
      if ( response[i].completed ) {
        html += `<td>
                  <input type="checkbox" data-completed="${response[i].completed}" class="btn-completed" checked>
                </td>`
      } else {
        html += `<td>
                  <input type="checkbox" data-completed="${response[i].completed}" class="btn-uncompleted">
                </td>`
      }
      html += `<td>                   
                  <button class="btn-deleteToDo">Delete</button>
                </td>
                `;
      $('#viewToDo').append(html)
      }  // end of for loop
  });
}
  // ajax call to server to get koalas
  
 // end getKoalas

function addToDo( toDo ){
  console.log( 'in addToDo', toDo );
  // ajax call to server to get todo list
  let payloadObject = {  // these tacos must match those in the router
        task: $('#taskIn').val(),
        notes: $('#notesIn').val(),
        due_date: $('#dueDateIn').val(),
        completed: "false",
    }
    console.log(payloadObject);
    $.ajax({
        type: 'POST',
        url: '/todo',
        data: payloadObject
    }).then( function (response) {
        $('#taskIn').val(''),
        $('#notesIn').val(''),
        $('#dueDateIn').val(''),
        $('#completedIn').val('')
        getToDo();
    })
    .catch ( function (error){
        console.log (`Error:`, error);
        alert ('Something bad happened')
    });
}


function setDoneStatus(toDoId, isCompleted) {
  console.log(toDoId, isCompleted);
  $.ajax({
    method: 'PUT',
    url: `/todo/${toDoId}`,
    data: { completed: isCompleted }
  })
    .then(function (response) {
      getToDo();
    })
    .catch(function (error) {
      console.log('Error:', error);
      alert('Something bad happened. Try again later');
    })
}

function deleteToDo( toDoId ) {
  $.ajax({
    method: 'DELETE',
    url: `/todo/${toDoId}`
  })
    .then(function (response) {
      getToDo();
    })
    .catch(function (error) {
      console.log('Error:', error);
      alert('Something bad happened. Try again later');
    })
}