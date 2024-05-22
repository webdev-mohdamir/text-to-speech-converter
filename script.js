// this will not work because the voices are not loaded yet
// const allVoices = speechSynthesis.getVoices();
// console.log(allVoices);

const utter = new SpeechSynthesisUtterance();
// Wait for voices to be loaded
let voices = [];
const voiceElement = document.querySelector("#voices");

speechSynthesis.onvoiceschanged = function () {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.innerText = `${voice.name} (${voice.lang})`;
    voiceElement.appendChild(option);
  });

  voiceElement.addEventListener("change", (e) => {
    utter.voice = voices.find((voice) => voice.name === e.target.value) || null;
    // console.log(utter.voice, voices);
    utter.lang = utter.voice["lang"] || "en-US";
  });
};

const volumeBtn = document.getElementById("volume");
const volumeValue = document.getElementById("volumeValue");

const speedRateBtn = document.getElementById("rate");
const speedRateValue = document.getElementById("rateValue");

volumeBtn.addEventListener("change", (e) => {
  utter.volume = e.target.value;
  volumeValue.textContent = e.target.value;
});

speedRateBtn.addEventListener("change", (e) => {
  utter.rate = e.target.value;
  speedRateValue.textContent = e.target.value;
});

const textInput = document.getElementById("textInput");

const convertBtn = document.getElementById("convertBtn");

convertBtn.onclick = () => {
  if (textInput.value.trim() == "") {
    alert("Please enter some text to convert");
    return;
  }

  speechSynthesis.cancel();

  utter.text = textInput.value;
  speechSynthesis.speak(utter);
};

const pauseBtn = document.getElementById("pauseBtn");

pauseBtn.onclick = () => {
  speechSynthesis.pause();
};

const resumeBtn = document.getElementById("resumeBtn");

resumeBtn.onclick = () => {
  speechSynthesis.resume();
};

// utter.onstart = () => {
//   console.log("Speech has started");
// };

// utter.onend = () => {
//   console.log("Speech has ended");
// };
