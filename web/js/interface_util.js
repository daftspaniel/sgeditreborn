function getImgUrl(char) {
    return 'url("grafix/' + char + '.jpg")'
}
function getImg(char) {
    return 'grafix/' + char + '.jpg'
}

function getById(id) {
    return document.getElementById(id);
}

function hideById(id) {
    getById(id).style.display = 'none';
}

function showById(id) {
    getById(id).style.display = 'block';
}