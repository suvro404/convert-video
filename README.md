## convert-video
##### A lightweight video conversion tool to convert mp4, avi and mov file.

### [DEMO](https://suvro404.github.io/convert-video-playground/)

#### Install
```
npm install convert-video
```

### Usage
```
import VideoConverter from 'convert-video'

VideoConverter.convert(sourceVideoFile, targetVideoFormat);
```

### Example Code
```
<input type='file' accept=".mp4, .avi, .mov" onchange="convertVideo(this)" />

import VideoConverter from 'convert-video'

async function convertVideo(input) {
    let sourceVideoFile = input.files[0];
    let targetVideoFormat = 'avi'
    let convertedVideoDataObj = await VideoConverter.convert(sourceVideoFile, targetVideoFormat);
}
```
##### This convert function will return a converted video data object which includes video file's name, format and blob URL.
##### This blob URL can be used to download the converted video.

```
function downloadVideo(convertedVideoDataObj) {
    let a = document.createElement("a");
    a.href = convertedVideoDataObj.data;
    a.download = convertedVideoDataObj.name + "." + convertedVideoDataObj.format;
    a.click();
}
```


### License
MIT