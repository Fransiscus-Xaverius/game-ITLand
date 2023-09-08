export let API = {
    apiRequest: () => {
        const apiUrl = 'https://84b0-118-99-84-2.ngrok-free.app';

        const customHeaders = new Headers();
        // customHeaders.append('Content-Type', 'application/json');
        // customHeaders.append('name', 'Reditto4');
        // customHeaders.append('password', 'redittothebest');

        async function fetchData() {
            try {
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: customHeaders,
                });
                const responseData = await response.json();
                alert(JSON.stringify(responseData));
                return JSON.parse(responseData);
            } catch (error) {

            }
        }
        return fetchData();
    }
} 