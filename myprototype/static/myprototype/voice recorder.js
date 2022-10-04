window.addEventListener('DOMContentLoaded', (event) => {
  let recording = false;

  //const audio = new Audio();
  const audio = document.querySelector("audio")

  const recordBtn = document.querySelector('#record')
  const playBtn = document.querySelector('#play')
  const stopBtn = document.querySelector('#stop')

 let chunks= [];

  async function getAudio() {
    let stream = null;

    const constraints = {
      audio: true,
      video: false
    }

    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints)
    } catch (error) {
      console.log(error)
      return;
    }

    let mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.addEventListener("dataavailable", handleDataAvailable);
    mediaRecorder.addEventListener("stop", onStop);

    stopBtn.disabled = false;
    stopBtn.addEventListener("click", stopRecording);
    stopBtn.value = "Aufnahme stoppen";

    recordBtn.disabled = true;
    playBtn.disabled = true;

    mediaRecorder.start();
    console.log('recording started');

    recording = true;

    function handleDataAvailable(data) {
      console.log(`data available: ${data.data}`)
      chunks.push(data.data)
      console.log(chunks)
    }

    function onStop() {
      recording = false;
      console.log("recording stopped")

      const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
      chunks = [];
      const audioURL= window.URL.createObjectURL(blob)
      console.log(audioURL)
      audio.src = audioURL;

      playBtn.addEventListener("click", playBtnHandler)

      recordBtn.disabled = false;
      playBtn.disabled = false;

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
  }



  recordBtn.addEventListener("click", getAudio)


});
