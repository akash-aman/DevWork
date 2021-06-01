// Make sure all the pages are loaded before you run the script from browser console.
//var images = Array.from(document.getElementsByTagName('main')[0].getElementsByTagName('img'));
var images = Array.from(document.getElementsByClassName("jss516"));
console.log(images);
images.forEach(eachImg => {
    if (eachImg.alt.startsWith('page')) {
        var download = document.createElement('a');
        download.href = eachImg.src;
        download.download = eachImg.alt + '.png';
        download.click();
    }
});
