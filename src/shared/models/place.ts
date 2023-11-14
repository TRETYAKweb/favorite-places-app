export interface IPlace {
  title: string;
  imgUri: string;
  address: string;
  location: { lat: string; lng: string };
  id: string;
}

export class Place {
  title: string;
  imgUri: string;
  address: string;
  location: { lat: string; lng: string };
  id: string;
  constructor(
    title: string,
    imgUri: string,
    address: string,
    location: { lat: string; lng: string }
  ) {
    this.title = title;
    this.imgUri = imgUri;
    this.address = address;
    this.location = location;
    this.id = new Date().toString() + Math.random().toString();
  }
}
