export const API = {
    apiRequest: async ():Promise<any> => {
      const apiUrl = 'https://84b0-118-99-84-2.ngrok-free.app';
  
      const customHeaders = new Headers();
  
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: customHeaders,
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const responseData = await response.json();
  
        // Display the response data as a JSON alert (for debugging)
  
        // Assuming the response data has map and entity properties, return it
        return responseData; // Adjust this line based on your actual response structure
      } catch (error) {
        // Handle any errors (you can add error handling logic here)
        alert(error);
        throw error; // Re-throw the error if needed
      }
    },
  };
  