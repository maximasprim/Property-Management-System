import React, { useState } from "react";

interface ImageUploadWidgetProps {
  onUpload: (imageUrls: string[]) => void; // Function to handle uploaded image URLs
}

const ImageUploadWidget: React.FC<ImageUploadWidgetProps> = ({ onUpload }) => {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setImages(fileArray);

      // Generate previews
      const previewUrls = fileArray.map((file) => URL.createObjectURL(file));
      setPreviews(previewUrls);
    }
  };

  // Upload multiple images
  const handleUpload = async () => {
    if (images.length === 0) return;
    setLoading(true);

    const uploadedUrls: string[] = [];

    for (const image of images) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "property system"); // Replace with your Cloudinary preset
      formData.append("cloud_name", "dcwglllgt"); // Replace with your Cloudinary cloud name

      try {
        const response = await fetch("https://api.cloudinary.com/v1_1/dcwglllgt/image/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (data.secure_url) {
          uploadedUrls.push(data.secure_url);
        }
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }

    setLoading(false);
    if (uploadedUrls.length > 0) {
      onUpload(uploadedUrls);
      setImages([]);
      setPreviews([]);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white max-w-md">
      <h2 className="text-lg font-semibold mb-2">Upload Multiple Images</h2>

      <input type="file" accept="image/*" multiple onChange={handleFileChange} className="mb-4" />

      {/* Preview selected images */}
      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          {previews.map((preview, index) => (
            <img key={index} src={preview} alt="Preview" className="w-20 h-20 object-cover rounded-md" />
          ))}
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={images.length === 0 || loading}
        className={`w-full py-2 px-4 rounded text-white ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
      >
        {loading ? "Uploading..." : "Upload Images"}
      </button>
    </div>
  );
};

export default ImageUploadWidget;
