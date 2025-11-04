interface ImageLinks {
  smallThumbnail: string,
  thumbnail: string; 
}

export interface VolumeInfo {
  title: string,
  authors: string[],  
  imageLinks?: ImageLinks; 
}

export interface BookItem {
  id: string,
  volumeInfo: VolumeInfo;
}