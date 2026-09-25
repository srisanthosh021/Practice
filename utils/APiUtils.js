class APiUtils {

    constructor(apiContext,loginPayload){  // passed context and login credentials
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }
    async getToken(){
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
        { 
            data: this.loginPayload    //creating this data using post
        });
    const loginResponseJson = await loginResponse.json();  // next converting into json
    const token = loginResponseJson.token;  // from that we getting token value for that data
    console.log(token);
    return token;  // need to implement in another method
    }

    async createOrder(orderPayLoad){
        let response = {};   //creating a empty array variable to store token and orderid
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", 
                {
                    data: orderPayLoad,  // creating data using post
                    headers : {
                        'Authorization': response.token,   //implementing the token value (We're not mocking api)
                        'Content-Type' : 'application/json'
                    }
                });
            const orderResponseJSON = await orderResponse.json();  // converting into json
            const order = await orderResponseJSON.orders[0];  //for index, you should check in response, how json values are arranged
            console.log(order);
            response.order = order; // storing it in array variable
            return response;
    }

}
module.exports = {APiUtils};