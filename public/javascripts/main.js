function submitUpdate () {
    var updatePayload = {
        status_r: $('#toggle-r').prop('checked'),
        status_s: $('#toggle-s').prop('checked'),
        status_t: $('#toggle-t').prop('checked'),
        notes: $('#notes-input').val()
    }
    console.log(updatePayload)
    
    $.ajax({
        url: "/update",
        type: 'post',
        contentType: "application/json",
        dataType: 'json',
        data: JSON.stringify(updatePayload),
        success: function(result){
            console.log(result);
            location.reload();
        }
    })
}

function clearData () {
    $.ajax({
        url: "/arus-delete-all",
        type: 'get',
        contentType: "application/json",
        dataType: 'json',
        success: function(result){
            console.log(result);
            generateChart();
        }
    })
}

function downloadData () {
    window.open("/arus-download");
}

generateChart();

function generateChart () {
    $.ajax({
        url: "/arus_tegangan",
        type: 'get',
        contentType: "application/json",
        dataType: 'json',
        success: function(result){
            var newRArusLabel = [];
            var newRArus = [];
            var newRTegangan = [];
            var newSArus = [];
            var newSTegangan = [];
            var newTArus = [];
            var newTTegangan = [];
            result.forEach(arus => {
                var newXLabel = [];
                newXLabel.push(arus.createdAt.toString().split('T')[0])
                newXLabel.push(arus.createdAt.toString().split('T')[1])
                newRArusLabel.push(newXLabel)
                newRArus.push(arus.r_arus)
                newRTegangan.push(arus.r_tegangan)
                newSArus.push(arus.s_arus)
                newSTegangan.push(arus.s_tegangan)
                newTArus.push(arus.t_arus)
                newTTegangan.push(arus.t_tegangan)
            });
            var ctx = document.getElementById('rArusChart').getContext('2d');
            var rArusChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: newRArusLabel,
                    datasets: [{
                        label: '# Arus R',
                        data: newRArus,
                        backgroundColor: [
                            'rgba(0, 125, 44, 1)'
                        ],
                        borderColor: [
                            'rgba(0, 125, 44, 1)'
                        ],
                        fill: false,
                        borderWidth: 3
                    },{
                        label: '# Arus S',
                        data: newSArus,
                        backgroundColor: [
                            'rgba(66, 135, 245, 1)'
                        ],
                        borderColor: [
                            'rgba(66, 135, 245, 1)'
                        ],
                        fill: false,
                        borderWidth: 3
                    },{
                        label: '# Arus T',
                        data: newTArus,
                        backgroundColor: [
                            'rgba(202, 3, 252, 1)'
                        ],
                        borderColor: [
                            'rgba(202, 3, 252, 1)'
                        ],
                        fill: false,
                        borderWidth: 3
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                            },
                        }],
                        xAxes: [{
                            ticks: {
                                beginAtZero:true,
                            }
                        }]
                    }
                }
            });
            // rArusChart.canvas.parentNode.style.height = '128px';
            // rArusChart.canvas.parentNode.style.width = '1128px';

            var ctx = document.getElementById('rTeganganChart').getContext('2d');
            var rTeganganChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: newRArusLabel,
                    datasets: [{
                        label: '# Tegangan R',
                        data: newRTegangan,
                        backgroundColor: [
                            'rgba(0, 125, 44, 1)'
                        ],
                        borderColor: [
                            'rgba(0, 125, 44, 1)'
                        ],
                        fill: false,
                        borderWidth: 3
                    },{
                        label: '# Tegangan S',
                        data: newSTegangan,
                        backgroundColor: [
                            'rgba(66, 135, 245, 1)'
                        ],
                        borderColor: [
                            'rgba(66, 135, 245, 1)'
                        ],
                        fill: false,
                        borderWidth: 3
                    },{
                        label: '# Tegangan T',
                        data: newTTegangan,
                        backgroundColor: [
                            'rgba(202, 3, 252, 1)'
                        ],
                        borderColor: [
                            'rgba(202, 3, 252, 1)'
                        ],
                        fill: false,
                        borderWidth: 3
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
            // rTeganganChart.canvas.parentNode.style.height = '128px';
            // rTeganganChart.canvas.parentNode.style.width = '1128px';
        }
    })
}
