# WildSense Website

Official website for **WildSense – Automated Biodiversity Monitoring Platform**.

Built using **Jekyll + GitHub Pages**.

This document explains how to update content safely without breaking the site.

---

## 🌐 Live Site

https://tech-for-nature.github.io/wildsense/

---

## 📁 Site Structure Overview

docs/
│
├── _includes/        → Reusable components (navbar, carousel, etc.)
├── _layouts/         → Page templates
├── _news/            → News posts (blog updates)
│
├── systems/          → Monitoring system pages
├── projects/         → Individual project pages
├── diaries/          → Fieldwork diaries
├── wildlife/         → Wildlife showcase
├── partners/         → Partner information
│
├── assets/           → Images, CSS, JS
└── index.md          → Homepage

---

## 📰 Adding a News Post

All news posts live in:

docs/_news/

### Step 1 — Create a new file

File name format:

YYYY-MM-DD-title.md

Example:

2025-02-10-anguilla-deployment.md

### Step 2 — Add front matter at the top

---
layout: post
title: "AMI deployment begins in Anguilla"
summary: "Four new automated monitoring systems installed across coastal habitats."
related_projects: [anguilla]
related_systems: [ami]
---

### Step 3 — Write content in Markdown

Our team has deployed four AMI camera systems...

Read more about the [Anguilla project]({{ site.baseurl }}/projects/anguilla/).

✅ The news carousel will update automatically.  
✅ Related posts will show on relevant system/project pages.

---

## 📂 Adding a New Project

Projects live in:

docs/projects/

Each project has its own folder:

docs/projects/project-name/

Inside that folder:

index.md  
images/

### Basic Project Page Template

---
layout: project
title: "Project Title"
tagline: "Short project description"
status: "In progress"
region: "Caribbean"
project_id: project-name
systems: [ami, lepisense]
---

## Overview

Write project overview here.

## Objectives

- Objective one
- Objective two

---

## 🖼 Adding Images

Place images inside:

docs/projects/project-name/images/

Reference them like this:

![Field deployment](images/deployment.jpg)

---

## 🔗 Adding Hyperlinks in Text

Standard Markdown link:

[Link text](https://example.com)

Internal link:

[AMI System]({{ site.baseurl }}/systems/ami/)

Open in new tab:

<a href="https://example.com" target="_blank">External link</a>

---

## 📄 Adding Downloadable Documents (PDFs, Reports)

Create a folder inside the project:

docs/projects/project-name/docs/

Upload your PDF there.

Link to it like this:

[Download full report](docs/report.pdf)

---

## 🎨 Styling Notes

Global styling is controlled via:

assets/css/

Reusable components live in:

_includes/

Layout templates live in:

_layouts/

Avoid editing layout files unless you understand Jekyll structure.

---

## 🚀 Publishing Changes

### If editing locally:

git add .
git commit -m "update project page"
git push

GitHub Pages will automatically rebuild the site.

### If editing via GitHub website:

1. Edit file  
2. Commit changes  

The site updates automatically.

---

## ⚠ Important Rules

- Do NOT rename _news, _layouts, or _includes
- Always use correct front matter at top of files
- File names for news MUST include date
- Project folders must contain index.md