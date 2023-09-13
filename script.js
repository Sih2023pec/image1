const dropArea = document.querySelector('.drop-section')
const listSection = document.querySelector('.list-section')
const listContainer = document.querySelector('.list')
const fileSelector = document.querySelector('.file-selector')
const fileSelectorInput = document.querySelector('.file-selector-input')
//botton onclick
fileSelector.onclick = () => fileSelectorInput.click()
fileSelectorInput.onchange = () => {
    [...fileSelectorInput.files].forEach((file) => {
        if (typeValidation(file.type)) {
            uploadFile(file)
        }
    })
}
//file over drage area
dropArea.ondragover = (e) => {
    e.preventDefault();
    [...e.dataTransfer.item].forEach((item) => {
        if (typeValidation(item.type)) {
            dropArea.classList.add('drag-over-effect')
        }
    })
}

//file leave drag area
dropArea.ondragleave = () => {
    dropArea.classList.remove('drag-over-effect')
}
//file on drop area
dropArea.ondrop = (e) => {
    e.preventDefault();
    dropArea.classList.remove('drag-over-effect')
    if (e.dataTransfer.items) {
        [...e.dataTransfer.items].forEach((item) => {
            if (item.kind === 'file') {
                const file = item.getAsFile();
                if (typeValidation(file.type)) {
                    uploadFile(file)
                }
            }
        })
    } else {
        [...e.dataTransfer.files].forEach((file) => {
            if (typeValidation(file.type)) {
                uploadFile(file)
            }
        })
    }
}


//file type
function typeValidation(type) {
    var splitType = type.split('/')[0]
    if (splitType == 'image' || splitType == 'png') {
        return true
    }
    else {
        alert("select image file")
    }
}
//upload file
function uploadFile(file) {
    listSection.computedStyleMap.display = 'block'
    var li = document.createElement('li')
    li.classList.add('in-prog')
    listContainer.prepend(li)
    var http = new XMLHttpRequest()
    var data = new FormData()
    data.append('file', file)
    http.onload = () => {

    }
    http.upload.onprogress = (e) => {
        var percent_complete = (e.loaded / e.total) * 100
        console.log(percent_complete);
    }
    http.open('POST', 'sender.php', true)
    http.send(data)
}