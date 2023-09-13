import {Map} from './Map';

// export const API = {
//     apiRequest: async ():Promise<any> => {
//       const apiUrl = 'https://84b0-118-99-84-2.ngrok-free.app';
  
//       const customHeaders = new Headers();
  
//       try {
//         const response = await fetch(apiUrl, {
//           method: 'GET',
//           headers: customHeaders,
//         });
  
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
  
//         const responseData = await response.json();
  
//         // Display the response data as a JSON alert (for debugging)
  
//         // Assuming the response data has map and entity properties, return it
//         return responseData; // Adjust this line based on your actual response structure
//       } catch (error) {
//         // Handle any errors (you can add error handling logic here)
//         alert(error);
//         throw error; // Re-throw the error if needed
//       }
//     },

//   };

export class API{

  public sendSaveData(): Promise<void>{
    const apiUrl = 'https://5591-203-78-117-152.ngrok-free.app/';
    const headers: Headers = new Headers()
    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')
    const request: RequestInfo = new Request(apiUrl, {
      method: 'POST',
      headers: headers,
      // body: JSON.stringify(user)
    })
  
    return fetch(request)
      .then(res => {
        console.log("got response:", res)
      })
  }

  public async getMap(){
    try {
      const apiUrl = 'http://localhost:3000/map';
      const response = await fetch(apiUrl);
      if(!response.ok) throw new Error('Network Response was not ok');
      const jsonString = await response.text();
      const jsonData = JSON.parse(jsonString);
      // alert(JSON.stringify(jsonData));
      return JSON.stringify(jsonData);
    } catch (error) {
      console.error("hello")
    }
  }
}
  