var contents = document.querySelectorAll('.classroom-toc-item__link');

function downloadVideo(count) {
	var videoURL = document.querySelector('.vjs-tech')?.getAttribute('src');

	var xhr = new XMLHttpRequest();
	xhr.open('GET', videoURL, true);
	xhr.responseType = 'blob';

	xhr.onload = function () {
		if (xhr.status === 200) {
			var blob = xhr.response;
			var filename = count + '.mp4';

			if (window.navigator.msSaveOrOpenBlob) {
				// For IE10+
				window.navigator.msSaveOrOpenBlob(blob, filename);
			} else {
				var downloadLink = document.createElement('a');
				downloadLink.href = window.URL.createObjectURL(blob);
				downloadLink.setAttribute('download', filename);
				downloadLink.click();
			}
		} else {
			console.error('Error downloading video:', xhr.statusText);
		}
	};

	xhr.send();
}

var count = 0;
async function interater() {
	for (const element of contents) {
		const elName = element.outerText.split('\n')[0];
		if (elName == 'Chapter Quiz' ||
			elName == '</> Code Challenge: Create a more advanced calculator app') {
			continue;
		}

		element.click();
		downloadVideo(count + ". " + elName);
		console.log(elName);
		count++;
		await new Promise(resolve => setTimeout(resolve, 4000));
	}
}

interater();
