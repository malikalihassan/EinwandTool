let container = document.getElementById('chatbot-container');
let btn = document.getElementById('btn');
let form = document.getElementById('form');

let arr1 = [
  { name: "hallo", text: "hi" },
  { name: "wie geht es dir", text: "es geht mir gut, danke. Und dir?" },
  // Add more German phrases and responses here
];

// Enable German Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'de-DE'; // Set the language to German (Germany)

recognition.onstart = () => {
  console.log('Voice recognition is active');
  btn.innerHTML = "Sprache aktiv";
}

recognition.onend = () => {
  btn.innerHTML = "Spracherkennung starten";
}

function botVoice(message) {
  const speech = new SpeechSynthesisUtterance();
  speech.text = "Ich verstehe das nicht"; // Default response for unknown messages

  for (let botData of arr1) {
    if (message.includes(botData.name.toLowerCase())) {
      speech.text = botData.text;
      break; // Exit loop when a matching phrase is found
    }
  }

  container.innerHTML += `<p class="speech">${speech.text}</p>`;

  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
}

recognition.onresult = (event) => {
  const current = event.resultIndex;
  const transcript = event.results[current][0].transcript;
  container.innerHTML += `<p class="recorder">${transcript}</p>`;
  botVoice(transcript.toLowerCase());
}

function startVoice() {
  recognition.start();
}

form.onsubmit = (e) => {
  e.preventDefault();
  let formInput = document.getElementById('botvalue').value;
  if (formInput == '') {
    return false;
  } else {
    container.innerHTML += `<p class="recorder">${formInput}</p>`;
    botVoice(formInput.toLowerCase());
    form.reset();
    return true;
  }
}

