console.log('starting')

window.addEventListener('DOMContentLoaded', (event) => {
  const audio = document.querySelector("#audioplayer")

  const recordBtn = document.querySelector('#record')
  const playBtn = document.querySelector('#play')
  const stopBtn = document.querySelector('#stop')
  const downloadBtn = document.querySelector("#download")

  let chunks= [];
  let mimeType = null;

  const types = [
      "audio/webm",
      "audio/mpeg",
      "audio/mp3",
      "audio/mp4",
      "audio/wav",
      "audio/ogg",
      "audio/opus",
      "audio/webm;codecs=opus",
      "audio/mpeg",
      "audio/mpeg3",
      "audio/3gpp"
  ];

  // Find first mimeType that is supported by the browser and set it as mimeType
  mimeType = types.filter(MediaRecorder.isTypeSupported)[0];
  console.log(`chosen mimeType: ${mimeType}`)


  if (!mimeType) {
    alert("Kein gueltiges Audioformat gefunden");
    return;
  }

  const options = {
      mimeType: mimeType
    }

  for (const type of types) {
    console.log(`Is ${type} supported? ${MediaRecorder.isTypeSupported(type) ? "Maybe!" : "Nope :("}`);
  }

  console.log(`options:`, options)

  recordBtn.addEventListener("click", getAudio)


  async function getAudio() {
    let stream = null;

    // const mimeType = "audio/ogg"

    const constraints = {
      audio: true,
      video: false,
      mimeType: mimeType
    }

    try {

      stream = await navigator.mediaDevices.getUserMedia(constraints)
    } catch (error) {
      console.log("Ein Fehler ist aufgetreten beim Versuch, getUserMedia auszuführen");
      console.log(error)
      return;
    }


    let mediaRecorder = new MediaRecorder(stream, options);
    console.log(`options:`, options)

    mediaRecorder.addEventListener("dataavailable", handleDataAvailable);
    mediaRecorder.addEventListener("stop", onStop);

    stopBtn.disabled = false;
    stopBtn.addEventListener("click", stopRecording);
    stopBtn.value = "Aufnahme stoppen";

    recordBtn.disabled = true;
    playBtn.disabled = true;

    mediaRecorder.start();
    console.log('recording started');

    function handleDataAvailable(data) {
      console.log(`data available: ${data.data}`)
      chunks.push(data.data)
      console.log(chunks)
    }

    function onStop() {
      console.log("recording stopped")

      //console.log(mimeType)
      const blob = new Blob(chunks);
      chunks = [];
      const audioURL= window.URL.createObjectURL(blob)
      console.log(audioURL)
      audio.src = audioURL;
      audio.type = mimeType;

      playBtn.addEventListener("click", playBtnHandler)

      recordBtn.disabled = false;
      playBtn.disabled = false;
      downloadBtn.disabled = false;

      downloadBtn.addEventListener("click", download)

    }

    function stopRecording() {
      mediaRecorder.stop();
      stopBtn.disabled = true;
      stopBtn.value = "Stop"
    }

    function playBtnHandler() {
      console.log(audio)
      audio.play();
    }

    function download() {
      console.log(`Trying to download audio content. Audio.src: ${audio.src}`)
      suffix = mimeType.substring(mimeType.indexOf('/') + 1)
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = audio.src;
      a.download = `recording.${suffix}`;
      a.click();
    }
  }
});
