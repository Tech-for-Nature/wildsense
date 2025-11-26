---
layout: default
title: "Wildlife Factsheets"
permalink: /wildlife/factsheets/
---

<main class="py-4">
  <div class="container">

    <header class="mb-4">
      <p class="text-uppercase small text-muted mb-1">Wildlife</p>
      <h1 class="h3 fw-bold mb-2">Wildlife Factsheets</h1>
      <p class="small text-muted mb-0">
        Species profiles generated from WildSense data. This list will grow as we add more species.
      </p>
    </header>

    {% assign sheets = site.pages | where: "layout", "factsheet" | sort: "title" %}

    {% if sheets.size > 0 %}
      <div class="row g-3">
        {% for sheet in sheets %}
          <div class="col-md-4">
            <a href="{{ sheet.url | relative_url }}" class="text-decoration-none d-block h-100">
              <div class="card h-100 shadow-sm border-0">
                <div class="card-body">
                  <h2 class="h6 fw-semibold mb-1">
                    {{ sheet.common_name | default: sheet.title }}
                  </h2>
                  {% if sheet.scientific_name %}
                    <p class="small fst-italic mb-1">{{ sheet.scientific_name }}</p>
                  {% endif %}
                  {% if sheet.taxon_group %}
                    <p class="small text-muted mb-0">{{ sheet.taxon_group }}</p>
                  {% endif %}
                </div>
              </div>
            </a>
          </div>
        {% endfor %}
      </div>
    {% else %}
      <p class="small text-muted">
        No factsheets yet – they’ll appear here automatically as we add them.
      </p>
    {% endif %}

  </div>
</main>
