---
layout: default
title: "Wildlife Gallery"
permalink: /wildlife/images/
---

<main class="py-4">
  <div class="container">

    <header class="mb-4">
      <p class="text-uppercase small text-muted mb-1">Wildlife</p>
      <h1 class="h3 fw-bold mb-2">Wildlife Gallery</h1>
      <p class="small text-muted mb-0">
        A visual gallery of images and clips captured by WildSense systems.
        This example uses the White Witch moth from AMBER; more species will be added later.
      </p>
    </header>

    <!-- Simple example gallery row -->
    <section class="mb-4">
      <h2 class="h5 fw-semibold mb-3">Moth Gallery (example)</h2>

      <div class="row g-3">
        <div class="col-md-4">
          <div class="card h-100 shadow-sm border-0">
            <div class="ratio ratio-4x3 rounded-top-4 bg-light">
              <!-- Placeholder image for now -->
              <img src="{{ site.baseurl }}/wildlife/images/white-witch-placeholder.jpg"
                   alt="White Witch moth"
                   class="img-fluid rounded-top-4">
            </div>
            <div class="card-body">
              <p class="small text-muted mb-1">
                Costa Rica · Pre-montane forest
              </p>
              <h3 class="h6 fw-semibold mb-1">
                The largest moth we have spotted: the White Witch
              </h3>
              <p class="small mb-2">
                <em>Thysania agrippina</em> · captured at 00:37 on 27/07/2024.
              </p>
              <a href="{{ site.baseurl }}/wildlife/factsheets/white-witch/"
                 class="btn btn-outline-success btn-sm">
                View factsheet
              </a>
            </div>
          </div>
        </div>
      </div>

    </section>

  </div>
</main>
