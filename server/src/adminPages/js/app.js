let slides = [];
let quill;
$(document).ready(async () => {

    console.log('DigiZign Admin Loading ... ');

    await getSlides();
    await getClients();
    
    const sortable = new Sortable.default($('#slides').get(0), 
    {
        draggable: 'li',        
    });
        
    sortable.on('sortable:stop', () => {
        console.log('sorting was reordered, new list');
        console.log('sortable', sortable);
        // få den nye order i id'er
        for(let x = 0; x < sortable.containers[0].children.length; x++) {
            const item = sortable.containers[0].children[x];
            if(item) {
                console.log(item.innerText);
            }
        }        
    });


    tinyMCE.init({
        selector: '#announcementEditor',
        plugins: "code",
        toolbar: 'undo redo | styleselect | bold italic | fontsizeselect | code |',
        fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",        
        menubar: "edit | tools | format"
    })

    console.log('DigiZign Admin Ready');        
});

const getSlides = async () => {
    $('#slides').html('');
    await $.get('/api/slides', (slidesRes) => {
        slides = [];
        console.log('Slides res', slidesRes);
        slidesRes.forEach(s => {
            slides.push(s);
        });        
        slides.forEach(slide => {
            $('#slides').append('<li class="list-group-item"><span class="slideID" style="display: none;">' + slide.id + '</span>' + slide.filename + '<span style="float: right;"><button class="btn btn-sm btn-danger" onclick="deleteSlide(\'' + slide.id + '\');">Delete</button></li>');
        });
    });
}

const makeAnnouncement = async () => {
    await $.post('/admin/announce', {
        title: $('#announcementTitle').val(),
        content: tinyMCE.activeEditor.getContent({format: 'html'}),
        duration: $('#duration').val()
    });
}

const getClients = async () => {
    await $.get('/api/clients', (clientRes) => {
        console.log('clients', clientRes);
        
        $('#clients').html('');
        clientRes.clients.forEach(c => {
            $('#clients').append('<li class="list-group-item">' + c + '</li>');
        });
    });

}

const deleteSlide = (id) => {
    console.log('Deleting slide', id);

    $.ajax({
        url: '/admin/slide/' + id,
        type: 'DELETE',
        success: function(result) {            
            getSlides();    
        }
    });        
}

const launchStream = () => {
    let streamID = $('#ytLiveStreamUrl').val();
    const cmd = {
        cmd: 'location',
        value: '/client/ytstream/' + streamID
    }
    $.post('/admin/cmd', cmd, (res) => {
        console.log(res);
    });
}

const clearUploadForm = () => {
    const slidesUploader = Dropzone.forElement("#slidesUploader");
    slidesUploader.removeAllFiles(true); 
    getSlides();
}

const sendLocation = () => {
    const newLocation = $('#locationSelect').val();
    console.log('Switching to', newLocation);
    const cmd = {
        cmd: 'location',
        value: '/client/' + newLocation
    }
    $.post('/admin/cmd', cmd, (res) => {
        console.log(res);
    });
}

const sendReload = () => {
    console.log('Reloading all Clients!');
    $.post('/admin/cmd', { cmd: 'reload', value: ''});
}