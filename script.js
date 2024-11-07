// Array of images and answers (assuming images are in an "images" folder)
const images = [
  { src: './images/achat1.jpg', answer: 'Achát' },
  { src: './images/ametyst.jpg', answer: 'ametyst' },
  { src: './images/andezit.jpg', answer: 'andezit' },
  { src: './images/antimonit.jpg', answer: 'antimonit' },
  { src: './images/aragonit.jpg', answer: 'aragonit' },
  { src: './images/azbestos.jpg', answer: 'azbest' },
  { src: './images/cadic.jpg', answer: 'čadič' },
  { src: './images/fluorit.jpg', answer: 'fluorit' },
  { src: './images/granat.jpg', answer: 'granát' },
  { src: './images/holubnikovy_kremen.jpg', answer: 'holubníkový kremeň' },
  { src: './images/kammenna_sol.jpg', answer: 'kamenná soľ/halit' }, // Changed from 'kammenna sol.jpg'
  { src: './images/kremen.jpg', answer: 'kremeň' },
  { src: './images/mramor.jpg', answer: 'mramor' },
  { src: './images/obsidian.jpg', answer: 'obsidián/sopečné sklo' },
  { src: './images/opal.jpg', answer: 'opál' },
  { src: './images/pyrit.jpg', answer: 'pyrit' },
  { src: './images/rubin.jpg', answer: 'rubín' },
  { src: './images/rula.jpg', answer: 'rula' },
  { src: './images/sadrovec.jpg', answer: 'sadrovec' }, // Removed leading spaces
  { src: './images/sira.jpg', answer: 'síra' },
  { src: './images/sluda.jpg', answer: 'sľuda/muskovit' },
  { src: './images/smaragd.jpg', answer: 'smaragd' },
  { src: './images/svor.jpg', answer: 'svor' },
  { src: './images/tuha.jpg', answer: 'tuha' },
  { src: './images/vapenec.jpg', answer: 'vápenec' },
  { src: './images/zafirs.jpg', answer: 'zafír' },
  { src: './images/zivec.jpg', answer: 'živec' },
  { src: './images/zlato.jpg', answer: 'zlato' },
  { src: './images/zlepenec.jpg', answer: 'zlepenec' },
  { src: './images/zula.jpg', answer: 'žula' },
];

const rockNames = [
  'žula', 'zlepenec', 'živec', 'zafír', 'vápenec', 'tuha', 'svor', 'smaragd', 'sľuda/muskovit', 'síra', 'sadrovec', 'rula',
  'pyrit', 'opál', 'obsidián/sopečné sklo', 'mramor', 'kremeň', 'kamenná soľ/halit', 'holubníkový kremeň', 'granát', 'fluorit',
  'čadič', 'azbest', 'aragonit', 'antimonit', 'andezit', 'ametyst', 'Achát'
];

let currentImageIndex;
const optionsContainer = document.getElementById('options-container');
const quizImage = document.getElementById('quiz-image');
const feedback = document.getElementById('feedback');
const nextButton = document.getElementById('next-button');

// Load a new random image
function loadRandomImage() {
  optionsContainer.innerHTML = '';
  feedback.textContent = ''; // Clear previous feedback

  // Select a random image
  currentImageIndex = Math.floor(Math.random() * images.length);
  const image = images[currentImageIndex];

  // Set the image source and alt text
  quizImage.src = image.src;
  quizImage.alt = image.answer;
  console.log("Loading image:", image.src);

  // Add error handling if image fails to load
  quizImage.onerror = () => {
      quizImage.src = './images/placeholder.jpg'; // Optional: placeholder image
      console.error("Failed to load image:", image.src);
  };

  // Create answer options, starting with the correct one
  const options = [image.answer];

  // Add two random wrong answers from rockNames
  while (options.length < 3) {
      const randomRock = rockNames[Math.floor(Math.random() * rockNames.length)];
      if (!options.includes(randomRock)) {
          options.push(randomRock);
      }
  }

  // Shuffle options
  options.sort(() => Math.random() - 0.5);

  // Display options as buttons
  options.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option;
      button.onclick = () => checkAnswer(option);
      optionsContainer.appendChild(button);
  });
}

// Check if the selected answer is correct
function checkAnswer(selectedOption) {
  const correctAnswer = images[currentImageIndex].answer;

  if (selectedOption === correctAnswer) {
      feedback.textContent = 'Správne!';
      feedback.classList.add('correct');
      feedback.classList.remove('wrong');
      setTimeout(loadRandomImage, 1000); // Automatically load the next image after 1 second
  } else {
      feedback.textContent = "Zle!";
      feedback.classList.add('wrong');
      feedback.classList.remove('correct');
  }
}

// Load the next random image when "Next Image" button is clicked
nextButton.onclick = loadRandomImage;

// Load the first image when the page loads
loadRandomImage();