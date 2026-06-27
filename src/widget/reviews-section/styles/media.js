export var REVIEW_MEDIA_CSS = `
  .renuvex-pr-media-video-thumb{position:relative;display:block;padding:0;overflow:hidden;appearance:none;-webkit-appearance:none;background:#111;border:0;color:#fff;font:inherit;line-height:1;text-align:initial;}
  .renuvex-pr-media-video-thumb .renuvex-pr-media-poster{display:block;width:100%;height:100%;object-fit:cover;}
  .renuvex-pr-media-play{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;align-items:center;justify-content:center;width:var(--renuvex-pr-media-play-size,42px);height:var(--renuvex-pr-media-play-size,42px);border-radius:50%;background:rgba(0,0,0,.20);color:var(--renuvex-pr-review-lightbox-video-icon,#ffffff);pointer-events:none;}
  .renuvex-pr-media-play svg{width:var(--renuvex-pr-media-play-icon-size,21px);height:var(--renuvex-pr-media-play-icon-size,21px);margin-left:2px;}
  @media(max-width:640px){
    .renuvex-pr-media-play{width:var(--renuvex-pr-media-play-size-mobile,var(--renuvex-pr-media-play-size,42px));height:var(--renuvex-pr-media-play-size-mobile,var(--renuvex-pr-media-play-size,42px));}
    .renuvex-pr-media-play svg{width:var(--renuvex-pr-media-play-icon-size-mobile,var(--renuvex-pr-media-play-icon-size,21px));height:var(--renuvex-pr-media-play-icon-size-mobile,var(--renuvex-pr-media-play-icon-size,21px));}
  }
  .renuvex-pr-media-video-thumb:focus-visible{outline:2px solid var(--renuvex-pr-review-star-color,#f59e0b);outline-offset:2px;}
`;
