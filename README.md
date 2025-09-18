# Ami Dashboard

Dashboard for AMBER project currently hosted [here](https://ami-system.github.io/amber-dashboard/).

## Running locally

This page is built using jekyll. The source files are saved in `_docs`. To test the page locally, you will need to [install jekyll](https://jekyllrb.com/docs/installation/) and make sure you are in the `docs` dir: 

```
cd docs
```

then run:

```
bundle exec jekyll serve
```

## New Stories

To add a new story, follow the instructions in `README_ADD_STORY.md`.

## New Deployments

To add a new deployment to the map story, simply update the `points_of_interest.json` file in the `map` directory with the new deployment details.

## Adding Media

If you are loading in large videos, images or gifs, we recommend you source them from elsewhere. We have been using Google Drive and then sourcing them using the share links, making sure 'Anyone with the link' can view. You will also need to make sure the link follows the format `https://drive.google.com/file/d/FILE_ID/preview`, instead of the default `https://drive.google.com/file/d/FILE_ID/view?usp=drive_link`.

## Analytics

The AMBER Dashboard uses Google Analytics 4 for tracking user interactions. The tracking code is included in the `<head>` section of each HTML file (sourced from `google_analytics.html`).

To view the metrics, you will need access to the Google Analytics account associated with the AMBER project. Contact Kat, Tom or David.
