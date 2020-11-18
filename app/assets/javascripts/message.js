  $(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="message" data-message-id=${message.id}>
         <div class="message_information">
           <div class="user_name">
             ${message.user_name}
           </div>
           <div class="date">
             ${message.created_at}
           </div>
         </div>
         <div class="message">
           <p class="message__content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="message" data-message-id=${message.id}>
         <div class="message_information">
           <div class="user_name">
             ${message.user_name}
           </div>
           <div class="date">
             ${message.created_at}
           </div>
         </div>
         <div class="message__content">
           <p class="message__content">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
    };
   }
    $('#new_message').on('submit', function(e){
      console.log('発火');
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action')
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false,
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.main_chat__message_list').append(html)
        $('.main_chat__message_list').animate({ scrollTop: $('.main_chat__message_list')[0].scrollHeight});
        $('form')[0].reset();
        $('.submitbtn').prop('disabled', false);
      })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
      }); 
    })

  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: "get",
      dataType: 'json',
      data: {id: last_message_id}
    })
      .done(function(_message){
        if (new_message.length !== 0) {
          var insertHTML = '';
          $.each(messages, function(i, message) {
            insertHTML += buildHTML(message)
          });
          $('.main_chat__message_list').append(insertHTML);
          $('.main_chat__message_list').animate({ scrollTop: $('.main_chat__message_list')[0].scrollHeight});
        }
      })
      .fail(function(){
        alert('error');
      });
    }

    if (document.location.href.match(/\/groups\/\d+\/main_chat__message_list/)) {
      setInterval(reloadMessages, 7000);
    }
  });
