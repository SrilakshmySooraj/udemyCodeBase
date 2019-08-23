export class Booking {
  constructor(
    public id: string, 
    public placeId: string, 
    public userId: string, 
    public title: string, 
    public imageUrl:string,
    public firstName:string,
    public lastName:string,
    public guestNumber: number,
    public available:Date,
    public to:Date) {
  }
}
