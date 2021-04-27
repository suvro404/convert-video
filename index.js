module.exports.convert = function (videoFileData, targetFormat) {
    try {
        targetFormat = targetFormat.toLowerCase();
        let reader = new FileReader();
        return new Promise(resolve => {
            reader.onload = function (event) {
                let contentType = 'video/'+targetFormat;
                let data = event.target.result.split(',');
                let b64Data = data[1];
                let blob = getBlobFromBase64Data(b64Data, contentType);
                let blobUrl = URL.createObjectURL(blob);

                let convertedVideo = {
                    name: videoFileData.name.substring(0, videoFileData.name.lastIndexOf(".")),
                    format: targetFormat,
                    data: blobUrl
                }
                // console.log("convertedVideo: ", convertedVideo);
                resolve(convertedVideo);
            }
            reader.readAsDataURL(videoFileData);
        });

    } catch (e) {
        console.log("Error occurred while converting : ", e);
    }
}

function getBlobFromBase64Data(b64Data, contentType, sliceSize=512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
}