import { useRef, useState } from 'react';

interface ImageDropzoneProps {
  initialUrl?: string;
  onChange: (url: string) => void;
}

export default function ImageDropzone({ initialUrl = '', onChange }: ImageDropzoneProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState(initialUrl);

  const handleFile = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange(url);
  };

  return (
    <div
      className="dropzone"
      onClick={() => inputRef.current?.click()}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        handleFile(event.dataTransfer.files[0]);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(event) => handleFile(event.target.files?.[0])}
      />
      {preview ? <img src={preview} alt="Product preview" /> : <>
        <span className="dropzone-icon">＋</span>
        <strong>Drop product image here</strong>
        <small>or click to browse · PNG, JPG, WEBP</small>
      </>}
    </div>
  );
}
