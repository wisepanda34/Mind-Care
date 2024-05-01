// utils/truncateFilename.ts 

export const truncateFileName = (fileName: string, maxLength: number) => {
  if (fileName.length > maxLength) {
    const fileExtension = fileName.split('.').pop(); 
    const fileNameWithoutExtension = fileName.slice(0, fileName.lastIndexOf('.')); 

    const truncatedFileName = fileNameWithoutExtension.slice(0, maxLength) + '...'; 
    return truncatedFileName + '.' + fileExtension; 
  } else {
    return fileName;
  }
};