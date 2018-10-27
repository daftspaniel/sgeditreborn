
function downloadFile(filename, contents) {
    var downloader = document.createElement('a');
    downloader.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(contents));
    downloader.setAttribute('download', filename);
    downloader.click();
}