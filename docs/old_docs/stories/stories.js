document.addEventListener('DOMContentLoaded', async () => {
  const stories = [
    { file: './story_ml/story_ml.html', title: 'Story ML: The Beauty of Data' },
    { file: './story_encounters/story_encounters.html', title: 'Wildlife Encounters: Biodiversity in Action' },
    { file: './story_big/story_big.html', title: 'Big Beautiful Moths: Nature\'s Giants' },
    { file: './story4/story4.html', title: 'Story 4: Data in Action' }, // Added 4th story
  ];

  const carouselInner = document.querySelector('.carousel-inner');
  const carouselIndicators = document.querySelector('.carousel-indicators');

  let slideIndex = 0; // Tracks slide numbers
  let currentSlide = null; // Tracks current slide container

  // Function to create a new slide
  const createNewSlide = (isActive) => {
    const slide = document.createElement('div');
    slide.className = `carousel-item ${isActive ? 'active' : ''}`;
    const slideContent = document.createElement('div');
    slideContent.className = 'row';
    slide.appendChild(slideContent);
    carouselInner.appendChild(slide);
    return slideContent;
  };

  // Create the first active slide
  currentSlide = createNewSlide(true);

  for (let i = 0; i < stories.length; i++) {
    const { file, title } = stories[i];

    try {
      const response = await fetch(file);
      if (!response.ok) {
        throw new Error(`Failed to load ${file}`);
      }
      const storyContent = await response.text();

      // Create a story container
      const storyDiv = document.createElement('div');
      storyDiv.classList.add('col-4', 'd-flex', 'justify-content-center', 'align-items-center');
      storyDiv.innerHTML = storyContent;

      // Add the story to the current slide
      currentSlide.appendChild(storyDiv);

      // Start a new slide every 3 items
      if ((i + 1) % 3 === 0 || i === stories.length - 1) {
        // Close current slide and start a new one (except the last story)
        if (i !== stories.length - 1) {
          currentSlide = createNewSlide(false);
        }

        // Add a new indicator for each slide
        const indicator = document.createElement('button');
        indicator.type = 'button';
        indicator.setAttribute('data-bs-target', '#dataStoriesCarousel');
        indicator.setAttribute('data-bs-slide-to', slideIndex);
        indicator.setAttribute('aria-label', `Slide ${slideIndex + 1}`);
        if (slideIndex === 0) indicator.classList.add('active');
        carouselIndicators.appendChild(indicator);
        slideIndex++;
      }
    } catch (error) {
      console.error(`Error loading story: ${file}`, error);
    }
  }
});

// Scrollytelling
document.addEventListener("DOMContentLoaded", () => {
  fetch("story_text.json")
    .then(response => response.json())
    .then(data => {
      data.forEach((section, index) => {
        const el = document.querySelector(`.scrolly-text[data-index="${index}"]`);
        if (el) {
          el.innerHTML = `
            <h2>${section.title}</h2>
            <p>${section.text}</p>
          `;
        }
      });
    })
    .catch(err => console.error("Failed to load story text:", err));
});
