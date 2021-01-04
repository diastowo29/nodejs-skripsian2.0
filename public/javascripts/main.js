function submitUpdate () {
    var updatePayload = {
        status_r: $('#toggle-r').prop('checked'),
        status_s: $('#toggle-s').prop('checked'),
        status_t: $('#toggle-t').prop('checked'),
        notes: $('#notes-input').val()
    }
    
    $.ajax({
        url: "/update",
        type: 'post',
        contentType: "application/json",
        dataType: 'json',
        data: JSON.stringify(updatePayload),
        success: function(result){
            console.log(result);
        }
    })
}