---
layout: system
title: "AMI – Automated Monitoring of Insects"
tagline: "Autonomous imaging traps for large-scale insect and moth monitoring"
permalink: /systems/ami/
system_id: ami
hero_image: /systems/ami/images/hero.jpg
status: "In active use"
tech_focus: "Imaging / Edge AI / Biodiversity monitoring"
example_outputs:
  - "High-volume image datasets of nocturnal insects."
  - "Species detections and community composition summaries."
  - "Long-term biodiversity trends across continents."
---

## What is AMI?

The AMI (Automated Monitoring of Insects) system is an autonomous imaging trap designed to monitor nocturnal insects—particularly moths—at scale.  
It uses UV and white lights to attract insects and a high-resolution camera system to photograph them. The onboard computer (typically a Rock Pi) manages image capture, motion triggers, custom sampling schedules, and data storage.

AMI was developed to provide repeatable and standardised monitoring across sites, regions, and countries. It delivers high-quality data with minimal manual effort, forming the foundation for global-scale insect biodiversity datasets.

---

## Who develops AMI?

The AMI system is owned and developed by the **UK Centre for Ecology & Hydrology (UKCEH)**.

It is a collaborative effort that includes contributions from:

- **Aarhus University**
- **The Alan Turing Institute**
- **MILA – Quebec AI Institute**

AMI systems are a core part of major technology-driven biodiversity initiatives, including **AMBER (AI-assisted Monitoring of Biodiversity using Edge Processing and Remote Sensors)**, funded by the Abrdn Charitable Foundation.

---

## Why AMI matters

Growing evidence shows that insect populations are undergoing rapid decline, yet existing monitoring methods are often labour-intensive, inconsistent, or geographically patchy. AMI was designed to address this global challenge.

### AMI provides:

- **Autonomous, standardised sampling**  
  Reduces observer bias and manual labour.

- **High-volume, high-quality data**  
  Essential for understanding species trends, phenology, and community shifts.

- **Comparable data across continents**  
  Standardised design ensures that measurements are directly comparable.

- **Evidence for conservation and policy**  
  AMI supports decision-making on:
  - land-use change  
  - farming practices  
  - climate impacts  
  - habitat restoration effectiveness  

### Innovation currently underway:

- **Edge processing** – AI running *on the device* for rapid inference  
- **Telemetry** – remote system monitoring and data transfer  
- **Automated health checks** – reduced need for site visits  
- **Integration with cloud & HPC platforms** – scalable, efficient model training and inference  

Together, these advances make AMI a next-generation biodiversity monitoring platform capable of supporting global environmental change assessments.

---

## Where AMI is used

By 2024, more than **40 AMI systems** had been deployed worldwide. AMI has been used in:

- **UK & Europe** – farms, nature reserves, long-term research plots  
- **North & South America** – Canada, USA, Panama, Costa Rica, Argentina  
- **Africa** – Kenya and Uganda  
- **Asia** – Singapore and Japan  
- **Mediterranean** – Cyprus test sites  

These deployments span a huge range of climates and ecosystems, demonstrating the robustness of the AMI design and supporting the development of global insect datasets.

---

## How the system works

### **Hardware**
- UV + white lights to attract insects  
- High-resolution cameras for detailed image capture  
- Rock Pi (or similar) single-board computers  
- Onboard SSD + SD storage  
- Solar and battery units for off-grid deployment  

### **Data collection**
- Customisable sampling schedules (nightly, seasonal, experimental)  
- Motion or timed triggers  
- Optional acoustic recording (in development)  
- Long deployments with minimal maintenance  

### **Processing pipeline**
- Images are processed via:
  - in-house insect classifiers  
  - cloud/HPC pipelines  
  - the Antenna Data Platform (shared ML models)  
- Outputs include:
  - species-level detections  
  - abundance estimates  
  - community composition  
  - long-term biodiversity trends  

### **Innovation features (in development)**
- On-device image analysis  
- Automated telemetry for system health  
- Live dashboards for remote monitoring  

---

## Images & media

Put images in:

`docs/systems/ami/images/`

Example:

![AMI trap in the field]({{ site.baseurl }}/systems/ami/images/trap-example.jpg)

---

## Partners & collaborators

- UK Centre for Ecology & Hydrology (UKCEH)
- Aarhus University
- The Alan Turing Institute
- MILA – Quebec AI Institute
- AMBER (AI-assisted Monitoring of Biodiversity)

---

## Get involved / learn more

Add contacts, documentation, or platform links here once ready.
