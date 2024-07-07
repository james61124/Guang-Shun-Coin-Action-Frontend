import React, { useState, useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './CropImageModal.module.css';

// Drag item type
const ItemType = {
  IMAGE: 'image'
};

// Draggable image component
const DraggableImage = ({ index, image, moveImage, handleEdit, handleDelete }) => {
  const [, ref] = useDrag({
    type: ItemType.IMAGE,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType.IMAGE,
    hover: (item) => {
      if (item.index !== index) {
        moveImage(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} style={{ position: 'relative' }}>
      <img
        src={image}
        alt={`Cropped ${index}`}
        style={{ width: '100px', height: '100px', objectFit: 'cover', cursor: 'pointer' }}
        onClick={() => handleEdit(index)}  // Call handleEdit when the image is clicked
      />
      <button
        onClick={() => handleDelete(index)}
        style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          background: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
        }}
      >
        X
      </button>
    </div>
  );
};

const CropImageModal = ({ onClose, images }) => {
  const [image, setImage] = useState(null);  // Current uploaded image
  const [originalImage, setOriginalImage] = useState(null);  // Original image
  const [originalImages, setOriginalImages] = useState(images); 
  const [croppedImages, setCroppedImages] = useState(images);  // Store cropped images
  const [currentIndex, setCurrentIndex] = useState(null);  // Current index of the image to be edited
  const cropperRef = useRef(null);  // Reference to Cropper instance
  const fileInputRef = useRef(null);  // Reference to file input

  // Handle file upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setOriginalImage(reader.result);
        setImage(reader.result);  // Set original image as the current image
      };
      reader.readAsDataURL(file);
    }
  };

  // Crop image and update the image list
  const handleCrop = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current.cropper;
      const croppedImage = cropper.getCroppedCanvas().toDataURL();
      setCroppedImages(prevImages => {
        const updatedImages = [...prevImages];
        if (currentIndex !== null) {
          updatedImages[currentIndex] = croppedImage;
        } else {
          if (updatedImages.length < 5) {
            updatedImages.push(croppedImage);
          }
        }
        return updatedImages.slice(0, 5);  // Limit to 5 images
      });
      setOriginalImages(prevImages => {
        const updatedImages = [...prevImages];
        if (currentIndex !== null) {
          updatedImages[currentIndex] = image;
        } else {
          if (updatedImages.length < 5) {
            updatedImages.push(image);
          }
        }
        return updatedImages.slice(0, 5);  // Limit to 5 images
      });
      setImage(null);  // Clear current image
      setCurrentIndex(null);  // Reset current index
    }
  };

  // Handle cancel action
  const handleClose = () => {
    setImage(null);  // Clear current image
    setCurrentIndex(null);  // Reset current index
  };

  // Handle edit action
  const handleEdit = (index) => {
    setCurrentIndex(index);
    setImage(originalImages[index]);
  };

  // Handle delete action
  const handleDelete = (index) => {
    setCroppedImages(prevImages => prevImages.filter((_, i) => i !== index));
    setOriginalImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  // Handle image reordering
  const moveImage = (fromIndex, toIndex) => {
    const updatedImages = [...croppedImages];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    setCroppedImages(updatedImages);

    const updatedOriginalImages = [...originalImages];
    const [movedOriginalImage] = updatedOriginalImages.splice(fromIndex, 1);
    updatedOriginalImages.splice(toIndex, 0, movedOriginalImage);
    setOriginalImages(updatedOriginalImages);
  };

  const handleSaveAndClose = (images) => {
    handleCrop();
    onClose(images);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h2>Upload and Crop Images</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ marginBottom: '20px' }}
        />
        {image && (
          <div>
            <Cropper
              style={{ height: 400, width: '100%' }}
              initialAspectRatio={1}
              preview=".img-preview"
              src={image}
              ref={cropperRef}
              viewMode={1}
              guides={true}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              checkOrientation={false}
              dragMode="move"  // Allow dragging the crop box
            />
            <button onClick={handleCrop}>Crop</button>
            <button onClick={handleClose}>Cancel</button>
          </div>
        )}
        <div>
          <h3>Preview</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {croppedImages.map((img, index) => (
              <DraggableImage
                key={index}
                index={index}
                image={img}
                moveImage={moveImage}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        </div>
        <button onClick={() => handleSaveAndClose(croppedImages)}>Save</button>
        <button onClick={() => handleSaveAndClose([])}>Cancel</button>
      </div>
    </DndProvider>
  );
};

export default CropImageModal;
