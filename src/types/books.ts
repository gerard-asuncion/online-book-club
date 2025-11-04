interface ImageLinks {
  smallThumbnail: string,
  thumbnail: string; 
}

interface VolumeInfo {
  title: string,
  authors: string[],  
  imageLinks?: ImageLinks; 
}

export interface BookItem {
  id: string,
  volumeInfo: VolumeInfo;
}