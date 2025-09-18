# Adding a New Story to the AMBER Dashboard

Follow these step-by-step instructions to add a new story page to the AMBER Dashboard website.

## 1. Create a New Story Folder
- In the `stories/` directory, create a new folder for your story (e.g., `story_new`).
- **Recommended:** Use `stories/story_template` as a starting point for your new story. Copy this folder and rename it, along with the main HTML or markdown file (e.g., `stories/story_new/`, `story_new.md` and `story_new.html`).
- Remove either the html or markdown file - you will only need one. If your story is fairly simple (just text and images or videos) we recommend you use markdown. However, for more complex stories, HTML may be more suitable, for example if you want clickable elements.
- **👀 Test**: You should now be able to view the story by running `bundle exec jekyll serve` then navigating to `http://127.0.0.1:4000/stories/story_new/story_new.html` in your browser.

## 2. Prepare Your Content
- Collect all media files (images, gifs, videos) and place them in an appropriate subfolder.
- Write your story content an html file (e.g., `stories/story_new/story_new.html`). Replace the content within the existing html file if you used the template.
- Update the `<title>`, main heading, and content to match your new story.

## 3. Update Navigation
- In your new story HTML, update the navigation buttons at the bottom:
  - "Back to All Stories" should already link to `../stories.html`.
  - "Next Story" should link to the next story's HTML file (or the first story if this is the last).
  - Make sure the previous story links to this one: `../story_new/story_new.html`.

# 4. Update the Navbar
- Update the Stories dropdown in the navbar. Add a new: `<li><a class="dropdown-item" href="../story_new/story_new.html">Your Story Title</a></li>` in the dropdown menu in `navbar.html`.

## 5. Add to Story to the Overview Page
- Edit `stories/stories.html` to add a card or link for your new story, so it appears in the main stories list. Replace `<!-- place for a new story -->` with:
    ```html
    <a href="story_new/story_new.html" class="story-card">
    <div class="story-image">
        <img src="story_new/story_new.jpg" alt="New Story">
    </div>
    <div class="story-content">
        <h3>New Story</h3>
        <p>Short description of the new story</p>
        <span class="read-more">Read Story →</span>
    </div>
    </a>
    ```

## 6. Add to the landing page carousel
- Update the carousel in `index.html` to include your new story. Replace `<!-- place for a new story -->` with:
    ```html
    <!-- new story -->
    <a href="stories/story_new/story_new.html" class="story-carousel-card text-decoration-none">
    <img src="stories/story_new/story_new.jpg" class="story-carousel-img" alt="New Story" style="width:100%; height:100%; object-fit:cover; aspect-ratio:8/9; display:block;" />
    <div class="story-carousel-content">
        <h3>New Story</h3>
        <p>Short description of the new story</p>
    </div>
    </a>
    ```

## 7. Test Your Story
- Open your new story page in a browser.
- Check that all links, images, and navigation work as expected.
- Test the Stories dropdown and navigation buttons.

## 7. Commit and Push
- Save all your changes.
- Commit your new files and edits to git.
- Push to your repository.

