export interface IPlace {
  title: string;
  imgUri: string;
  address: string;
  location: { lat: number; lng: number };
  id: string;
}

export class Place {
  title: string;
  imgUri: string;
  address: string;
  location: { lat: number; lng: number };
  id: string;
  constructor(
    title: string,
    imgUri: string,
    address: string,
    location: { lat: number; lng: number }
  ) {
    this.title = title;
    this.imgUri = imgUri;
    this.address = address;
    this.location = location;
    this.id = new Date().toString() + Math.random().toString();
  }
}
