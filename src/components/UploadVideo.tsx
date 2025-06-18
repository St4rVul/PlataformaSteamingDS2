import React, { useState } from "react";

interface UploadVideoProps {
  onClose: () => void;
  onUploadSuccess: () => void;
}

const UploadVideo: React.FC<UploadVideoProps> = ({
  onClose,
  onUploadSuccess,
}) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [youtubeId, setYoutubeId] = useState("");
  const [image, setImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      // Aquí iría la lógica para subir el video a tu backend
      // Esto es solo un ejemplo básico
      const formData = new FormData();
      if (videoFile) formData.append("video", videoFile);
      formData.append("title", title);
      formData.append("year", year);
      formData.append("synopsis", synopsis);
      formData.append("youtubeId", youtubeId);
      formData.append("image", image);

      // Simulación de subida (reemplazar con llamada real a tu API)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Video subido con éxito:", {
        title,
        year,
        synopsis,
        youtubeId,
        image,
      });

      onUploadSuccess();
    } catch (error) {
      console.error("Error subiendo video:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-8 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Subir nuevo video</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-2">Título</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 bg-gray-700 rounded text-white"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Año</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full p-3 bg-gray-700 rounded text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Sinopsis</label>
            <textarea
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded text-white h-32"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-2">ID de YouTube</label>
              <input
                type="text"
                value={youtubeId}
                onChange={(e) => setYoutubeId(e.target.value)}
                className="w-full p-3 bg-gray-700 rounded text-white"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">
                URL de la imagen
              </label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full p-3 bg-gray-700 rounded text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Archivo de video</label>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="w-full text-white"
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 rounded hover:bg-gray-500 transition"
              disabled={isUploading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 rounded hover:bg-blue-500 transition flex items-center"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <span className="mr-2">Subiendo...</span>
                  <div className="w-4 h-4 border-t-2 border-white rounded-full animate-spin"></div>
                </>
              ) : (
                "Subir video"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadVideo;
