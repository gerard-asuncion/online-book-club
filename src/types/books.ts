// Aquesta interfície defineix les URL de les portades
export interface ImageLinks {
  smallThumbnail: string; // La versió petita
  thumbnail: string;      // La versió estàndard (aquesta és la que segurament vols)
}

export interface VolumeInfo {
  title: string;          // El títol (això és un string)
  authors: string[];      // Els autors (això és un array de strings)
  imageLinks?: ImageLinks; // <-- LA CLAU! La 'portada'
                          // El '?' fa que la propietat sigui opcional,
                          // ja que no tots els llibres tenen 'imageLinks'.
  
  // Afegeix aquí altres camps que vulguis en el futur
  // publisher?: string;
  // publishedDate?: string;
  // description?: string;
}

// Aquesta és la interfície principal per a cada llibre
export interface BookItem {
  id: string; // L'ID del llibre, perfecte per al 'key' de React
  volumeInfo: VolumeInfo;
  
  // Altres camps com 'kind' o 'etag' que no ens interessen ara
}