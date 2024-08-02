import React, { useState, useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FaImage } from 'react-icons/fa'; // 使用 react-icons 来显示图像图标
import styles from './CropImageModal.module.css';

// 拖拽项的类型
const ItemType = {
  IMAGE: 'image'
};

// 拖拽图片组件
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
        onClick={() => handleEdit(index)}  // 点击图片时调用 handleEdit
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
  const [image, setImage] = useState(null);  // 当前上传的图片
  const [originalImage, setOriginalImage] = useState(null);  // 原图
  const [originalImages, setOriginalImages] = useState(images); 
  const [croppedImages, setCroppedImages] = useState(images);  // 存储裁剪后的图片
  const [currentIndex, setCurrentIndex] = useState(null);  // 当前要修改的图片索引
  const [isFileInputHidden, setIsFileInputHidden] = useState(false); // 控制文件输入区域的显示
  const cropperRef = useRef(null);  // Cropper 实例引用
  const fileInputRef = useRef(null);  // 文件输入框的引用

  // 处理文件上传
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setOriginalImage(reader.result);
        setImage(reader.result);  // 将原图设置为当前图像
        setIsFileInputHidden(true); // 隐藏文件输入区域
      };
      reader.readAsDataURL(file);
    }
  };

  // 处理拖曳上传
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setOriginalImage(reader.result);
        setImage(reader.result);  // 将原图设置为当前图像
        setIsFileInputHidden(true); // 隐藏文件输入区域
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // 裁剪图片并更新图片列表
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
        return updatedImages.slice(0, 5);  // 限制最多 5 张图片
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
        return updatedImages.slice(0, 5);  // 限制最多 5 张图片
      });
      setImage(null);  // 清除当前图片
      setCurrentIndex(null);  // 重置当前索引
      setIsFileInputHidden(false); // 显示文件输入区域
    }
  };

  // 处理取消操作
  const handleClose = () => {
    setImage(null);  // 清除当前图片
    setCurrentIndex(null);  // 重置当前索引
    setIsFileInputHidden(false); // 显示文件输入区域
  };

  // 处理修改操作
  const handleEdit = (index) => {
    setCurrentIndex(index);
    setImage(originalImages[index]);
  };

  // 处理删除操作
  const handleDelete = (index) => {
    setCroppedImages(prevImages => prevImages.filter((_, i) => i !== index));
    setOriginalImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  // 处理图片重新排序
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
      <div className={styles.imageContainer}>
        <div className={styles.uploadTitle}>上傳圖片</div>
        <div
          className={`${styles['file-input-wrapper']} ${isFileInputHidden ? styles.hidden : ''}`}
          onClick={() => fileInputRef.current.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <FaImage className={styles.icon} />
          <p className={styles.instruction}>選擇圖片或拖曳圖片</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }} 
          />
        </div>
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
              dragMode="move"  // 允许拖曳裁剪框
            />
            <div className={styles.buttonRegionContainer}>
              <div className={styles.buttonCropWrapper} onClick={handleCrop}>
                <div className={styles.buttonCrop}>確認</div>
              </div>
              <div className={styles.buttonCropWrapper} onClick={handleClose}>
                <div className={styles.buttonCrop}>取消</div>
              </div>
            </div>
            
          </div>
        )}
        {!image && (
          <div className={styles.previewWrapper}>
            <div className={styles.previewTitle}>預覽圖片</div>
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
            <div className={styles.buttonRegionContainer}>
              <div className={styles.buttonCropWrapper} onClick={() => handleSaveAndClose(croppedImages)}>
                <div className={styles.buttonCrop}>儲存</div>
              </div>
              <div className={styles.buttonCancelWrapper} onClick={() => handleSaveAndClose(originalImages)}>
                <div className={styles.buttonCancel}>取消</div>
              </div>
            </div>
          </div>
        )}
        
      </div>
    </DndProvider>
  );
};

export default CropImageModal;