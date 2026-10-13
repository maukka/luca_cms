import multer from 'multer';

export const uploadMemory = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 500 * 1024 * 1024, // Maks. 500 MB videotiedostoille
  },
});