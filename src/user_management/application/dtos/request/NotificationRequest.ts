export class NotificationRequest {
    constructor(
      readonly packageID: string, 
      readonly clientID: string,  
      readonly status: string) {}
  }