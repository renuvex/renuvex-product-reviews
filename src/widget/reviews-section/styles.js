// reviews-section/styles.js - theme-agnostic review widget CSS aggregator.
//
// Keep this file as the public CSS contract for the review section. Consumers
// import CLASSIC_CSS from here; ownership-specific CSS lives in ./styles/*.js.

import { PARTIAL_STARS_CSS } from '../core/helpers.js';
import { REVIEW_SECTION_BASE_CSS, REVIEW_SECTION_MOBILE_CSS } from './styles/base.js';
import { SUMMARY_CONTROLS_CSS } from './styles/summary-controls.js';
import { PHOTO_STRIP_CSS } from './styles/photo-strip.js';
import { REVIEW_PRIMITIVES_CSS } from './styles/review-primitives.js';
import { REVIEW_STATES_CSS } from './styles/states.js';
import { LIGHTBOX_CSS } from './styles/lightbox.js';
import { REVIEW_MEDIA_CSS } from './styles/media.js';

export var CLASSIC_CSS = [
  REVIEW_SECTION_BASE_CSS,
  PARTIAL_STARS_CSS,
  SUMMARY_CONTROLS_CSS,
  PHOTO_STRIP_CSS,
  REVIEW_PRIMITIVES_CSS,
  REVIEW_STATES_CSS,
  REVIEW_MEDIA_CSS,
  LIGHTBOX_CSS,
  REVIEW_SECTION_MOBILE_CSS,
].join('\n');
