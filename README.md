# Health Informatics and Computational Medicine Portfolio

Academic research portfolio of Van Phan, presenting computational research in clinical informatics, machine learning, and computational biology.

## Overview and Structure

The website is structured around an academic researcher layout featuring clean typography, structured metadata, and responsive navigation across desktop and mobile devices.

### Navigation and Pages

- Profile (index.html):
  - Biographical summary and research focus
  - Downloadable Curriculum Vitae and LinkedIn connection link
  - Education details: B.S. in Mathematics at Georgia State University, GPA, and coursework
  - Research and teaching appointments: RIMMES Program, Chemistry Laboratory TA, and CASA
  - Selected honors, awards, and national competition recognitions

- Research Overview (research.html):
  - Research Interests & Vision: Multimodal neural network architectures, patient triage algorithms, and clinical environment simulations
  - Research Summary: Plain-paragraph synthesis of methodologies and common themes across projects
  - Structured project cards linking to dedicated project pages

- Dedicated Research Project Pages (research/):
  1. DB-ATRG Mammography (research/db-atrg.html): Triage and automated diagnostic report generation using fine-tuned MedGemma 1.5 (QLoRA) on DMID and VinDr-Mammo datasets. Includes interactive high-resolution conference poster and DOI link.
  2. Time Series Classification in Stroke Rehabilitation (research/stroke-rehab.html): Supervised machine learning and deep temporal models (TCN, LSTM, 1D-CNN, InceptionTime, Transformers, TSFresh) classifying active range of motion from 28+ million kinematics sensor samples via Motus Nova robotics.
  3. Modeling Wound Healing (research/wound-healing.html): Computational simulation of Retinal Pigment Epithelium (RPE) monolayer repair using CompuCell3D and Q-Potts cellular models. Includes SURS 2024 conference poster and GitHub repository link.
  4. Morphological Feature Analysis of RPE Cells (research/rpe-morphology.html): Automated computer vision pipeline computing 133 cellular and texture features with a stacking ensemble classifier to identify aging biomarkers. Includes GSURC 2025 conference poster and GitHub repository link.
  5. Enhanced PINNs for Collective Cancer Invasion (research/pinns-cancer.html): Physics-Informed Neural Networks and Tensorized Fourier Neural Operators (TFNO) solving non-linear boundary PDEs for metastatic cell invasion. Best Project Award winner at SURS 2025 with conference poster and repository link.
  6. Laboratory Rearing Model for Acharan Sulfate (research/acharan-sulfate.html): Standardized rearing model of Lissachatina fulica, natural antimicrobial evaluation, and extraction of bioactive acharan sulfate with anticoagulant and thrombolytic assays. Advisor: Dr. Phu Duc Nguyen; presented at ViSEF 2022 (Prospect Award & First Place).
  7. Miniaturized Patient Lift System (research/patient-lift.html): Rapid 3D printing prototyping and stepper motor electromechanical actuation (Arduino REV3 ICSP, A4988 driver) for space-efficient patient transfers. Advisor: Dr. Tin Tran; presented at HCMUT Engineering and Science Fair 2022 (Consolation Prize).

- Publications and Presentations (publications.html):
  - Manuscripts and Preprints (In Review) with direct links to project sub-pages and official DOIs
  - Conference presentations and posters from SIAM MDS 2026, GSURC 2026, SURS 2025, GSURC 2025, SURS 2024, ViSEF 2022, and HCMUT Fair 2022

### Responsive Design

- Desktop: Fixed left sidebar containing brand navigation, collapsible research submenu, and direct contact methods.
- Mobile: Top-pinned navigation card with horizontal navigation, research dropdown, and contact links with color-coded iconography.
- Smart Scroll: Mobile navigation automatically slides out of view when scrolling down to provide full-screen reading space, and glides back into view when scrolling up for immediate navigation access.

## Technical Implementation

- Markup: Semantic HTML5, fully accessible heading hierarchy, and meta descriptions.
- Styling: Custom CSS3 design system using Merriweather serif headings, Inter body typography, CSS Grid, Flexbox, and fluid responsive media queries.
- Scripting: Vanilla JavaScript implementing mobile scroll detection (requestAnimationFrame throttled), dynamic content offset calculation, collapsible submenus, and clipboard utility.
- Assets: Local high-resolution conference posters and profile photography located in the images/ directory.

## Local Development

To view the website locally, open index.html in any modern web browser or start a local HTTP server:

```bash
# Using Python 3
python3 -m http.server 8000
```

Then navigate to http://localhost:8000 in your browser.

## Deployment

Configured for static hosting on GitHub Pages:
- Repository: https://github.com/vanthienphan2004/vanthienphan2004.github.io