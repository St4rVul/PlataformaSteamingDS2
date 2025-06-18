// src/components/Upload.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./upload.css";
import { set } from "idb-keyval"; // Asegúrate de instalar idb-keyval: npm install idb-keyval

const MAX_SIZE_MB = 200;

const Upload: React.FC = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [duration, setDuration] = useState<string>("00:00");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  // Limpiar formulario
  const resetForm = () => {
    setFile(null);
    setTitle("");
    setDescription("");
    setCategory("");
    setThumbnail(null);
    setDuration("00:00");
    setUploadProgress(0);
    setError("");
    setSuccess("");
  };

  // Extraer miniatura y duración al seleccionar archivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setSuccess("");
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > MAX_SIZE_MB * 1024 * 1024) {
        setError(`El archivo supera el límite de ${MAX_SIZE_MB}MB.`);
        setFile(null);
        setThumbnail(null);
        setDuration("00:00");
        return;
      }
      setFile(selectedFile);
      // Crear URL temporal
      const videoUrl = URL.createObjectURL(selectedFile);
      const video = document.createElement("video");
      video.preload = "metadata";
      video.src = videoUrl;
      video.muted = true;
      video.playsInline = true;
      video.currentTime = 0.1;
      video.onloadedmetadata = () => {
        // Duración
        const dur = video.duration;
        const min = Math.floor(dur / 60)
          .toString()
          .padStart(2, "0");
        const sec = Math.floor(dur % 60)
          .toString()
          .padStart(2, "0");
        setDuration(`${min}:${sec}`);
      };
      video.oncanplay = () => {
        // Miniatura
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageUrl = canvas.toDataURL("image/png");
          setThumbnail(imageUrl);
        }
        URL.revokeObjectURL(videoUrl);
      };
    }
  };

  // Función para convertir archivo a base64 (ya no se usa, pero la dejo por si la necesitas)
  // function fileToBase64(file: File): Promise<string> { ... }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!file) {
      setError("Por favor selecciona un archivo");
      return;
    }
    if (isUploading) return; // Evitar doble submit
    setIsUploading(true);
    setUploadProgress(0);
    try {
      // Generar un id único para el video
      const videoId = Date.now();
      // Guardar el blob en IndexedDB
      await set(videoId, file);
      // Simulación de subida de archivo
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsUploading(false);
              // Guardar solo los metadatos en localStorage
              const nuevosVideos = JSON.parse(
                localStorage.getItem("uploadedVideos") || "[]"
              );
              nuevosVideos.push({
                id: videoId,
                title,
                description,
                url: videoId, // referencia al id en IndexedDB
                thumbnail: thumbnail || "/logo.png",
                duration: duration || "00:00",
                views: 0,
                category: category || "Otro",
                uploaded: true,
                uploadedBy: localStorage.getItem("selectedProfile"),
              });
              localStorage.setItem(
                "uploadedVideos",
                JSON.stringify(nuevosVideos)
              );
              setSuccess("¡Video subido exitosamente!");
              setTimeout(() => {
                resetForm();
                navigate("/home");
              }, 1200);
            }, 500);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    } catch (err) {
      setIsUploading(false);
      setError(
        "Error al subir el video. Intenta de nuevo o usa un archivo más pequeño."
      );
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <nav className="top-navbar w-full z-50 px-4 lg:px-8 py-3 lg:py-4 flex justify-between items-center border-b border-neutral-800">
        <div className="flex items-center">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-7 lg:h-9 cursor-pointer"
            onClick={() => navigate("/home")}
          />
        </div>
        <button
          className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
          onClick={() => navigate("/home")}
        >
          Cancelar
        </button>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8 lg:py-12">
        <h1 className="text-2xl lg:text-4xl font-bold mb-8">Subir video</h1>

        <form onSubmit={handleSubmit} className="upload-form space-y-6">
          <div>
            <label className="block text-lg mb-2">Título</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-neutral-900 border border-neutral-700 focus:border-red-600 focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-lg mb-2">Descripción</label>
            <textarea
              className="w-full p-3 rounded-lg bg-neutral-900 border border-neutral-700 focus:border-red-600 focus:outline-none min-h-[150px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-lg mb-2">Categoría</label>
            <select
              className="w-full p-3 rounded-lg bg-neutral-900 border border-neutral-700 focus:border-red-600 focus:outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Seleccionar categoría</option>
              <option value="Tecnología">Tecnología</option>
              <option value="Educación">Educación</option>
              <option value="Entretenimiento">Entretenimiento</option>
              <option value="Música">Música</option>
              <option value="Deportes">Deportes</option>
            </select>
          </div>

          <div>
            <label className="block text-lg mb-2">Archivo de video</label>
            <div
              className="border-2 border-dashed border-neutral-700 rounded-xl p-8 text-center cursor-pointer hover:border-red-600 transition-colors"
              onClick={() => document.getElementById("file-input")?.click()}
            >
              <input
                id="file-input"
                type="file"
                className="hidden"
                accept="video/*"
                onChange={handleFileChange}
              />
              {file ? (
                <div className="text-center">
                  {thumbnail && (
                    <img
                      src={thumbnail}
                      alt="Miniatura"
                      className="mx-auto mb-2 rounded-lg max-h-40"
                    />
                  )}
                  <p className="text-lg">{file.name}</p>
                  <p className="text-neutral-400 text-sm mt-2">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  {duration && (
                    <p className="text-neutral-400 text-sm mt-1">
                      Duración: {duration}
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <p className="mb-3">
                    Arrastra y suelta tu video aquí o haz clic
                  </p>
                  <div className="px-4 py-2 bg-red-700 rounded-lg inline-block">
                    Seleccionar archivo
                  </div>
                  <p className="text-neutral-400 text-sm mt-4">
                    Formatos soportados: MP4, AVI, MOV (max. 2GB)
                  </p>
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-center mb-2">{error}</div>
          )}
          {success && (
            <div className="text-green-500 text-center mb-2">{success}</div>
          )}

          {isUploading ? (
            <div className="pt-4">
              <div className="w-full bg-neutral-800 rounded-full h-2.5">
                <div
                  className="bg-red-600 h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="mt-2 text-center">Subiendo... {uploadProgress}%</p>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full py-3 bg-red-700 hover:bg-red-600 rounded-lg text-lg font-medium transition-colors"
              disabled={!file || isUploading}
            >
              {isUploading ? "Subiendo..." : "Subir video"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Upload;
