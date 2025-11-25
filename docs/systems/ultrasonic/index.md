---
layout: system
title: "Ultrasonic Monitoring"
tagline: "High-frequency acoustic monitoring for bats and other ultrasonic species"
permalink: /systems/ultrasonic/
system_id: ultrasonic
hero_image: /systems/ultrasonic/images/hero.jpg
status: "In active use"
tech_focus: "Ultrasonic acoustics / Bat call recognition / High-frequency sensors"
example_outputs:
  - "Bat activity indices over nights, weeks, or seasons."
  - "Species-level or guild-level detections."
  - "Echolocation call sequences and spectrogram summaries."
---

## What is ultrasonic monitoring?

Ultrasonic monitoring focuses on capturing **high-frequency sounds** produced mainly by bats, as well as some insects and small mammals.  
These frequencies (typically **20–120 kHz**) are beyond human hearing and require specialised recorders and classification algorithms.

Within WildSense, ultrasonic monitoring provides detailed information on bat behaviour, habitat use, activity levels, and community composition — filling an ecological gap that cannot be captured by visual or standard acoustic methods.

---

## Devices we use

Ultrasonic surveys within WildSense rely on several field-tested devices:

### **AudioMoth (ultrasonic mode)**
- Low-cost and highly portable  
- Widely used for both research and large-scale bat surveys  
- Configurable sampling rates suitable for bats  

### **Bat-specific detectors**
- Higher-fidelity devices for detailed call structure  
- Used where species-level identification is critical  
- Ideal for long-term monitoring plots  

### **Custom UKCEH recorders**
For research trials within AMBER and related programmes.

Together, these devices support a broad range of ultrasonic recording scenarios — from bat passes to full-night activity profiles.

---

## Why ultrasonic monitoring matters

Bats are key bioindicators and respond rapidly to environmental change. Ultrasonic monitoring allows us to:

- Assess bat **activity levels**, guilds, and community structure  
- Understand how bats use landscapes (foraging, commuting, roosting)  
- Evaluate impacts of habitat change, land management, and restoration  
- Monitor protected sites or infrastructure projects  
- Detect shifts in bat populations under climate change  

Ultrasonic methods provide:

- Continuous, non-intrusive monitoring  
- High temporal resolution  
- Large sample sizes  
- Standardised long-term datasets  

These datasets are invaluable for conservation, policy evaluation, and ecological modelling.

---

## How the system works

### **Recording**

Ultrasonic sensors are deployed from sunset to sunrise, capturing:

- echolocation calls  
- social calls  
- feeding buzzes  
- background ultrasonic soundscape  

Devices record overnight for extended periods, producing thousands of call sequences.

---

### **Data processing**

Ultrasonic recordings are processed through:

### **BTO Bat Classification Pipeline**
The primary workflow used across WildSense projects, supporting:
- species-level identification where possible  
- guild-level classification  
- call quality filtering  
- activity metrics  

### **Internal UKCEH workflows**
Used for:
- clustering by call type  
- exploratory analysis  
- bespoke research questions in AMBER and partner projects  

### **Open-source tools**
Where appropriate, e.g. for visualisation or supporting species not covered by standard models.

Outputs include:

- species/guild detections  
- nightly activity indices  
- foraging behaviour markers  
- spectrogram-derived summaries  

---

## Where we use ultrasonic monitoring

Ultrasonic deployments support:

- woodland and farmland bat surveys  
- tropical forest bat research (AMBER)  
- protected area monitoring  
- habitat restoration assessments  
- long-term baseline establishment for ecological change studies  

As WildSense develops, ultrasonic datasets will integrate more deeply with imagery, EO products, and multi-modal biodiversity indicators.

---

## Images & media

Place images in:

`docs/systems/ultrasonic/images/`

Example:

![Bat detector in the field]({{ site.baseurl }}/systems/ultrasonic/images/detector.jpg)

---

## Partners & collaborators

Ultrasonic monitoring is supported by:

- UK Centre for Ecology & Hydrology (UKCEH)
- British Trust for Ornithology (BTO) – bat call pipeline
- Additional academic and conservation partners

---

## Get involved / learn more

Add deployment guidance, bat pipeline documentation, and links to call classifiers here.
