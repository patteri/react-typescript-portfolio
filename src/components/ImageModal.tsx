import * as React from 'react';

export interface ImageModalProps {
  imagePath: string;
  hideImage(): void;
}

const ImageModal: React.SFC<ImageModalProps> = ({ imagePath, hideImage }) => {
  return (
    <div className="image-modal" onClick={hideImage}>
      <div className="hider-canvas" />
      <div className="close-icon">X</div>
      <div className="image-canvas">
        <span className="align-helper" />
        <img src={imagePath} alt="project image" />
      </div>
    </div>
  );
};

export default ImageModal;
