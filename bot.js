var result_timezones =new Array();
var today = moment().format('MM/DD/YYYY');


$(function() {

    localStorage.clear();
    var us_timezones = new Array(
        {name: "Eastern Daylight Time", country: "New York", tz:"America/New_York", difference:"(GMT-4)", current_time: ""},
        {name: "Central Daylight Time", country: "Chicago", tz:"America/Chicago", difference: "(GMT-5)", current_time: ""},
        {name: "Mountain Daylight Time", country: "Denver", tz:"America/Denver",  difference: "(GMT-6)", current_time: ""},
        {name: "Mountain Standard Time", country: "Phoenix",  tz:"America/Phoenix", difference: "(GMT-7)", current_time: ""},
        {name: "Pacific Daylight Time", country: "Los Angeles", tz:"America/Los_Angeles",  difference: "(GMT-7)", current_time: ""},
        {name: "Alaska Daylight Time", country: "Anchorage", tz:"America/Anchorage", difference: "(GMT-8)", current_time: ""},
        {name: "Hawaii-Aleutian Standard Time", country: "Honolulu", tz:"Pacific/Honolulu", difference: "(GMT-10)", current_time: ""},
    )
    var html='';

    $.each(us_timezones, function(key, value){
        var current_time_zone = moment(get_current_date()).tz(value.tz).format("YYYY-MM-DD HH:mm:ss");
        $("#bot-time-zone").append("<option class='us_zone' data-value='"+value.name+"' data-zone='"+value.country+"/USA"+value.difference+"'> "+value.name+" - "+value.country+" "+value.difference+" - "+current_time_zone+"</option>");
        
    })

    
    $('#datetimepicker1').datetimepicker({
        format: "MM/DD/YYYY",
        defaultDate : today,
        minDate: today
    });

    $('#datepicker1').datetimepicker('update', new Date());
    $('#datepicker1').attr('value', today);

    if($('#send_sms').is(':checked') ) {
        var send_sms = 'YES';
        localStorage.setItem('send_sms', send_sms);
    }else {
        var send_sms = 'NO';
        localStorage.setItem('send_sms', send_sms);
    }
    if($('#send_email').is(':checked') ) {
        var send_email = 'YES';
        localStorage.setItem('send_email', send_email);
    }else {
        var send_email = 'NO';
        localStorage.setItem('send_email', send_email);
    }
    localStorage.setItem('bot-time-zone', $("#bot-time-zone option:selected").data('zone'));
    localStorage.setItem('desired-delivery-date', $("#desired-delivery-date").val());

    
});




$('.form-control').on('keyup', function(){
    var timeoutId;
    if (timeoutId) clearTimeout(timeoutId);
    var res_name = $(this).attr('id');
    var res_value = $(this).val();
    
    timeoutId = setTimeout(function () {
        
        localStorage.setItem(res_name, res_value);
    }, 800);
    setTimeout(function(){
        if(localStorage.getItem(res_name)) {
            
            $("#"+res_name).css({'border-bottom': '1px solid #F6D550'}).animate({
                borderWidth: 6
            }, 200);
        }
    }, 1000);
    
    

});
$("#bot-time-zone").change(function(){
    var timeoutId;
    if (timeoutId) clearTimeout(timeoutId);
    var res_name = $(this).attr('id');
    var res_value = $(this).find("option:selected").data("zone");
    timeoutId = setTimeout(function () {
        
        localStorage.setItem(res_name, res_value);
    }, 800);
    setTimeout(function(){
        if(localStorage.getItem(res_name)) {
 
            $("#"+res_name).css({'border-bottom': '1px solid #F6D550'}).animate({
                borderWidth: 6
            }, 200);
        }
    }, 1000);

})




$('#desired-delivery-date').on('input', function () {
    
    var timeoutId;
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
        
        localStorage.setItem('desired-delivery-date', $("#desired-delivery-date").val());
    }, 800);
    setTimeout(function(){
        if(localStorage.getItem(res_name)) {
           
            $("#desired-delivery-date").css({'border-bottom': '1px solid #F6D550'}).animate({
                borderWidth: 6
            }, 200);
        }
    }, 1000);
});


$('#phone').on('input', function() {              
    let text=$(this).val()                            
    text=text.replace(/\D/g,'')  
    if(text.length>0) text=text.replace(/.{0}/,'$&(')                    
    if(text.length>4) text=text.replace(/.{4}/,'$&) ') 
    if(text.length>9) text=text.replace(/.{9}/,'$&-')  
    $(this).val(text);                                 
});

$("#web-site").on('input', function(){
    let text=$(this).val()
    if(text.length>4 && !text.startsWith("http://") ) {
        text = text.replace(text,"http://"+text) 
        $(this).val(text); 
    }
});


$('form').submit(function(e){
    e.preventDefault();

    $('.form-control').each(function( ){
        $(this).removeAttr( 'style' );
    }); 
    if($('#send_sms').is(':checked') ) {
        var send_sms = 'YES';
    }else {
        var send_sms = 'NO';
    }
    if($('#send_email').is(':checked') ) {
        var send_email = 'YES';
    }else {
        var send_email = 'NO';
    }
    
    $("#order-box").prepend('<li class="col-lg-4 col-md-4 col-sm-12"><div class="card"><div class="card-header">'+$("#company_name").val()+'</div><div class="card-body"><span class="card-text" id="order-phone">'+$("#phone").val()+'</span> <span class="card-text" id="order-comapny-side">'+$("#web-site").val()+'</span><span class="card-text" id="order-bot-name">'+$("#bot-name").val()+'</span><span class="card-text" id="order-bot-time-zone">'+ $("#bot-time-zone option:selected").data("zone")+'</span><span class="card-text" id="order-delivery-date">'+$("#desired-delivery-date").val()+'</span><span class="card-text" id="order-send-sms">Send Sms: '+send_sms+'</span><span class="card-text" id="order-send-email">Send Email: '+send_email+'</span><span class="card-text" id="order-lead-email">'+$("#multiple_email").val()+'</span><span class="card-text" id="order-billing-address">'+$("#billing-addres").val()+'</span><span class="card-text" id="order-billing-contact">'+$("#billing-contact").val()+'</span><span class="card-text" id="order-billing-email">'+$("#billing-email").val()+'</span></div></div></li>');
    $('form')[0].reset(); 
    
    
})


function get_current_date () {
    now = new Date();
    year = "" + now.getFullYear();
    month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
    day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
    hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
    minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
    second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}